export interface StrapiPagination {
  page?: number;
  pageSize?: number;
  start?: number;
  limit?: number;
  pageCount?: number;
  total?: number;
  withCount?: boolean;
}

export interface StrapiPopulate {
  [key: string]:
    | boolean
    | StrapiPopulate
    | {
        fields?: string[];
        populate?: StrapiPopulate;
        filters?: Record<string, any>;
        sort?: string | string[];
        pagination?: StrapiPagination;
      };
}

export interface StrapiFilters {
  [key: string]: any;
  $and?: StrapiFilters[];
  $or?: StrapiFilters[];
  $not?: StrapiFilters;
  $eq?: any;
  $eqi?: any;
  $ne?: any;
  $nei?: any;
  $lt?: any;
  $lte?: any;
  $gt?: any;
  $gte?: any;
  $in?: any[];
  $notIn?: any[];
  $contains?: any;
  $notContains?: any;
  $containsi?: any;
  $notContainsi?: any;
  $startsWith?: any;
  $startsWithi?: any;
  $endsWith?: any;
  $endsWithi?: any;
  $null?: boolean;
  $notNull?: boolean;
  $between?: [any, any];
}

export interface QueryParams {
  populate?: string | string[] | StrapiPopulate | "*";
  filters?: StrapiFilters;
  sort?: string | string[] | Array<{ [field: string]: "asc" | "desc" }>;
  pagination?: StrapiPagination;
  fields?: string | string[];
  locale?: string | "all";
  publicationState?: "live" | "preview";
  status?: "published" | "draft";
  [key: string]: any;
}

export interface StrapiResponse<T = any> {
  data: T;
  meta?: {
    pagination?: {
      total?: number;
      page?: number;
      pageSize?: number;
      pageCount?: number;
    };
  };
}

export const createFilters = {
  eq: (field: string, value: any) => ({ [field]: { $eq: value } }),
  ne: (field: string, value: any) => ({ [field]: { $ne: value } }),
  lt: (field: string, value: any) => ({ [field]: { $lt: value } }),
  lte: (field: string, value: any) => ({ [field]: { $lte: value } }),
  gt: (field: string, value: any) => ({ [field]: { $gt: value } }),
  gte: (field: string, value: any) => ({ [field]: { $gte: value } }),
  in: (field: string, values: any[]) => ({ [field]: { $in: values } }),
  notIn: (field: string, values: any[]) => ({ [field]: { $notIn: values } }),
  contains: (field: string, value: any) => ({ [field]: { $contains: value } }),
  containsi: (field: string, value: any) => ({
    [field]: { $containsi: value },
  }),
  startsWith: (field: string, value: any) => ({
    [field]: { $startsWith: value },
  }),
  endsWith: (field: string, value: any) => ({ [field]: { $endsWith: value } }),
  null: (field: string) => ({ [field]: { $null: true } }),
  notNull: (field: string) => ({ [field]: { $notNull: true } }),
  between: (field: string, min: any, max: any) => ({
    [field]: { $between: [min, max] },
  }),
  and: (...filters: StrapiFilters[]) => ({ $and: filters }),
  or: (...filters: StrapiFilters[]) => ({ $or: filters }),
  not: (filter: StrapiFilters) => ({ $not: filter }),

  relation: {
    eq: (relation: string, field: string, value: any) => ({
      [relation]: { [field]: { $eq: value } },
    }),
    ne: (relation: string, field: string, value: any) => ({
      [relation]: { [field]: { $ne: value } },
    }),
    in: (relation: string, field: string, values: any[]) => ({
      [relation]: { [field]: { $in: values } },
    }),
    notIn: (relation: string, field: string, values: any[]) => ({
      [relation]: { [field]: { $notIn: values } },
    }),
    contains: (relation: string, field: string, value: any) => ({
      [relation]: { [field]: { $contains: value } },
    }),
    containsi: (relation: string, field: string, value: any) => ({
      [relation]: { [field]: { $containsi: value } },
    }),
    null: (relation: string, field: string) => ({
      [relation]: { [field]: { $null: true } },
    }),
    notNull: (relation: string, field: string) => ({
      [relation]: { [field]: { $notNull: true } },
    }),
    documentId: {
      eq: (relation: string, documentId: string) => ({
        [relation]: { documentId: { $eq: documentId } },
      }),
      in: (relation: string, documentIds: string[]) => ({
        [relation]: { documentId: { $in: documentIds } },
      }),
      notIn: (relation: string, documentIds: string[]) => ({
        [relation]: { documentId: { $notIn: documentIds } },
      }),
    },
  },
};

export const createPopulate = {
  all: () => "*" as const,
  deep: (depth: number = 10) => `*`.repeat(depth),
  fields: (relation: string, fields: string[]) => ({
    [relation]: { fields },
  }),
  nested: (config: Record<string, any>) => config as StrapiPopulate,
};

export const createSort = {
  asc: (field: string) => `${field}:asc`,
  desc: (field: string) => `${field}:desc`,
  multiple: (fields: Array<{ field: string; direction: "asc" | "desc" }>) =>
    fields.map(({ field, direction }) => `${field}:${direction}`),
};

export const createPagination = {
  page: (page: number, pageSize: number = 25) => ({ page, pageSize }),
  offset: (start: number, limit: number = 25) => ({ start, limit }),
  withCount: (params: Partial<StrapiPagination>) =>
    ({
      ...params,
      withCount: true,
    }) as StrapiPagination,
};

export const queryDefaults = {
  withRelations: (relations: string[] = []) => ({
    populate: relations.length > 0 ? relations : "*",
  }),

  paginated: (page: number = 1, pageSize: number = 25) => ({
    pagination: { page, pageSize, withCount: true },
  }),

  published: () => ({
    publicationState: "live" as const,
  }),

  draft: () => ({
    publicationState: "preview" as const,
  }),

  localized: (locale: string) => ({
    locale,
  }),
};

export const buildQueryString = (
  params: QueryParams,
  options: { debug?: boolean } = {},
): string => {
  if (!params || Object.keys(params).length === 0) return "";

  const flattened = flattenObject(params);
  const queryString = new URLSearchParams(flattened).toString();

  if (options.debug) {
    console.group("🔍 Strapi Query Debug");
    console.log("Paramètres d'entrée:", params);
    console.log("Paramètres aplatis:", flattened);
    console.log("Query string finale:", queryString);
    console.log("URL complète:", `/api/collection?${queryString}`);
    console.groupEnd();
  }

  return queryString;
};

const flattenObject = (
  obj: Record<string, any>,
  prefix = "",
): Record<string, string> => {
  const flattened: Record<string, string> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return;
    }

    const newKey = prefix ? `${prefix}[${key}]` : key;

    if (!prefix) {
      switch (key) {
        case "populate":
          handlePopulateFlattening(value, flattened);
          return;
        case "sort":
          handleSortFlattening(value, flattened);
          return;
        case "fields":
          flattened.fields = Array.isArray(value)
            ? value.join(",")
            : String(value);
          return;
        case "pagination":
          Object.entries(value as Record<string, any>).forEach(
            ([pKey, pValue]) => {
              if (pValue !== null && pValue !== undefined) {
                flattened[`pagination[${pKey}]`] = String(pValue);
              }
            },
          );
          return;
        case "locale":
        case "publicationState":
        case "status":
          flattened[key] = String(value);
          return;
      }
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          Object.assign(flattened, flattenObject(item, `${newKey}[${index}]`));
        } else {
          flattened[`${newKey}[${index}]`] = String(item);
        }
      });
    } else if (typeof value === "object" && value !== null) {
      Object.assign(flattened, flattenObject(value, newKey));
    } else {
      flattened[newKey] = String(value);
    }
  });

  return flattened;
};

const handlePopulateFlattening = (
  populate: any,
  flattened: Record<string, string>,
): void => {
  if (typeof populate === "string") {
    flattened.populate = populate;
  } else if (Array.isArray(populate)) {
    flattened.populate = populate.join(",");
  } else if (typeof populate === "object" && populate !== null) {
    Object.assign(flattened, flattenObject(populate, "populate"));
  }
};

const handleSortFlattening = (
  sort: any,
  flattened: Record<string, string>,
): void => {
  if (typeof sort === "string") {
    flattened.sort = sort;
  } else if (Array.isArray(sort)) {
    if (sort.length > 0 && typeof sort[0] === "object") {
      const sortStrings = sort.map((item) => {
        if (typeof item === "object") {
          return Object.entries(item)
            .map(([field, direction]) => `${field}:${direction}`)
            .join(",");
        }
        return String(item);
      });
      flattened.sort = sortStrings.join(",");
    } else {
      flattened.sort = sort.join(",");
    }
  }
};

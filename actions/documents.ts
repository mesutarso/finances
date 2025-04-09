"use server";

import { types, categoriesDocuments, ressources } from "@/lib/strapi";
import { DocumentFilters } from "@/types/documents";

interface DocumentsParams {
  page: number;
  pageSize: number;
  search: string;
  filters: DocumentFilters;
}

export const fetchDocumentTypes = async () => {
  const { data } = await types.find({
    pagination: {
      pageSize: 100,
    },
  });
  return data?.map((type) => ({
    id: type.documentId,
    nom: type.titre,
  }));
};

export const fetchDocumentCategories = async (typeId: string | null) => {
  const { data } = await categoriesDocuments.find({
    filters: {
      types: {
        documentId: {
          $in: [typeId],
        },
      },
    },
  });
  return data?.map((category) => ({
    id: category.documentId,
    nom: category.nom,
  }));
};

export const fetchDocuments = async ({
  page,
  pageSize,
  search,
  filters,
}: DocumentsParams) => {
  const queryParams: Record<string, any> = {
    populate: ["types", "fichier", "types.categorie_document"],
    pagination: {
      page,
      pageSize,
    },
  };

  if (search) {
    queryParams.filters = {
      ...(queryParams.filters || {}),
      titre: {
        $containsi: search,
      },
    };
  }

  if (filters.type) {
    queryParams.filters = {
      ...(queryParams.filters || {}),
      types: {
        documentId: {
          $eq: filters.type,
        },
      },
    };
  }

  if (filters.category) {
    queryParams.filters = {
      ...(queryParams.filters || {}),
      types: {
        categorie_document: {
          documentId: {
            $eq: filters.category,
          },
        },
      },
    };
  }

  if (filters.dateFrom || filters.dateTo) {
    queryParams.filters = {
      ...(queryParams.filters || {}),
      date_publication: {
        ...(filters.dateFrom && { $gte: filters.dateFrom }),
        ...(filters.dateTo && { $lte: filters.dateTo }),
      },
    };
  }
  const { data, meta } = await ressources.find(queryParams);

  return {
    data: data?.map((item: any) => ({
      id: item.documentId,
      titre: item.titre,
      fichier: {
        url: `${process.env.IMAGE_URL}${item.fichier?.url}`,
      },
      url: item.url,
      type: item.types[0],
      categories: [item.types[0]["categorie_document"]],
      date_publication: item.date_publication,
    })),
    meta: meta,
  };
};

export const fetchDocument = async (id: string) => {
  const { data } = await ressources.findOne(id, {
    populate: ["types", "fichier", "types.categorie_document"],
  });
  return {
    id: data.documentId,
    titre: data.titre,
    fichier: `${process.env.IMAGE_URL}${data.fichier?.url}` || data.url,
    type: data.types[0]?.titre,
    categories: data.types[0]["categorie_document"]?.nom,
    date_publication: data.date_publication,
  };
};

import axios, { type AxiosError, type AxiosResponse } from "axios";

import {
  buildQueryString,
  type QueryParams,
  type StrapiFilters,
  type StrapiResponse,
} from "./helpers";

interface StrapiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: any;
  };
}

const strapiApi = axios.create({
  baseURL: process.env.API_URL || "http://localhost:1337/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

strapiApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<StrapiError>) => {
    const errorMessage =
      error.response?.data?.error?.message ||
      error.message ||
      "Une erreur est survenue";

    const statusCode = error.response?.status || 500;

    console.error(`[Strapi API Error] ${statusCode}: ${errorMessage}`, {
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
    });

    const customError = new Error(errorMessage);
    (customError as any).status = statusCode;
    (customError as any).details = JSON.stringify(
      error.response?.data?.error?.details
    );

    throw customError;
  }
);

export const getPublicCollectionById = async <T = any>(
  collection: string,
  id: string,
  params?: QueryParams
): Promise<StrapiResponse<T>> => {
  try {
    const defaultParams: QueryParams = { ...params };
    const queryString = buildQueryString(defaultParams);
    const url = `${collection}/${id}?${queryString}`;

    const response = await strapiApi.get<StrapiResponse<T>>(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPublicCollection = async <T = any>(
  collection: string,
  params?: QueryParams
): Promise<StrapiResponse<T[]>> => {
  try {
    const queryString = params ? buildQueryString(params) : "";
    const url = queryString ? `${collection}?${queryString}` : collection;

    const response = await strapiApi.get<StrapiResponse<T[]>>(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPublicCollectionItem = async <T = any>(
  collection: string,
  data: Record<string, unknown>
): Promise<StrapiResponse<T>> => {
  try {
    const response = await strapiApi.post<StrapiResponse<T>>(collection, {
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Met à jour un élément d'une collection
 */
export const updatePublicCollectionItem = async <T = any>(
  collection: string,
  id: string,
  data: Record<string, unknown>
): Promise<StrapiResponse<T>> => {
  try {
    const response = await strapiApi.put<StrapiResponse<T>>(
      `${collection}/${id}`,
      { data }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Supprime un élément d'une collection
 */
export const deletePublicCollectionItem = async <T = any>(
  collection: string,
  id: string
): Promise<StrapiResponse<T>> => {
  try {
    const response = await strapiApi.delete<StrapiResponse<T>>(
      `${collection}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

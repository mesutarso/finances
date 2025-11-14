"use server";

import { getCollection } from "@/server/strapi";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface CommuniquesParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export const fetchCommuniques = async (params: CommuniquesParams = {}) => {
  const { page = 1, pageSize = 10, search = "" } = params;
  const filters: any = {
    categories: {
      slug: {
        $eq: "communiques",
      },
    },
  };

  // Ajouter le filtre de recherche si présent
  if (search && search.trim()) {
    filters.titre = {
      $containsi: search.trim(),
    };
  }

  const response = await getCollection("articles", {
    filters,
    fields: ["titre", "slug", "date_publication"],
    sort: ["date_publication:desc"],
    pagination: {
      page,
      pageSize,
    },
    populate: ["image"],
  });

  return {
    data: (response.data || []).map((item: any) => ({
      id: item.documentId || item.id,
      titre: item.titre,
      date_publication: format(
        new Date(item.date_publication),
        "dd MMMM yyyy",
        { locale: fr }
      ),
      slug: item.slug,
      type: item.categories?.[0] ? { nom: item.categories[0].nom } : undefined,
      image: item.image?.url
        ? `${process.env.IMAGE_URL}${item.image.url}`
        : undefined,
      categorie: "Communiqués",
    })),
    meta: response.meta,
  };
};

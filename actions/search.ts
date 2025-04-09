"use server";

import { services, articles, ressources } from "@/lib/strapi";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export async function getInitialData() {
  const [
    { data: servicesData },
    { data: articlesData },
    { data: documentsData },
  ] = await Promise.all([
    services.find({
      sort: ["createdAt:desc"],
      fields: ["titre", "lien", "createdAt"],
      pagination: {
        pageSize: 5,
      },
    }),
    articles.find({
      sort: ["date_publication:desc"],
      fields: ["titre", "date_publication", "slug"],
      pagination: {
        pageSize: 5,
      },
    }),
    ressources.find({
      sort: ["date_publication:desc"],
      fields: ["titre", "date_publication", "documentId"],
      pagination: {
        pageSize: 5,
      },
    }),
  ]);
  return {
    services: servicesData?.map((service) => ({
      id: service.id,
      title: service.titre,
      link: service.lien,
      date: format(new Date(service.createdAt), "dd MMMM yyyy", { locale: fr }),
    })),
    articles: articlesData?.map((article) => ({
      id: article.id,
      title: article.titre,
      date: format(new Date(article.date_publication), "dd MMMM yyyy", {
        locale: fr,
      }),
      link: article.slug,
    })),
    documents: documentsData?.map((document) => ({
      id: document.id,
      title: document.titre,
      date: format(new Date(document.date_publication), "dd MMMM yyyy", {
        locale: fr,
      }),
      link: document.documentId,
    })),
  };
}

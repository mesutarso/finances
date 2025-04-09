"use server";
import {
  articles as articlesCollection,
  ressources as ressourcesCollection,
  services as servicesCollection,
} from "@/lib/strapi";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export async function searchApi(query: string) {
  if (!query || query.length < 2)
    return { articles: [], documents: [], services: [] };

  const { data: articles } = await articlesCollection.find({
    filters: {
      titre: {
        $contains: query,
      },
    },
  });

  const { data: documents } = await ressourcesCollection.find({
    filters: {
      titre: {
        $contains: query,
      },
    },
  });

  const { data: services } = await servicesCollection.find({
    filters: {
      titre: {
        $contains: query,
      },
    },
  });

  const formattedArticles = articles.map((article) => ({
    id: article.documentId,
    title: article.titre,
    date: format(new Date(article.date_publication), "dd/MM/yyyy", {
      locale: fr,
    }),
    link: article.slug,
  }));

  const formattedDocuments = documents.map((document) => ({
    id: document.documentId,
    title: document.titre,
    date: format(new Date(document.date_publication), "dd/MM/yyyy", {
      locale: fr,
    }),
    link: document.slug,
  }));

  const formattedServices = services.map((service) => ({
    id: service.documentId,
    title: service.titre,
    date: format(new Date(service.createdAt), "dd/MM/yyyy", {
      locale: fr,
    }),
    link: service.lien,
  }));

  return {
    formattedArticles,
    formattedDocuments,
    formattedServices,
  };
}

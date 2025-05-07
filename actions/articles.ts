"use server";

import { articles } from "@/lib/strapi";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const getLatestArticles = async () => {
  const latestArticles = await articles.find({
    sort: ["date_publication:desc"],
    pagination: {
      page: 1,
      pageSize: 3,
    },
    populate: ["categories", "image"],
  });
  return latestArticles?.data?.map((article) => ({
    title: article.titre,
    image: `${process.env.IMAGE_URL}${article?.image?.url}`,
    date: format(new Date(article.date_publication), "dd MMMM yyyy", {
      locale: fr,
    }),
    categorie: article.categories[0]?.nom || "Non classé",
    link: `/articles/${article.slug}`,
  }));
};

export const getArticleBySlug = async (slug: string) => {
  let similarArticles = null;
  const article = await articles.findOne(slug, {
    populate: ["categories", "image"],
  });
  const { data } = article;
  console.log(data.titre);
  if (data?.categories?.length > 0) {
    const getSimilarArticles = await articles.find({
      populate: ["image", "categories"],
      sort: ["date_publication:desc"],
      filters: {
        titre: {
          $ne: data?.titre,
        },
        categories: {
          documentId: {
            $in: data?.categories?.map((item: any) => item.documentId),
          },
        },
      },

      pagination: {
        page: 1,
        pageSize: 6,
      },
    });
    similarArticles = getSimilarArticles?.data?.map((item: any) => ({
      title: item.titre,
      image: item?.image?.url
        ? `${process.env.IMAGE_URL}${item?.image?.url}`
        : null,
      date: format(new Date(item.date_publication), "dd MMMM yyyy", {
        locale: fr,
      }),
      link: `/articles/${item.slug}`,
      categorie: data?.categories?.map((item: any) => item.nom)[0],
    }));
  }
  return {
    title: data?.titre,
    date: format(new Date(data?.date_publication), "dd MMMM yyyy", {
      locale: fr,
    }),
    image: `${process.env.IMAGE_URL}${data?.image.url}`,
    content: data?.contenu,
    categorie: data?.categories?.map((item: any) => item.nom)?.join(", "),
    link: `/articles/${data?.slug}`,
    similarArticles: similarArticles,
  };
};

export const getArticleMetadata = async (slug: string) => {
  const article = await articles.findOne(slug, {
    populate: ["categories", "image"],
  });
  const { data } = article;
  return {
    title: data?.titre,
    description: "Ministère des Finances",
    image: data?.image?.url
      ? `${process.env.IMAGE_URL}${data?.image.url}`
      : null,
    url: `${process.env.APP_URL}/articles/${data?.slug}`,
    publishedTime: data?.date_publication,
    author: "CellCom Ministère des Finances",
    category: data?.categories?.map((item: any) => item.nom)?.join(", "),
  };
};

export const getAllArticles = async ({
  page,
  pageSize,
  categorie,
}: {
  page: number;
  pageSize: number;
  categorie: string;
}) => {
  const filters: any = {};
  if (categorie) {
    filters.categories = {
      documentId: {
        $eq: categorie,
      },
    };
  }
  const allArticles = await articles.find({
    sort: ["date_publication:desc"],
    populate: ["categories"],
    fields: ["titre", "slug", "date_publication"],
    filters,
    pagination: {
      page,
      pageSize,
    },
  });
  return {
    data: allArticles?.data?.map((item: any) => ({
      title: item.titre,
      date: format(new Date(item.date_publication), "dd MMMM yyyy", {
        locale: fr,
      }),
      link: `/articles/${item.slug}`,
      categorie: item.categories?.map((item: any) => item.nom)?.join(", "),
    })),
    meta: allArticles?.meta,
  };
};

export const getArticleSlugs = async () => {
  const slugs = await articles.find({
    fields: ["slug"],
    pagination: {
      page: 1,
      pageSize: 50,
    },
  });
  return slugs?.data?.map((item: any) => {
    return {
      slug: item.slug,
      date: new Date(),
    };
  });
};

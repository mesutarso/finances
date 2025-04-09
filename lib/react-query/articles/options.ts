import { queryOptions } from "@tanstack/react-query";
import {
  getLatestArticles,
  getArticleBySlug,
  getAllArticles,
} from "@/actions/articles";

export const latestArticlesQuery = queryOptions({
  queryKey: ["latestArticles"],
  queryFn: async () => {
    const articles = await getLatestArticles();
    return articles;
  },
});

export const articleBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["articleBySlug", slug],
    queryFn: async () => {
      const article = await getArticleBySlug(slug);
      return article;
    },
  });

export const getAllArticlesQuery = (
  page: number,
  pageSize: number,
  categorie: string
) =>
  queryOptions({
    queryKey: ["getAllArticles", page, pageSize, categorie],
    queryFn: async () => {
      const articles = await getAllArticles({ page, pageSize, categorie });
      return articles;
    },
  });

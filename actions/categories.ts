"use server";
import { categories, articles } from "@/lib/strapi";

export async function getCategories() {
  let allCategories = [];
  const { data } = await categories.find({
    fields: ["documentId", "nom"],
  });
  if (!data) {
    return {
      error: "No categories found",
    };
  }
  for (const category of data) {
    const {
      meta: {
        // @ts-ignore
        pagination: { total },
      },
    } = await articles.find({
      filters: {
        categories: {
          documentId: {
            $eq: category.documentId,
          },
        },
      },
    });
    allCategories.push({
      ...category,
      totalArticles: total,
    });
  }

  return allCategories.sort((a, b) => b.totalArticles - a.totalArticles);
}

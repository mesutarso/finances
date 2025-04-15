"use server";

import { mediatheques } from "@/lib/strapi";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export async function getMediatheques() {
  const { data } = await mediatheques.find({
    sort: ["date:desc"],
    populate: ["photos", "photos.galleries", "cover"],
    fields: ["titre", "description", "slug", "lien_video", "date"],
    pagination: {
      pageSize: 100,
    },
  });
  return data?.map((item) => ({
    ...item,
    id: item.documentId,
    slug: item.slug,
    cover: `${process.env.IMAGE_URL}${item.cover.url}`,
    photos: item.photos[0].galleries?.map(
      (gallery: any) => `${process.env.IMAGE_URL}${gallery.url}`
    ).length,
    date: format(new Date(item.date), "dd MMMM yyyy", { locale: fr }),
  }));
}

export async function getMediathequeBySlug(slug: string) {
  const { data } = await mediatheques.find({
    filters: { slug },
    populate: ["photos", "photos.galleries", "cover"],
    fields: ["titre", "description", "slug", "lien_video", "date"],
  });
  const mediatheque = data[0];
  return {
    ...mediatheque,
    cover: `${process.env.IMAGE_URL}${mediatheque.cover.url}`,
    photos: mediatheque.photos[0].galleries?.map(
      (gallery: any) => `${process.env.IMAGE_URL}${gallery.url}`
    ).length,
    photoUrls: mediatheque.photos[0].galleries?.map(
      (gallery: any) => `${process.env.IMAGE_URL}${gallery.url}`
    ),
    date: format(new Date(mediatheque.date), "dd MMMM yyyy", { locale: fr }),
  };
}

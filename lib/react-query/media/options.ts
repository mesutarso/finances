import { queryOptions } from "@tanstack/react-query";
import { getMediatheques, getMediathequeBySlug } from "@/actions/mediatheques";

export const mediathequesQuery = queryOptions({
  queryKey: ["mediatheques"],
  queryFn: async () => {
    const mediatheques = await getMediatheques();
    return mediatheques;
  },
});

export const mediathequeBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["mediathequeBySlug", slug],
    queryFn: async () => {
      const mediatheque = await getMediathequeBySlug(slug);
      return mediatheque;
    },
  });

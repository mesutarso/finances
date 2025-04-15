import { queryOptions } from "@tanstack/react-query";
import { getMediatheques } from "@/actions/mediatheques";

export const mediathequesQuery = queryOptions({
  queryKey: ["mediatheques"],
  queryFn: async () => {
    const mediatheques = await getMediatheques();
    return mediatheques;
  },
});

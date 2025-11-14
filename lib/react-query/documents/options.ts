import { queryOptions } from "@tanstack/react-query";
import { fetchDocument } from "@/actions/documents";

export const documentByIdQuery = (id: string) =>
  queryOptions({
    queryKey: ["documentById", id],
    queryFn: async () => {
      const document = await fetchDocument(id);
      return document;
    },
  });


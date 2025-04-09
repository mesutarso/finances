import { queryOptions } from "@tanstack/react-query";
import { getCategories } from "@/actions/categories";

export const categoriesQuery = queryOptions({
  queryKey: ["categories"],
  queryFn: getCategories,
});

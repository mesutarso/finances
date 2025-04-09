import { queryOptions } from "@tanstack/react-query";
import { getAllServices, getLatestServices } from "@/actions/services";

export const latestServicesQuery = queryOptions({
  queryKey: ["latestServices"],
  queryFn: getLatestServices,
});

export const allServicesQuery = queryOptions({
  queryKey: ["allServices"],
  queryFn: getAllServices,
});

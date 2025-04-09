import { queryOptions } from "@tanstack/react-query";
import {
  getMinistre,
  getViceMinistre,
  getCabinet,
  getTexteFondateur,
  getAnciensMinistres,
} from "@/actions/ministre";

export const ministreQuery = queryOptions({
  queryKey: ["ministre"],
  queryFn: async () => {
    const data = await getMinistre();
    return data;
  },
});

export const viceMinistreQuery = queryOptions({
  queryKey: ["vice-ministre"],
  queryFn: async () => {
    const data = await getViceMinistre();
    return data;
  },
});

export const cabinetQuery = queryOptions({
  queryKey: ["cabinet"],
  queryFn: async () => {
    const data = await getCabinet();
    return data;
  },
});

export const texteFondateurQuery = queryOptions({
  queryKey: ["texte-fondateur"],
  queryFn: async () => {
    const data = await getTexteFondateur();
    return data;
  },
});

export const anciensMinistresQuery = queryOptions({
  queryKey: ["anciens-ministres"],
  queryFn: async () => {
    const data = await getAnciensMinistres();
    return data;
  },
});

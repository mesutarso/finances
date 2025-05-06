"use server";

import {
  ministre,
  viceMinistre,
  cabinet,
  texteFondateur,
  anciensMinistres,
} from "@/lib/strapi";

export const getMinistre = async () => {
  const { data } = await ministre.find({
    populate: "*",
  });
  return {
    noms: data.noms,
    biographie: data.biographie,
    portrait: `${process.env.IMAGE_URL}${data?.portrait?.url}`,
    reseaux_sociaux: data.reseaux_sociaux,
  };
};

export const getCabinet = async () => {
  const { data } = await cabinet.find({
    populate: ["Dircab.portrait", "Dircaba.portrait", "Coordonnateur.portrait"],
  });
  return {
    dircab: {
      noms: data.Dircab.noms,
      fonction: data.Dircab.fonction,
      portrait: data?.Dircab?.portrait?.url
        ? `${process.env.IMAGE_URL}${data?.Dircab?.portrait?.url}`
        : null,
    },
    dircaba: data.Dircaba?.map((item: any) => ({
      noms: item.noms,
      fonction: item.fonction,
      portrait: item?.portrait?.url
        ? `${process.env.IMAGE_URL}${item?.portrait?.url}`
        : null,
    })),
    coordonnateurs: data.Coordonnateur?.map((item: any) => ({
      noms: item.noms,
      fonction: item.fonction,
      portrait: item?.portrait?.url
        ? `${process.env.IMAGE_URL}${item?.portrait?.url}`
        : null,
    })),
  };
};

export const getViceMinistre = async () => {
  const { data } = await viceMinistre.find({
    populate: "*",
  });
  return {
    noms: data.noms,
    biographie: data.biographie,
    portrait: `${process.env.IMAGE_URL}${data?.portrait?.url}`,
    reseaux_sociaux: data.reseaux_sociaux,
  };
};

export const getTexteFondateur = async () => {
  const { data } = await texteFondateur.find({
    populate: "*",
  });
  return data;
};

export const getAnciensMinistres = async () => {
  const { data } = await anciensMinistres.find({
    populate: ["ministres.portrait"],
  });
  //@ts-ignore
  const sortedMinistres = data?.ministres?.sort(
    (a: any, b: any) => b.ordre - a.ordre
  );
  return sortedMinistres?.map((ministre: any) => ({
    ...ministre,
    portrait: ministre.portrait?.url
      ? `${process.env.IMAGE_URL}${ministre.portrait?.url}`
      : null,
  }));
};

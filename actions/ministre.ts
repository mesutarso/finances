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
    populate: [
      "Dircab.portrait",
      "Dircaba.portrait",
      "Coordonnateur.portrait",
      "Conseillers.portrait",
    ],
  });
  return {
    dircab: data.Dircab,
    dircaba: data.Dircaba,
    coordonnateurs: data.Coordonnateur,
    conseillers: data.Conseillers,
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
  return data?.ministres?.sort((a, b) => new Date(b.ordre) - new Date(a.ordre));
};

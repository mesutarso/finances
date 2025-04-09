import { strapi } from "@strapi/client";

const client = strapi({
  baseURL: process.env.API_URL!,
  auth: process.env.TOKEN!,
});

const articles = await client.collection("articles");
const services = await client.collection("services");
const documents = await client.collection("documents");
const categories = await client.collection("categories");
const ressources = await client.collection("ressources");
const types = await client.collection("types");
const categoriesDocuments = await client.collection("categorie-documents");
const ministre = await client.single("ministre");
const viceMinistre = await client.single("vice-ministre");
const cabinet = await client.single("cabinet");
const texteFondateur = await client.single("texte-fondateur");
const anciensMinistres = await client.collection("ancien-ministre");

export {
  articles,
  services,
  documents,
  categories,
  ressources,
  types,
  categoriesDocuments,
  ministre,
  viceMinistre,
  cabinet,
  texteFondateur,
  anciensMinistres,
};

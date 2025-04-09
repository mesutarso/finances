import { strapi } from "@strapi/client";

const client = strapi({
  baseURL: process.env.API_URL!,
  auth: process.env.NEXT_PUBLIC_TOKEN,
});

const articles = client.collection("articles");
const services = client.collection("services");
const documents = client.collection("documents");
const categories = client.collection("categories");
const ressources = client.collection("ressources");
const types = client.collection("types");
const categoriesDocuments = client.collection("categorie-documents");
const ministre = client.single("ministre");
const viceMinistre = client.single("vice-ministre");
const cabinet = client.single("cabinet");
const texteFondateur = client.single("texte-fondateur");
const anciensMinistres = client.single("ancien-ministre");

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

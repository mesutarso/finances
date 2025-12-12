"use server";
import { newsletter } from "@/lib/strapi";
import { sendNewsletterEmail } from "./mail";
import { createStrapiCollection } from "@/lib/fetch";
import { validateOrigin } from "@/lib/security/server-action-wrapper";
import { createFormProtection } from "@/lib/arcjet";
import { protectServerAction } from "@/lib/security/arcjet-helpers";

export async function findNewsletterByEmail(email: string) {
  const { data } = await newsletter.find({
    filters: {
      email: {
        $eq: email,
      },
    },
  });
  const response = data[0];
  return response ? true : false;
}

// Protection Arcjet spécifique pour la newsletter
// Utilise createFormProtection qui ajoute rate limiting et bot detection
const newsletterProtection = createFormProtection({
  maxRequests: 3, // 3 requêtes par minute
  window: "1m",
});

// Fonction interne non protégée
const _subscribeToNewsletter = async (prevState: any, formData: FormData) => {
  // Protéger avec Arcjet
  const arcjetResult = await protectServerAction(newsletterProtection);
  if (arcjetResult.error) {
    return arcjetResult.error;
  }

  // Valider l'origine de la requête
  const isValidOrigin = await validateOrigin();
  if (!isValidOrigin) {
    return {
      success: false,
      error: "Requête non autorisée",
    };
  }

  const email = formData.get("email");
  if (!email) {
    return { success: false, error: "Veuillez saisir votre email" };
  }

  // Validation basique de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email as string)) {
    return { success: false, error: "Format d'email invalide" };
  }

  const isSubscribed = await findNewsletterByEmail(email as string);
  if (isSubscribed) {
    return { success: false, error: "Vous êtes déjà abonné à la newsletter" };
  }
  const response = await createStrapiCollection("newsletters", {
    email: email as string,
  });
  if (response?.data) {
    await sendNewsletterEmail(
      email as string,
      "Bienvenue à la newsletter",
      "Bienvenue à la newsletter"
    );
  }
  return { success: true };
};

// Exporter la fonction (déjà protégée avec Arcjet dans _subscribeToNewsletter)
export const subscribeToNewsletter = _subscribeToNewsletter;

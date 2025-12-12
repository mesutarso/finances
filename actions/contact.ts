"use server";

import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validations/contact";
import { Resend } from "resend";
import { validateOrigin } from "@/lib/security/server-action-wrapper";
import { createFormProtection } from "@/lib/arcjet";
import { protectServerAction } from "@/lib/security/arcjet-helpers";

const resend = new Resend(process.env.RESEND_API_KEY);

// Protection Arcjet spécifique pour le formulaire de contact
// Utilise createFormProtection qui ajoute rate limiting et bot detection
const contactProtection = createFormProtection({
  maxRequests: 5, // 5 requêtes par minute
  window: "1m",
});

// Fonction interne non protégée
const _sendMessageContact = async (
  prevState: any,
  formData: FormData
): Promise<any> => {
  // Protéger avec Arcjet
  const arcjetResult = await protectServerAction(contactProtection);
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
  const rawData = Object.fromEntries(formData);
  const {
    success,
    data,
    error: errorZod,
  } = contactFormSchema.safeParse(rawData);

  if (!success) {
    return {
      success: false,
      error: errorZod?.flatten().fieldErrors,
    };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Ministère des Finances RDC <noreply@finances.gouv.cd>",
      to: ["info@finances.gouv.cd"],
      subject: `Nouveau message de contact: ${data.sujet}`,
      text: `
        Nom: ${data.nom}
        Prénom: ${data.prenom}
        Email: ${data.email} 
        Téléphone: ${data.telephone}
        Sujet: ${data.sujet}
        Message: ${data.message}
      `,
    });

    if (error) {
      return {
        success: false,
        error:
          "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard.",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "Une erreur inattendue est survenue",
    };
  }
};

// Exporter la fonction (déjà protégée avec Arcjet dans _sendMessageContact)
export const sendMessageContact = _sendMessageContact;

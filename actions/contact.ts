"use server";

import {
  contactFormSchema,
} from "@/lib/validations/contact";
import { Resend } from "resend";
import {
  enforceServerRateLimit,
  validateOrigin,
} from "@/lib/security/server-action-wrapper";
import { createFormProtection } from "@/lib/arcjet";
import { protectServerAction } from "@/lib/security/arcjet-helpers";
import { validateCsrfToken } from "@/lib/security/csrf";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { hasFilledHoneypot } from "@/lib/security/input";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactProtection = createFormProtection({
  maxRequests: 5,
  window: "1m",
});

const CONTACT_HONEYPOT_FIELD = "societe";

const _sendMessageContact = async (
  _prevState: any,
  formData: FormData
): Promise<any> => {
  if (hasFilledHoneypot(formData, CONTACT_HONEYPOT_FIELD)) {
    return { success: true };
  }

  const isValidOrigin = await validateOrigin();
  if (!isValidOrigin) {
    return {
      success: false,
      error: "Requête non autorisée",
    };
  }

  const isValidCsrf = await validateCsrfToken(formData);
  if (!isValidCsrf) {
    return {
      success: false,
      error: "Session expirée. Veuillez actualiser la page.",
    };
  }

  const arcjetResult = await protectServerAction(contactProtection);
  if (arcjetResult.error) {
    return arcjetResult.error;
  }

  const ipRateLimit = await enforceServerRateLimit("contact", 5, 60_000);
  if (!ipRateLimit.allowed) {
    return {
      success: false,
      error: "Trop de requêtes. Veuillez réessayer plus tard.",
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
      error: errorZod.flatten().fieldErrors,
    };
  }

  const emailRateLimit = checkRateLimit(`contact:email:${data.email}`, 3, 60_000);
  if (!emailRateLimit.allowed) {
    return {
      success: false,
      error:
        "Cette adresse a envoyé trop de messages récemment. Veuillez patienter.",
    };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Ministère des Finances RDC <noreply@finances.gouv.cd>",
      to: ["info@finances.gouv.cd"],
      subject: `Nouveau message de contact: ${data.sujet}`,
      replyTo: data.email,
      text: `
        Nom: ${data.nom}
        Prénom: ${data.prenom}
        Email: ${data.email}
        Téléphone: ${data.telephone ?? "-"}
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
    console.error("[CONTACT_FORM_ERROR]", error);
    return {
      success: false,
      error: "Une erreur inattendue est survenue",
    };
  }
};

export const sendMessageContact = _sendMessageContact;

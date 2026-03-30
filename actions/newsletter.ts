"use server";

import { newsletter } from "@/lib/strapi";
import { sendNewsletterEmail } from "./mail";
import { createStrapiCollection } from "@/lib/fetch";
import {
  enforceServerRateLimit,
  validateOrigin,
} from "@/lib/security/server-action-wrapper";
import { createFormProtection } from "@/lib/arcjet";
import { protectServerAction } from "@/lib/security/arcjet-helpers";
import { newsletterSubscriptionSchema } from "@/lib/validations/newsletter";
import { validateCsrfToken } from "@/lib/security/csrf";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { hasFilledHoneypot } from "@/lib/security/input";

export async function findNewsletterByEmail(email: string) {
  const { data } = await newsletter.find({
    filters: {
      email: {
        $eq: email,
      },
    },
  });

  return Boolean(data[0]);
}

const newsletterProtection = createFormProtection({
  maxRequests: 3,
  window: "1m",
});

const NEWSLETTER_HONEYPOT_FIELD = "company";

const _subscribeToNewsletter = async (_prevState: any, formData: FormData) => {
  if (hasFilledHoneypot(formData, NEWSLETTER_HONEYPOT_FIELD)) {
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

  const arcjetResult = await protectServerAction(newsletterProtection);
  if (arcjetResult.error) {
    return arcjetResult.error;
  }

  const ipRateLimit = await enforceServerRateLimit("newsletter", 3, 60_000);
  if (!ipRateLimit.allowed) {
    return {
      success: false,
      error: "Trop de requêtes. Veuillez réessayer plus tard.",
    };
  }

  const parsed = newsletterSubscriptionSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Adresse email invalide",
    };
  }

  const { email } = parsed.data;
  const emailRateLimit = checkRateLimit(
    `newsletter:email:${email}`,
    2,
    10 * 60 * 1000
  );

  if (!emailRateLimit.allowed) {
    return {
      success: false,
      error: "Cette adresse a déjà effectué trop de tentatives récemment.",
    };
  }

  try {
    const isSubscribed = await findNewsletterByEmail(email);
    if (isSubscribed) {
      return {
        success: false,
        error: "Vous êtes déjà abonné à la newsletter",
      };
    }

    const response = await createStrapiCollection("newsletters", {
      email,
    });

    if (response?.data) {
      await sendNewsletterEmail(email);
    }

    return { success: true };
  } catch (error) {
    console.error("[NEWSLETTER_SUBSCRIBE_ERROR]", error);
    return {
      success: false,
      error:
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard.",
    };
  }
};

export const subscribeToNewsletter = _subscribeToNewsletter;

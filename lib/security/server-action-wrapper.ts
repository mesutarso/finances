/**
 * Wrapper de sécurité pour les Server Actions
 *
 * Ajoute le rate limiting et la validation des requêtes
 */

import { headers } from "next/headers";
import { checkRateLimit, getRateLimitIdentifier } from "./rate-limit";

interface ServerActionOptions {
  maxRequests?: number;
  windowMs?: number;
  requireAuth?: boolean;
}

/**
 * Wrapper pour sécuriser les Server Actions
 *
 * @param action La Server Action à protéger
 * @param options Options de sécurité
 * @returns La Server Action protégée
 */
export function withSecurity<T extends (...args: any[]) => Promise<any>>(
  action: T,
  options: ServerActionOptions = {}
): T {
  const {
    maxRequests = 10,
    windowMs = 60000, // 1 minute
    requireAuth = false,
  } = options;

  return (async (...args: Parameters<T>) => {
    try {
      // Obtenir les headers de la requête
      const headersList = await headers();

      // Créer un objet Request simulé pour le rate limiting
      const request = {
        headers: {
          get: (name: string) => headersList.get(name),
        },
      } as Request;

      // Vérifier le rate limiting
      const identifier = getRateLimitIdentifier(request);
      const rateLimitResult = checkRateLimit(identifier, maxRequests, windowMs);

      if (!rateLimitResult.allowed) {
        return {
          success: false,
          error: "Trop de requêtes. Veuillez réessayer plus tard.",
          retryAfter: Math.ceil(
            (rateLimitResult.resetTime - Date.now()) / 1000
          ),
        };
      }

      // Vérifier l'authentification si requis
      if (requireAuth) {
        // Ajoutez votre logique d'authentification ici
        // const session = await getSession();
        // if (!session) {
        //   return { success: false, error: "Non autorisé" };
        // }
      }

      // Exécuter l'action
      return await action(...args);
    } catch (error) {
      console.error("[Server Action Error]", error);

      // Ne pas exposer les détails de l'erreur en production
      if (process.env.NODE_ENV === "production") {
        return {
          success: false,
          error: "Une erreur est survenue. Veuillez réessayer plus tard.",
        };
      }

      // En développement, retourner l'erreur complète
      throw error;
    }
  }) as T;
}

/**
 * Helper pour valider l'origine de la requête
 */
export async function validateOrigin(): Promise<boolean> {
  const headersList = await headers();
  const origin = headersList.get("origin");
  const host = headersList.get("host");

  // En production, vérifier que l'origine correspond au domaine
  if (process.env.NODE_ENV === "production") {
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_SITE_URL,
      `https://${host}`,
      `http://${host}`,
    ].filter(Boolean);

    if (origin && !allowedOrigins.includes(origin)) {
      return false;
    }
  }

  return true;
}

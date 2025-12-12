/**
 * Helpers pour utiliser Arcjet dans les routes API et Server Actions
 *
 * Ces helpers simplifient l'utilisation d'Arcjet selon les best practices.
 */

import { NextResponse, type NextRequest } from "next/server";
import type { ArcjetDecision } from "@arcjet/next";
import { isMissingUserAgent, isSpoofedBot } from "@arcjet/inspect";
import { arcjetBase } from "@/lib/arcjet";

/**
 * Gère les erreurs Arcjet selon les best practices (fail-open)
 *
 * @param decision La décision Arcjet
 * @param request La requête Next.js
 * @returns null si tout va bien, ou une NextResponse avec erreur
 */
export function handleArcjetErrors(
  decision: ArcjetDecision,
  request: NextRequest
): NextResponse | null {
  // Vérifier les erreurs (fail-open)
  if (decision.isErrored()) {
    // Arcjet est conçu pour fail-open : on logge mais on continue
    console.warn("[ARCJET ERROR]", {
      id: decision.id,
      path: request.nextUrl.pathname,
      reason: decision.reason.message,
    });

    // Pour les routes très sensibles, vous pouvez choisir de fail-closed :
    // return NextResponse.json(
    //   { error: "Service de sécurité indisponible" },
    //   { status: 503 }
    // );

    // Par défaut, on continue (fail-open)
    return null;
  }

  // Vérifier les requêtes refusées
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        {
          error: "Trop de requêtes. Veuillez réessayer plus tard.",
        },
        { status: 429 }
      );
    }

    if (decision.reason.isBot()) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    if (decision.reason.isShield()) {
      return NextResponse.json(
        { error: "Requête bloquée pour des raisons de sécurité" },
        { status: 403 }
      );
    }

    // Autre raison de refus
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  // Vérifier les problèmes spécifiques avec @arcjet/inspect
  if (decision.results.some(isMissingUserAgent)) {
    // Les requêtes sans User-Agent sont suspectes
    console.warn("[ARCJET] User-Agent header is missing", {
      path: request.nextUrl.pathname,
      ip: decision.ip,
    });
    // Vous pouvez choisir de bloquer ou de logger seulement
    // return NextResponse.json(
    //   { error: "Bad request" },
    //   { status: 400 }
    // );
  }

  if (decision.results.some(isSpoofedBot)) {
    // Bot spoofé détecté
    console.warn("[ARCJET] Spoofed bot detected", {
      path: request.nextUrl.pathname,
      ip: decision.ip,
    });
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  // Vérifier les IPs d'hébergement (optionnel)
  if (decision.ip.isHosting()) {
    // Les IPs d'hébergement sont souvent des bots
    // Mais peuvent être légitimes pour certaines routes API
    const shouldBlockHosting =
      process.env.BLOCK_HOSTING_IPS === "true" &&
      !request.nextUrl.pathname.startsWith("/api/");

    if (shouldBlockHosting) {
      console.warn("[ARCJET] Hosting IP blocked", {
        path: request.nextUrl.pathname,
        ip: decision.ip,
      });
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }
  }

  return null;
}

/**
 * Helper pour protéger une route API avec Arcjet
 *
 * @param request La requête Next.js
 * @param protection L'instance Arcjet avec les règles spécifiques
 * @param options Options supplémentaires
 * @returns La décision Arcjet ou une réponse d'erreur
 */
export async function protectApiRoute(
  request: NextRequest,
  protection: ReturnType<typeof arcjetBase.withRule>,
  options?: {
    requested?: number;
  }
): Promise<
  | { decision: ArcjetDecision; error: null }
  | { decision: null; error: NextResponse }
> {
  try {
    const decision = await protection.protect(request, {
      requested: options?.requested || 1,
    });

    const error = handleArcjetErrors(decision, request);
    if (error) {
      return { decision: null, error };
    }

    return { decision, error: null };
  } catch (error) {
    // En cas d'erreur exceptionnelle, fail-open
    console.error("[ARCJET] Unexpected error", error);
    // Retourner une décision "allow" pour fail-open
    return {
      decision: null,
      error: null, // On continue malgré l'erreur (fail-open)
    };
  }
}

/**
 * Helper pour protéger une Server Action avec Arcjet
 *
 * @param protection L'instance Arcjet avec les règles spécifiques
 * @returns Un objet avec la décision ou une erreur à retourner
 */
export async function protectServerAction(
  protection: ReturnType<typeof arcjetBase.withRule>
): Promise<
  | { decision: ArcjetDecision; error: null }
  | { decision: null; error: { success: false; error: string } }
> {
  // Import dynamique pour éviter les problèmes de circular dependencies
  const { request } = await import("@arcjet/next");

  try {
    // Obtenir l'objet request pour Arcjet
    const req = await request();
    const decision = await protection.protect(req);

    // Vérifier les erreurs (fail-open)
    if (decision.isErrored()) {
      console.warn("[ARCJET ERROR] Server Action", {
        id: decision.id,
        reason: decision.reason.message,
      });
      // Fail-open : on continue malgré l'erreur
      return { decision, error: null };
    }

    // Vérifier les refus
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          decision: null,
          error: {
            success: false,
            error: "Trop de requêtes. Veuillez réessayer plus tard.",
          },
        };
      }

      if (decision.reason.isBot()) {
        return {
          decision: null,
          error: {
            success: false,
            error: "Accès refusé",
          },
        };
      }

      return {
        decision: null,
        error: {
          success: false,
          error: "Requête bloquée pour des raisons de sécurité",
        },
      };
    }

    return { decision, error: null };
  } catch (error) {
    // Fail-open en cas d'erreur exceptionnelle
    console.error("[ARCJET] Server Action error", error);
    // Retourner null pour error signifie qu'on continue (fail-open)
    return { decision: null, error: null };
  }
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { handlePreflightRequest, setCORSHeaders } from "@/lib/security/cors";
import { arcjetBase, tokenBucket } from "@/lib/arcjet";
import { protectApiRoute } from "@/lib/security/arcjet-helpers";

/**
 * Protection Arcjet spécifique pour cette route API
 * Utilise withRule() pour ajouter des règles spécifiques à la route de base
 */
const apiProtection = arcjetBase.withRule(
  tokenBucket({
    mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
    refillRate: 5, // Refill 5 tokens per interval
    interval: 10, // Refill every 10 seconds
    capacity: 10, // Bucket capacity of 10 tokens
  })
);

export async function GET(req: NextRequest) {
  // Gérer les requêtes preflight OPTIONS
  const preflightResponse = handlePreflightRequest(req);
  if (preflightResponse) {
    return preflightResponse;
  }

  // Protéger la route avec Arcjet
  const result = await protectApiRoute(req, apiProtection, {
    requested: 5, // Deduct 5 tokens from the bucket
  });

  // Si une erreur a été retournée, la renvoyer
  if (result.error) {
    return result.error;
  }

  // La décision est disponible dans result.decision
  // Vous pouvez l'utiliser pour des logs ou des métriques
  if (result.decision) {
    console.log("Arcjet decision", {
      id: result.decision.id,
      conclusion: result.decision.conclusion,
      ip: result.decision.ip,
    });
  }

  // Réponse réussie
  const response = NextResponse.json({ message: "Hello world" });
  const origin = req.headers.get("origin");
  return setCORSHeaders(response, origin);
}

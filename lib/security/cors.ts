/**
 * Configuration CORS pour les routes API
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Origines autorisées
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL,
  "https://finances.gouv.cd",
  "http://localhost:3000", // Pour le développement
].filter(Boolean) as string[];

/**
 * Vérifie si une origine est autorisée
 */
export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

/**
 * Configure les headers CORS pour une réponse
 */
export function setCORSHeaders(
  response: NextResponse,
  origin: string | null
): NextResponse {
  if (origin && isOriginAllowed(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  response.headers.set("Access-Control-Max-Age", "86400"); // 24 heures

  return response;
}

/**
 * Gère les requêtes preflight OPTIONS
 */
export function handlePreflightRequest(
  request: NextRequest
): NextResponse | null {
  if (request.method === "OPTIONS") {
    const origin = request.headers.get("origin");
    const response = new NextResponse(null, { status: 204 });
    return setCORSHeaders(response, origin);
  }
  return null;
}

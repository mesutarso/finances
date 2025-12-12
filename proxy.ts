import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware pour ajouter les headers de sécurité
 *
 * Note: Arcjet ne doit PAS être utilisé dans le middleware selon les best practices.
 * La protection Arcjet doit être appliquée dans chaque route handler individuellement.
 *
 * @see https://docs.arcjet.com/best-practices#avoid-arcjet-in-middleware
 */
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Générer un nonce pour CSP (Content Security Policy)
  // Le nonce est généré pour chaque requête pour une sécurité maximale
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  // Configuration CSP adaptée selon l'environnement
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${
      isDev ? "'unsafe-eval'" : ""
    } https://www.googletagmanager.com;
    style-src 'self' ${isDev ? "'unsafe-inline'" : `'nonce-${nonce}' 'unsafe-hashes'`};
    img-src 'self' blob: data: https: https://maj.finances.gouv.cd;
    font-src 'self' data:;
    connect-src 'self' https://maj.finances.gouv.cd;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  // Headers de sécurité supplémentaires
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Ajouter CSP à la réponse également
  response.headers.set("Content-Security-Policy", cspHeader);

  // Rate limiting header personnalisé
  response.headers.set("X-RateLimit-Limit", "60");
  response.headers.set("X-RateLimit-Window", "60");

  return response;
}

// Configuration du matcher pour exclure les assets statiques
export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf:
     * - api (géré séparément si nécessaire)
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico, sitemap.xml, robots.txt (fichiers de métadonnées)
     * - fichiers avec extensions (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$).*)",
  ],
};

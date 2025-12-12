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
  const response = NextResponse.next();

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

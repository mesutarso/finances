/**
 * Système de rate limiting pour les Server Actions
 *
 * Utilise un système de cache en mémoire pour le rate limiting
 * En production, utilisez Redis ou un service externe
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Cache en mémoire pour le rate limiting
// En production, utilisez Redis ou une base de données
const rateLimitCache = new Map<string, RateLimitEntry>();

/**
 * Nettoie le cache toutes les heures
 */
setInterval(
  () => {
    const now = Date.now();
    for (const [key, entry] of rateLimitCache.entries()) {
      if (entry.resetTime < now) {
        rateLimitCache.delete(key);
      }
    }
  },
  60 * 60 * 1000
); // 1 heure

/**
 * Vérifie si une requête dépasse la limite de taux
 *
 * @param identifier Identifiant unique (IP, user ID, etc.)
 * @param maxRequests Nombre maximum de requêtes
 * @param windowMs Fenêtre de temps en millisecondes
 * @returns true si la limite est dépassée, false sinon
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 1 minute par défaut
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitCache.get(identifier);

  if (!entry || entry.resetTime < now) {
    // Nouvelle entrée ou fenêtre expirée
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitCache.set(identifier, newEntry);
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: newEntry.resetTime,
    };
  }

  if (entry.count >= maxRequests) {
    // Limite atteinte
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // Incrémenter le compteur
  entry.count++;
  rateLimitCache.set(identifier, entry);

  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Obtient l'identifiant pour le rate limiting depuis une requête
 */
export function getRateLimitIdentifier(request: Request): string {
  // Utiliser l'IP du client
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  return ip;
}

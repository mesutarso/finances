import arcjet, {
  detectBot,
  fixedWindow,
  shield,
  slidingWindow,
  tokenBucket,
} from "@arcjet/next";

// Ré-exporter les règles pour simplifier les imports dans les handlers
export { detectBot, fixedWindow, shield, slidingWindow, tokenBucket };

// Déterminer le mode selon l'environnement
// DRY_RUN en développement pour tester sans bloquer
const getMode = () => {
  // Permettre de forcer le mode via variable d'environnement
  if (process.env.ARCJET_MODE === "LIVE") return "LIVE";
  if (process.env.ARCJET_MODE === "DRY_RUN") return "DRY_RUN";

  // Par défaut: DRY_RUN en développement, LIVE en production
  return process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN";
};

// Configuration des proxies si nécessaire
// Arcjet détecte automatiquement les proxies pour Vercel, Netlify, Fly.io, Firebase
// Si vous utilisez un autre provider, configurez les IPs ici
const proxies = process.env.ARCJET_PROXIES
  ? process.env.ARCJET_PROXIES.split(",").map((ip) => ip.trim())
  : undefined;

/**
 * Instance de base Arcjet avec règles communes
 *
 * Cette instance contient les règles de base qui s'appliquent à toutes les routes.
 * Utilisez `withRule()` pour ajouter des règles spécifiques par route.
 */
export const arcjetBase = arcjet({
  key: process.env.ARCJET_KEY || "",
  rules: [
    // Shield protège contre les attaques communes (SQL injection, XSS, etc.)
    shield({
      mode: getMode(),
    }),
    // Détection de base des bots malveillants
    // Les règles spécifiques peuvent être ajoutées avec withRule()
    detectBot({
      mode: getMode(),
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc.
        // Ajoutez d'autres catégories si nécessaire
        // "CATEGORY:MONITOR", // Services de monitoring
        // "CATEGORY:PREVIEW", // Link previews (Slack, Discord, etc.)
      ],
    }),
  ],
  // Configuration des proxies si nécessaire
  ...(proxies && proxies.length > 0 ? { proxies } : {}),
});

/**
 * Helper pour créer une instance Arcjet avec rate limiting pour les routes API
 */
export function createApiProtection(options?: {
  maxRequests?: number;
  window?: string;
  mode?: "LIVE" | "DRY_RUN";
}) {
  const { maxRequests = 60, window = "1m", mode = getMode() } = options || {};

  return arcjetBase.withRule(
    fixedWindow({
      mode,
      max: maxRequests,
      window,
    })
  );
}

/**
 * Helper pour créer une instance Arcjet avec rate limiting strict pour les formulaires
 */
export function createFormProtection(options?: {
  maxRequests?: number;
  window?: string;
  mode?: "LIVE" | "DRY_RUN";
}) {
  const { maxRequests = 5, window = "1m", mode = getMode() } = options || {};

  return arcjetBase
    .withRule(
      fixedWindow({
        mode,
        max: maxRequests,
        window,
      })
    )
    .withRule(
      detectBot({
        mode,
        allow: [], // Bloquer tous les bots pour les formulaires
      })
    );
}

/**
 * Helper pour créer une instance Arcjet avec token bucket rate limiting
 */
export function createTokenBucketProtection(options?: {
  refillRate?: number;
  interval?: number;
  capacity?: number;
  mode?: "LIVE" | "DRY_RUN";
}) {
  const {
    refillRate = 10,
    interval = 10,
    capacity = 20,
    mode = getMode(),
  } = options || {};

  return arcjetBase.withRule(
    tokenBucket({
      mode,
      refillRate,
      interval,
      capacity,
    })
  );
}

import { z } from "zod";
import { isBlockedEmailDomain, normalizeEmail } from "@/lib/security/input";

export const newsletterSubscriptionSchema = z.object({
  email: z.preprocess(
    normalizeEmail,
    z
      .string()
      .min(1, "Veuillez saisir votre email")
      .max(254, "Adresse email trop longue")
      .email("Format d'email invalide")
      .refine((email) => !isBlockedEmailDomain(email), {
        message: "Veuillez utiliser une adresse email valide et non jetable",
      })
  ),
});

export type NewsletterSubscriptionData = z.infer<
  typeof newsletterSubscriptionSchema
>;

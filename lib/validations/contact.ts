import { z } from "zod";
import {
  isBlockedEmailDomain,
  normalizeEmail,
  sanitizeMultilineText,
  sanitizePhoneNumber,
  sanitizeSingleLineText,
} from "@/lib/security/input";

export const contactFormSchema = z.object({
  nom: z.preprocess(
    sanitizeSingleLineText,
    z
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(100, "Le nom est trop long")
  ),
  prenom: z.preprocess(
    sanitizeSingleLineText,
    z
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères")
      .max(100, "Le prénom est trop long")
  ),
  email: z.preprocess(
    normalizeEmail,
    z
      .string()
      .max(254, "Adresse email trop longue")
      .email("Veuillez entrer une adresse email valide")
      .refine((email) => !isBlockedEmailDomain(email), {
        message:
          "Veuillez utiliser une adresse email valide et non jetable",
      })
  ),
  telephone: z.preprocess(
    (value) => {
      const sanitized = sanitizePhoneNumber(value);
      return sanitized || undefined;
    },
    z
      .string()
      .regex(/^\+?[0-9()\- ]{7,20}$/, "Numéro de téléphone invalide")
      .optional()
  ),
  sujet: z.preprocess(
    sanitizeSingleLineText,
    z
      .string()
      .min(5, "Le sujet doit contenir au moins 5 caractères")
      .max(150, "Le sujet est trop long")
  ),
  message: z.preprocess(
    sanitizeMultilineText,
    z
      .string()
      .min(10, "Le message doit contenir au moins 10 caractères")
      .max(2000, "Le message est trop long")
  ),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

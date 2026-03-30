"use server";
import { Resend } from "resend";
import NewsletterTemplate from "@/components/templates/newsletter";
import { newsletterSubscriptionSchema } from "@/lib/validations/newsletter";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsletterEmail(email: string) {
  const parsed = newsletterSubscriptionSchema.safeParse({ email });

  if (!parsed.success) {
    return { error: "Adresse email invalide" };
  }

  const { error } = await resend.emails.send({
    from: "Ministère des Finances RDC <noreply@finances.gouv.cd>",
    to: [parsed.data.email],
    subject: "Bienvenue à la newsletter",
    react: NewsletterTemplate(),
  });

  if (error) {
    console.error(error);
    return { error: "Failed to send email" };
  }
  return { success: "Email sent successfully" };
}

"use server";
import { Resend } from "resend";
import NewsletterTemplate from "@/components/templates/newsletter";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsletterEmail(
  email: string,
  subject: string,
  message: string
) {
  const { error } = await resend.emails.send({
    from: "Ministère des Finances RDC <noreply@finances.gouv.cd>",
    to: [email],
    subject: subject,
    react: NewsletterTemplate(),
  });

  if (error) {
    console.error(error);
    return { error: "Failed to send email" };
  }
  return { success: "Email sent successfully" };
}

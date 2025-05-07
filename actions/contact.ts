"use server";

import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validations/contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMessageContact = async (
  prevState: any,
  formData: FormData
): Promise<any> => {
  const rawData = Object.fromEntries(formData);
  const {
    success,
    data,
    error: errorZod,
  } = contactFormSchema.safeParse(rawData);

  if (!success) {
    return {
      success: false,
      error: errorZod?.flatten().fieldErrors,
    };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Ministère des Finances RDC <noreply@finances.gouv.cd>",
      to: ["info@finances.gouv.cd"],
      subject: `Nouveau message de contact: ${data.sujet}`,
      text: `
        Nom: ${data.nom}
        Prénom: ${data.prenom}
        Email: ${data.email} 
        Téléphone: ${data.telephone}
        Sujet: ${data.sujet}
        Message: ${data.message}
      `,
    });

    if (error) {
      return {
        success: false,
        error:
          "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard.",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "Une erreur inattendue est survenue",
    };
  }
};

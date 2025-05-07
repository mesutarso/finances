"use server";
import { newsletter } from "@/lib/strapi";
import { sendNewsletterEmail } from "./mail";
import { createStrapiCollection } from "@/lib/fetch";
export async function findNewsletterByEmail(email: string) {
  const { data } = await newsletter.find({
    filters: {
      email: {
        $eq: email,
      },
    },
  });
  const response = data[0];
  return response ? true : false;
}

export async function subscribeToNewsletter(
  prevState: any,
  formData: FormData
) {
  const email = formData.get("email");
  if (!email) {
    return { success: false, error: "Veuillez saisir votre email" };
  }
  const isSubscribed = await findNewsletterByEmail(email as string);
  if (isSubscribed) {
    return { success: false, error: "Vous êtes déjà abonné à la newsletter" };
  }
  const response = await createStrapiCollection("newsletters", {
    email: email as string,
  });
  if (response?.data) {
    await sendNewsletterEmail(
      email as string,
      "Bienvenue à la newsletter",
      "Bienvenue à la newsletter"
    );
  }
  return { success: true };
}

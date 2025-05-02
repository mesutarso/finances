"use server";
import { newsletter } from "@/lib/strapi";

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
  const response = await newsletter.create({
    email: email as string,
    audience: "abonne",
  });
  return { success: true };
}

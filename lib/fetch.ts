"use server";

export const createStrapiCollection = async (collection: string, data: any) => {
  try {
    const response = await fetch(`${process.env.API_URL}/${collection}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la création de la collection:", error);
    throw error;
  }
};

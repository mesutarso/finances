import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    if (!dateString) return "-";
    const date = parseISO(dateString);
    return format(date, "dd MMMM yyyy", { locale: fr });
  } catch (error) {
    return "-";
  }
}

export function formatCategorie(categorie: string): string {
  const data = {
    "calendrier-des-emissions": "Calendrier des émissions",
    "annonces-et-resultats": "Annonces et résultats",
    communiques: "Communiqués",
    "autres-publications": "Autres publications",
    documents: "Documents",
    "rapports-annuels": "Rapports annuels",
    statistiques: "Statistiques",
    "photos-et-videos": "Photos et vidéos",
    "communiques-marche-de-titres": "Communiqués - Marché des titres",
    "autres-publications-marches-des-titres":
      "Autres publications - Marché des titres",
  };

  return data[categorie as keyof typeof data] || categorie;
}

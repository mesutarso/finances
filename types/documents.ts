export interface Document {
  id: string;
  titre: string;
  date_publication: string;
  fichier?: {
    url: string;
  };
  url?: string;
  type?: {
    nom: string;
    "categorie-documents"?: Array<{
      nom: string;
    }>;
  };
}

export interface DocumentFilters {
  type: string | null;
  category: string | null;
  dateFrom: Date | null;
  dateTo: Date | null;
}

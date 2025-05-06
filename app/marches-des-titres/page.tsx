import { DocumentsDataTable } from "@/components/documents/data-table";
import { formatCategorie } from "@/lib/utils";
import { Metadata } from "next";


type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata: Metadata = {
    title: "Marchés des titres | Ministère des Finances",
    description: "Marchés des titres",
}


export default async function Ressources({ searchParams }: Props) {
    const { categorie } = await searchParams

    const formatedCategorie = categorie ? formatCategorie(categorie.toString()) : "Tous les documents"

    const titleCategorie = formatedCategorie === "Tous les documents" ? "Documents" : formatedCategorie

    // Revalidate path when categorie changes

    return (
        <div className="container section">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-primary capitalize">{titleCategorie}</h1>
                <h2 className="text-xl font-bold mb-2">Ministère des Finances</h2>
            </div>
            <DocumentsDataTable categorie={formatedCategorie} />
        </div>
    )
}
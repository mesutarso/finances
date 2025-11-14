import { getDocumentIds, fetchDocument } from "@/actions/documents"
import DocumentDetailsClient from "@/components/documents/details-client"
import type { Metadata } from "next"
import { cacheLife } from "next/cache"

type RessourcePageDetailsProps = {
    params: Promise<{ id: string }>
}

/**
 * Génère les paramètres statiques pour les 125 derniers documents
 */
export async function generateStaticParams() {
    const documents = await getDocumentIds()
    return documents.map((doc) => ({
        id: doc.id,
    }))
}

export async function generateMetadata(
    { params }: RessourcePageDetailsProps
): Promise<Metadata> {
    'use cache'
    cacheLife('minutes')
    const { id } = await params
    const document = await fetchDocument(id)

    if (!document) {
        return {
            title: "Document introuvable",
            description: "Le document demandé n'a pas été trouvé",
        }
    }

    return {
        title: document.titre,
        description: `Document : ${document.titre}`,
    }
}

export default async function RessourcePageDetails({ params }: RessourcePageDetailsProps) {
    const { id } = await params

    return (
        <div className="container section">
            <DocumentDetailsClient id={id} />
        </div>
    )
}
import { fetchDocument } from "@/actions/documents"
import { notFound } from "next/navigation"
import DocumentDetails from "@/components/documents/details"

type RessourcePageDetailsProps = {
    params: Promise<{ id: string }>

}

export default async function RessourcePageDetails({ params }: RessourcePageDetailsProps) {
    const { id } = await params
    const document = await fetchDocument(id)
    if (!document) {
        notFound()
    }
    return <div className="container section">

        <DocumentDetails document={document} />
    </div>
}
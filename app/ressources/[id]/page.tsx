import { fetchDocument } from "@/actions/documents"
import { notFound } from "next/navigation"
import PDFViewer from "@/components/documents/details"

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
        <h1 className="text-2xl font-bold text-center text-primary">Ressource </h1>
        <div className="flex flex-col gap-4">

        </div>
        <PDFViewer document={document} />
    </div>
}
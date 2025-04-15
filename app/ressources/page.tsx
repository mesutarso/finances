import { DocumentsDataTable } from "@/components/documents/data-table";
import { formatCategorie } from "@/lib/utils";


type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export default async function Ressources({ searchParams }: Props) {




    return (
        <div className="container section">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-primary capitalize">Tous les documents</h1>
                <h2 className="text-xl font-bold mb-2">Ministère des Finances</h2>
                <p className="text-xl text-muted-foreground">République Démocratique du Congo</p>
            </div>
            <DocumentsDataTable categorie={''} />
        </div>
    )
}
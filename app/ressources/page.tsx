
import { DocumentsDataTable } from "@/components/documents/data-table";
export default function Ressources() {

    return (
        <div className="container section">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-primary">Documents</h1>
                <h2 className="text-xl font-bold mb-2">Ministère des Finances</h2>
                <p className="text-xl text-muted-foreground">République Démocratique du Congo</p>
            </div>
            <DocumentsDataTable />
        </div>
    )
}
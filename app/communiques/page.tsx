import { CommuniquesTabs } from "@/components/communiques/tabs"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Communiqués | Ministère des Finances",
    description: "Communiqués du Ministère des Finances",
}

export default function Communiques() {
    return (
        <div className="container section">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-primary">Communiqués</h1>
                <h2 className="text-xl font-bold mb-2">Ministère des Finances</h2>
            </div>
            <CommuniquesTabs />
        </div>
    )
}
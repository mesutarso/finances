import { Metadata } from "next";
import { MediasList } from "@/components/medias/list";

export const metadata: Metadata = {
    title: "Photos et vidéos | Ministère des Finances",
    description: "Photos et vidéos",
}

export default function Medias() {
    return (
        <div className="container section">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-primary ">Photos et Vidéos</h1>
                <h2 className="text-xl font-bold mb-2">Ministère des Finances</h2>
            </div>

            <MediasList />
        </div>
    )
}
import { Metadata } from "next";
import { MediasList } from "@/components/medias/list";
import { getQueryClient } from "@/components/providers/react-query/client";
import { mediathequesQuery } from "@/lib/react-query/media/options";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";


export const metadata: Metadata = {
    title: "Photos et vidéos | Ministère des Finances",
    description: "Photos et vidéos",
}

async function Medias() {

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(mediathequesQuery);
    const dehydratedState = dehydrate(queryClient);
    return (
        <HydrationBoundary state={dehydratedState}>
            <div className="container section">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2 text-primary capitalize">Photos et vidéos</h1>
                    <h2 className="text-xl font-bold mb-2">Ministère des Finances</h2>
                    <p className="text-xl text-muted-foreground">République Démocratique du Congo</p>
                </div>

                <MediasList />
            </div>
        </HydrationBoundary>
    )
}

export default Medias
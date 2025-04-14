
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { anciensMinistresQuery } from "@/lib/react-query/ministere/options";
import { getQueryClient } from "@/components/providers/react-query/client";
import AnciensMinistresContent from "@/components/ministere/anciens-ministres";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Anciens Ministres des Finances",
    description: "Anciens Ministres des Finances",
}

async function AnciensMinistres() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(anciensMinistresQuery);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="container section">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2 text-primary">Anciens Ministres des Finances</h1>
                    <h2 className="text-xl font-bold mb-2">Ministère des Finances</h2>
                    <p className="text-xl text-muted-foreground">République Démocratique du Congo</p>
                </div>
                <AnciensMinistresContent />
            </div>
        </HydrationBoundary>
    )
}

export default AnciensMinistres;
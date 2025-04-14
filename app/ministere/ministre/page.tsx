import { Metadata } from "next";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ministreQuery } from "@/lib/react-query/ministere/options"
import MinistreContent from "@/components/ministere/ministre"
import { getQueryClient } from "@/components/providers/react-query/client";

export const metadata: Metadata = {
    title: "Ministre | Ministère des Finances",
    description: "Le site officiel du Ministre des Finances de la République Démocratique du Congo",
};

export const dynamic = "force-dynamic";

export default async function Ministre() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(ministreQuery);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <MinistreContent />
        </HydrationBoundary>
    )
}



import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { cabinetQuery } from "@/lib/react-query/ministere/options"
import { getQueryClient } from "@/components/providers/react-query/client";
import CabinetContent from '@/components/ministere/cabinet'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cabinet du Ministre des Finances",
    description: "Cabinet du Ministre des Finances",
}

export const revalidate = 3600;

export default async function Cabinet() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(cabinetQuery);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="container section">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2 text-primary">Cabinet du Ministre des Finances</h1>
                    <h2 className="text-xl font-bold mb-2">Ministère des Finances</h2>
                    <p className="text-xl text-muted-foreground">République Démocratique du Congo</p>
                </div>
                <CabinetContent />

            </div>
        </HydrationBoundary>
    )
}


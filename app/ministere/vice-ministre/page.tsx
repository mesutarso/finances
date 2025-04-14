
import ViceMinistreContent from '@/components/ministere/vice-ministre'
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { viceMinistreQuery } from '@/lib/react-query/ministere/options'
import { getQueryClient } from '@/components/providers/react-query/client';
import { Metadata } from 'next';
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Vice-Ministre des Finances",
    description: "Vice-Ministre des Finances",
}

async function ViceMinistre() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(viceMinistreQuery);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ViceMinistreContent />
        </HydrationBoundary>
    )
}

export default ViceMinistre
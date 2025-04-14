import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Line from '@/components/shared/line'
import { allServicesQuery } from "@/lib/react-query/services/options";
import { getQueryClient } from "@/components/providers/react-query/client";
import ServicesContent from "@/components/home/services/content";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Services | Ministère des Finances",
    description: "Services",
}

function Services() {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(allServicesQuery);
    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className="container section">
                <div className="max-w-2xl relative inline-block space-y-2 mb-8">
                    <h1 className="md:text-3xl text-2xl font-bold">Les services </h1>
                    <Line />
                </div>
                <ServicesContent />
            </div>
        </HydrationBoundary>
    )
}

export default Services
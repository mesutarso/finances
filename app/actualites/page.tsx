import { Metadata } from "next";
import { getAllArticlesQuery } from "@/lib/react-query/articles/options";
import { categoriesQuery } from "@/lib/react-query/categories/options";
import { getQueryClient } from "@/components/providers/react-query/client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Posts from "@/components/home/posts/actualites";

export const metadata: Metadata = {
    title: "Actualités | Ministère des Finances",
    description: "Les dernières actualités du Ministère des Finances de la République Démocratique du Congo",
};

export const dynamic = "force-dynamic";

export default async function Actualites() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(getAllArticlesQuery(1, 10, ''));
    await queryClient.prefetchQuery(categoriesQuery);
    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className="container section">
                <Posts />
            </div>
        </HydrationBoundary>
    )
}
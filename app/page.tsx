import { Metadata } from "next";
import Line from "@/components/shared/line";
import Hero from "@/components/home/hero";
import HomePosts from "@/components/home/posts";
import HomeServices from "@/components/home/services";
import HomeDocuments from "@/components/home/documents";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { latestArticlesQuery } from "@/lib/react-query/articles/options";
import { latestServicesQuery } from "@/lib/react-query/services/options";
import { getQueryClient } from "@/components/providers/react-query/client";

export const metadata: Metadata = {
  title: "Accueil | Ministère des Finances",
  description: "Le site officiel du Ministère des Finances de la République Démocratique du Congo",
};

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(latestArticlesQuery);
  await queryClient.prefetchQuery(latestServicesQuery);
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <Hero />
      <Line />
      <HydrationBoundary state={dehydratedState}>
        <HomePosts />
        <HomeServices />
        <HomeDocuments />
      </HydrationBoundary>
    </div>
  );
}

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { texteFondateurQuery } from "@/lib/react-query/ministere/options";
import { getQueryClient } from "@/components/providers/react-query/client";
import Attributions from "@/components/ministere/attributions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Textes Fondateurs",
  description: "Textes Fondateurs",
}

export const revalidate = 3600;

export default async function TextesFondateurs() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(texteFondateurQuery);



  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container section">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-primary">Textes Fondateurs</h1>
          <h2 className="text-xl font-bold mb-2">Ministère des Finances</h2>
          <p className="text-xl text-muted-foreground">
            République Démocratique du Congo
          </p>
        </div>
        <Attributions />
      </div>
    </HydrationBoundary>
  );
}


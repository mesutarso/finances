
import { texteFondateurQuery } from "@/lib/react-query/ministere/options";

import Attributions from "@/components/ministere/attributions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Textes Fondateurs",
  description: "Textes Fondateurs",
}

export const dynamic = "force-dynamic";

export default async function TextesFondateurs() {




  return (

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

  );
}


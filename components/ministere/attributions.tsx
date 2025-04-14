'use client'

import { useQuery } from "@tanstack/react-query";
import { texteFondateurQuery } from "@/lib/react-query/ministere/options";

const Attributions = () => {
    const { data } = useQuery(texteFondateurQuery);
    return <div className="container section prose attributions">
        <div className="prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-base prose-a:text-primary prose-ul:list-disc prose-ol:list-decimal" dangerouslySetInnerHTML={{ __html: data?.contenu }} />
    </div>

};

export default Attributions;

'use client'

import { useQuery } from "@tanstack/react-query";
import { texteFondateurQuery } from "@/lib/react-query/ministere/options";

const Attributions = () => {
    const { data } = useQuery(texteFondateurQuery);
    return <div className="container section custom-content prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: data?.contenu }} />
    </div>

};

export default Attributions;

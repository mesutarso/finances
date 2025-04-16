'use client'
import { useQuery } from "@tanstack/react-query"
import Heading from "@/components/shared/heading"
import PdfCard from "./card"
import { Button } from "@/components/ui/button"
import { Link } from "next-view-transitions"
import { fetchLatestDocuments } from "@/actions/documents"
function HomeDocuments() {
    const { data, isLoading } = useQuery({
        queryKey: ["latest-documents"],
        queryFn: async () => {
            const data = await fetchLatestDocuments()
            return data
        },
    })
    return (
        <section className="bg-white">
            <div className="container section space-y-8">
                <Heading title="Documents récents" color="yellow" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.map((document: any, index: number) => (
                        <PdfCard key={index} {...document} />
                    ))}
                </div>
                <div className="flex justify-center">
                    <Link href="/ressources">
                        <Button className="w-fit bg-yellow text-primary hover:text-white px-8 py-4 ">Voir toutes les ressources</Button>
                    </Link>
                </div>
            </div>
        </section>

    )
}

export default HomeDocuments
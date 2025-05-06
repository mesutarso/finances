'use client'
import { useQuery } from "@tanstack/react-query"
import Heading from "@/components/shared/heading"
import PdfCard from "./card"
import { Button } from "@/components/ui/button"
import { Link } from "next-view-transitions"
import { fetchLatestDocuments } from "@/actions/documents"
import { Skeleton } from "@/components/ui/skeleton"

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
            <div className="container section space-y-16">
                <Heading title="Documents récents" color="yellow" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading ? (

                        Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="space-y-3">
                                <Skeleton className="h-[200px] w-full rounded-lg" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))
                    ) : (
                        data?.map((document: any, index: number) => (
                            <PdfCard key={index} {...document} />
                        ))
                    )}
                </div>
                <div className="flex justify-center">
                    <Link href="/ressources">
                        <Button className="relative w-fit bg-yellow text-primary px-8 py-4 overflow-hidden group border border-neutral-50 hover:shadow-md">
                            <span className="absolute cursor-pointer w-0 h-full bg-white left-0 top-0 transition-all duration-500 ease-in-out group-hover:w-full"></span>
                            <span className="relative cursor-pointer font-semibold z-10 transition-colors duration-500 ease-in-out group-hover:text-primary">
                                Voir toutes les ressources
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HomeDocuments
'use client'
import Heading from "@/components/shared/heading"
import ServiceCard from "./card"
import { Button } from "@/components/ui/button"
import { Link } from "next-view-transitions"
import { useQuery } from "@tanstack/react-query";
import { latestServicesQuery } from "@/lib/react-query/services/options";

function HomeServices() {
    const { data: services } = useQuery(latestServicesQuery);
    return (
        <section className="bg-gray-50">
            <div className="container section space-y-8">
                <Heading title="Nos services" color="red" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services?.map((service: any) => (
                        <ServiceCard key={service.link} {...service} />
                    ))}
                </div>
                <div className="flex justify-center">
                    <Link href="/services">
                        <Button className="relative w-fit bg-red text-white px-8 py-4 overflow-hidden group border-2 border-red hover:border-red">
                            <span className="absolute cursor-pointer w-0 h-full bg-white left-0 top-0 transition-all duration-500 ease-in-out group-hover:w-full"></span>
                            <span className="relative cursor-pointer z-10 transition-colors duration-500 ease-in-out group-hover:text-red">
                                Voir tous les services
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>

    )
}

export default HomeServices
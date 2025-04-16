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
                        <Button className="w-fit bg-red text-white px-8 py-4 ">Voir tous les services</Button>
                    </Link>
                </div>
            </div>
        </section>

    )
}

export default HomeServices
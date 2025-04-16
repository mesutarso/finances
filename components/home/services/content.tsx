'use client'
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { allServicesQuery } from "@/lib/react-query/services/options";
import ServiceCard from "./card";
import { Skeleton } from "@/components/ui/skeleton";

function ServicesContent() {
    const { data: services } = useQuery(allServicesQuery);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        setIsSearching(true);
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setIsSearching(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const filteredServices = services?.filter((service: any) =>
        service.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    const renderSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(12)].map((_, index) => (
                <div key={index} className="space-y-3">
                    <Skeleton className="h-[200px] w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="w-full max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Rechercher un service..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {isSearching ? (
                renderSkeleton()
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredServices?.map((service: any, index: number) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ServicesContent;
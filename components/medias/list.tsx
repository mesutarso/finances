'use client'
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { mediathequesQuery } from "@/lib/react-query/media/options";
import { EventCard } from "./card";

export function MediasList() {
    const { data, isLoading } = useQuery(mediathequesQuery);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>

            </div>
        );
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.map((media: any) => (
                // @ts-ignore
                <EventCard
                    key={media.id}
                    event={media}
                />
            ))}
        </div>
    );
}
"use client"
import { useQuery } from "@tanstack/react-query"
import { mediathequeBySlugQuery } from "@/lib/react-query/media/options"
import { EventDetail } from "./event-detail"
import { Skeleton } from "@/components/ui/skeleton"

export default function EventDetailClient({ slug }: { slug: string }) {
    const { data: event, isLoading, isError } = useQuery(mediathequeBySlugQuery(slug))

    if (isLoading) {
        return (
            <div className="container section">
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    if (isError || !event) {
        return (
            <div className="container section">
                <div className="text-center text-muted-foreground">
                    Événement introuvable
                </div>
            </div>
        )
    }

    return <EventDetail event={event} />
}


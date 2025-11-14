"use client"

import { useQuery } from "@tanstack/react-query"
import { articleBySlugQuery } from "@/lib/react-query/articles/options"
import PostDetails from "./details"
import { Skeleton } from "@/components/ui/skeleton"

export default function PostDetailsClient({ slug }: { slug: string }) {
    const { data, isLoading, isError } = useQuery(articleBySlugQuery(slug))

    if (isLoading) {
        return (
            <div className="container section">
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="container section">
                <div className="text-center text-muted-foreground">
                    Article introuvable
                </div>
            </div>
        )
    }

    return <PostDetails slug={slug} />
}


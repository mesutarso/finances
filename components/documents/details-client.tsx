"use client"

import { useQuery } from "@tanstack/react-query"
import { documentByIdQuery } from "@/lib/react-query/documents/options"
import DocumentDetails from "./details"
import { Skeleton } from "@/components/ui/skeleton"

export default function DocumentDetailsClient({ id }: { id: string }) {
    const { data: document, isLoading, isError } = useQuery(documentByIdQuery(id))

    if (isLoading) {
        return (
            <div className="container section">
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    if (isError || !document) {
        return (
            <div className="container section">
                <div className="text-center text-muted-foreground">
                    Document introuvable
                </div>
            </div>
        )
    }

    return <DocumentDetails document={document} />
}


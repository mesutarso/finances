"use client"
import type React from "react"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchCommuniques } from "@/actions/communiques"
import { DocumentsTable } from "@/components/documents/table"
import { DataTablePagination } from "@/components/documents/table-pagination"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export function CommuniquesDataTable() {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [search, setSearch] = useState("")

    const { data, isLoading, isError } = useQuery({
        queryKey: ["communiques", page, pageSize, search],
        queryFn: () => fetchCommuniques({ page, pageSize, search }),
    })

    const documents = data?.data || []
    const totalCount = data?.meta?.pagination?.total || 0

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setPage(1)
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full sm:w-80 text-md">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Rechercher par titre..." value={search} onChange={handleSearchChange} className="pl-8" />
                </div>
            </div>

            <div className="rounded-md border">
                <DocumentsTable data={documents} isLoading={isLoading} isError={isError} />
            </div>

            <DataTablePagination
                currentPage={page}
                pageSize={pageSize}
                totalCount={totalCount}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
            />
        </div>
    )
}


"use client"

import type React from "react"

import { useState, useLayoutEffect, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchDocuments } from "@/actions/documents"
import { DocumentsTable } from "./table"
import { DataTablePagination } from "./table-pagination"
import { DocumentFilterForm } from "./filter-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon, FilterIcon } from "lucide-react"
import type { DocumentFilters } from "@/types/documents"

export function DocumentsDataTable({ categorie }: { categorie: string }) {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [search, setSearch] = useState("")
    const [filters, setFilters] = useState<DocumentFilters>({
        type: categorie ? categorie : categorie === "Autres publications" ? null : null,
        category: null,
        dateFrom: null,
        dateTo: null,
    })
    const [showFilters, setShowFilters] = useState(false)

    // Mettre à jour les filtres lorsque la catégorie change
    useEffect(() => {
        setFilters(prevFilters => ({
            ...prevFilters,
            type: categorie ? categorie : categorie === "Autres publications" ? null : null
        }));
        setPage(1); // Réinitialiser à la première page
    }, [categorie]);

    // Query Strapi for documents with pagination and filters
    const { data, isLoading, isError } = useQuery({
        queryKey: ["documents", page, pageSize, search, filters],
        queryFn: () => fetchDocuments({ page, pageSize, search, filters }),

    })

    const documents = data?.data || []
    const totalCount = data?.meta?.pagination?.total || 0

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setPage(1) // Reset to first page when search changes
    }

    const handleFiltersChange = (newFilters: DocumentFilters) => {
        setFilters(newFilters)
        setPage(1)
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full sm:w-80 text-md">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Rechercher par titre..." value={search} onChange={handleSearchChange} className="pl-8" />
                </div>
                <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full sm:w-auto flex items-center gap-2 capitalize"
                >
                    <FilterIcon className="h-4 w-4" />
                    Filtres
                </Button>
            </div>

            {showFilters && <DocumentFilterForm filters={filters} onFiltersChange={handleFiltersChange} />}

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

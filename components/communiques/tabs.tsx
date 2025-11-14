"use client"

import { useState, useLayoutEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchCommuniquesArticles, fetchCommuniquesDocuments } from "@/actions/communiques"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import PostCard from "@/components/home/posts/card"
import { DocumentsTable } from "@/components/documents/table"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
    PaginationLink,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronFirst, ChevronLast } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

function ArticlesTab() {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [search, setSearch] = useState("")
    const [pageCount, setPageCount] = useState(0)
    const [totalItems, setTotalItems] = useState(0)

    const { data, isLoading } = useQuery({
        queryKey: ["communiques-articles", page, pageSize, search],
        queryFn: () => fetchCommuniquesArticles({ page, pageSize, search }),
    })

    useLayoutEffect(() => {
        if (data) {
            setTotalItems(data?.meta?.pagination?.total || 0)
            setPageCount(data?.meta?.pagination?.pageCount || 0)
        }
    }, [data])

    const handlePageSizeChange = (value: string) => {
        const newPageSize = Number.parseInt(value)
        setPageSize(newPageSize)
        setPage(1)
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setPage(1)
    }

    const getPaginationItems = () => {
        const items = []
        const maxVisible = 5
        let startPage = Math.max(1, page - Math.floor(maxVisible / 2))
        let endPage = Math.min(pageCount, startPage + maxVisible - 1)

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => setPage(i)}
                        isActive={i === page}
                        className="cursor-pointer"
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        return items
    }

    const startItem = page === 1 ? 1 : (page - 1) * pageSize + 1
    const endItem = Math.min(page * pageSize, totalItems)

    return (
        <div className="space-y-8">
            {/* Barre de recherche */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full sm:w-80 text-md">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Rechercher par titre..."
                        value={search}
                        onChange={handleSearchChange}
                        className="pl-8"
                    />
                </div>
            </div>

            {/* Grille des communiqués */}
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(pageSize)].map((_, index) => (
                        <div key={index} className="flex flex-col gap-2 p-4 border rounded-lg">
                            <Skeleton className="h-64 w-full" />
                            <Skeleton className="h-6 w-3/4" />
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-4 w-1/6" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && data?.data && data.data.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.data.map((communique: any) => (
                        <PostCard
                            key={communique.id}
                            title={communique.titre}
                            date={communique.date_publication}
                            link={`/articles/${communique.slug}`}
                            image={communique.image || "/placeholder.svg"}
                            categorie={communique.categorie || "Communiqués"}
                        />
                    ))}
                </div>
            )}

            {!isLoading && data?.data?.length === 0 && (
                <div className="flex flex-col gap-4 mt-8">
                    <p className="text-center text-muted-foreground">Aucun communiqué trouvé</p>
                </div>
            )}

            {/* Pagination */}
            {!isLoading && data?.data && data.data.length > 0 && (
                <div className="flex flex-col gap-4 mt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                Affichage {startItem}-{endItem} sur {totalItems} communiqués
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm whitespace-nowrap">Communiqués par page:</span>
                                <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                                    <SelectTrigger className="w-[80px] text-black">
                                        <SelectValue placeholder={pageSize.toString()} className="text-sm text-black" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="6">6</SelectItem>
                                        <SelectItem value="9">9</SelectItem>
                                        <SelectItem value="12">12</SelectItem>
                                        <SelectItem value="18">18</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <Pagination className="mx-auto">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => setPage(1)}
                                    isActive={false}
                                    aria-label="Aller à la première page"
                                    aria-disabled={page === 1}
                                    className={page === 1 ? "opacity-50 cursor-not-allowed" : "text-sm cursor-pointer"}
                                >
                                    <ChevronFirst className="h-4 w-4" />
                                </PaginationLink>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    aria-disabled={page === 1}
                                    className={page === 1 ? "opacity-50 cursor-not-allowed" : "text-sm cursor-pointer"}
                                />
                            </PaginationItem>

                            {getPaginationItems()}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))}
                                    aria-disabled={page === pageCount}
                                    className={page === pageCount ? "opacity-50 cursor-not-allowed" : "text-sm cursor-pointer"}
                                />
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => setPage(pageCount)}
                                    isActive={false}
                                    aria-label="Aller à la dernière page"
                                    aria-disabled={page === pageCount}
                                    className={page === pageCount ? "opacity-50 cursor-not-allowed" : "text-sm cursor-pointer"}
                                >
                                    <ChevronLast className="h-4 w-4" />
                                </PaginationLink>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}

function DocumentsTab() {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [search, setSearch] = useState("")
    const [pageCount, setPageCount] = useState(0)
    const [totalItems, setTotalItems] = useState(0)

    const { data, isLoading, isError } = useQuery({
        queryKey: ["communiques-documents", page, pageSize, search],
        queryFn: () => fetchCommuniquesDocuments({ page, pageSize, search }),
    })

    useLayoutEffect(() => {
        if (data) {
            setTotalItems(data?.meta?.pagination?.total || 0)
            setPageCount(data?.meta?.pagination?.pageCount || 0)
        }
    }, [data])

    const handlePageSizeChange = (value: string) => {
        const newPageSize = Number.parseInt(value)
        setPageSize(newPageSize)
        setPage(1)
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setPage(1)
    }

    const getPaginationItems = () => {
        const items = []
        const maxVisible = 5
        let startPage = Math.max(1, page - Math.floor(maxVisible / 2))
        let endPage = Math.min(pageCount, startPage + maxVisible - 1)

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => setPage(i)}
                        isActive={i === page}
                        className="cursor-pointer"
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        return items
    }

    const startItem = page === 1 ? 1 : (page - 1) * pageSize + 1
    const endItem = Math.min(page * pageSize, totalItems)

    // Les données sont déjà au bon format pour DocumentsTable
    const documents = data?.data || []

    return (
        <div className="space-y-8">
            {/* Barre de recherche */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full sm:w-80 text-md">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Rechercher par titre..."
                        value={search}
                        onChange={handleSearchChange}
                        className="pl-8"
                    />
                </div>
            </div>

            {/* Tableau des documents */}
            <div className="rounded-md border">
                <DocumentsTable data={documents} isLoading={isLoading} isError={isError} />
            </div>

            {/* Pagination */}
            {!isLoading && data?.data && data.data.length > 0 && (
                <div className="flex flex-col gap-4 mt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                Affichage {startItem}-{endItem} sur {totalItems} documents
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm whitespace-nowrap">Documents par page:</span>
                                <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                                    <SelectTrigger className="w-[80px] text-black">
                                        <SelectValue placeholder={pageSize.toString()} className="text-sm text-black" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <Pagination className="mx-auto">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => setPage(1)}
                                    isActive={false}
                                    aria-label="Aller à la première page"
                                    aria-disabled={page === 1}
                                    className={page === 1 ? "opacity-50 cursor-not-allowed" : "text-sm cursor-pointer"}
                                >
                                    <ChevronFirst className="h-4 w-4" />
                                </PaginationLink>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    aria-disabled={page === 1}
                                    className={page === 1 ? "opacity-50 cursor-not-allowed" : "text-sm cursor-pointer"}
                                />
                            </PaginationItem>

                            {getPaginationItems()}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))}
                                    aria-disabled={page === pageCount}
                                    className={page === pageCount ? "opacity-50 cursor-not-allowed" : "text-sm cursor-pointer"}
                                />
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => setPage(pageCount)}
                                    isActive={false}
                                    aria-label="Aller à la dernière page"
                                    aria-disabled={page === pageCount}
                                    className={page === pageCount ? "opacity-50 cursor-not-allowed" : "text-sm cursor-pointer"}
                                >
                                    <ChevronLast className="h-4 w-4" />
                                </PaginationLink>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}

export function CommuniquesTabs() {
    return (
        <Tabs defaultValue="articles" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 mb-8 h-auto p-1 bg-muted gap-1">
                <TabsTrigger 
                    value="articles"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white text-sm sm:text-base md:text-lg py-3 sm:py-4 px-4 sm:px-6 font-semibold whitespace-normal sm:whitespace-nowrap text-center"
                >
                    Communiqués au format Articles
                </TabsTrigger>
                <TabsTrigger 
                    value="documents"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white text-sm sm:text-base md:text-lg py-3 sm:py-4 px-4 sm:px-6 font-semibold whitespace-normal sm:whitespace-nowrap text-center"
                >
                    Au format Documents
                </TabsTrigger>
            </TabsList>
            <TabsContent value="articles">
                <ArticlesTab />
            </TabsContent>
            <TabsContent value="documents">
                <DocumentsTab />
            </TabsContent>
        </Tabs>
    )
}


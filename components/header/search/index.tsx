"use client"

import type React from "react"

import { useCallback, useEffect, useState, memo, useMemo } from "react"
import { Book, File, Loader2, Search, X } from "lucide-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { searchApi } from "@/lib/api"
import { Link } from "next-view-transitions"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

type SearchResult = {
    id: string
    title: string
    link: string
    date?: string
}

type SearchResults = {
    formattedArticles?: SearchResult[]
    formattedDocuments?: SearchResult[]
    formattedServices?: SearchResult[]
}

const ResultItem = memo(
    ({
        result,
        type,
        onSelect,
    }: {
        result: SearchResult
        type: "article" | "document" | "service"
        onSelect: () => void
    }) => {
        const Icon = type === "article" ? Book : File
        const href =
            type === "article" ? `/articles/${result.link}` : type === "document" ? `/ressources/${result.link}` : result.link

        return (
            <li className="group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted transition-colors duration-150">
                <Link href={href} className="flex w-full items-center" onClick={onSelect}>
                    <Icon className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-150" />
                    <span className="flex-1 text-sm group-hover:text-primary transition-colors duration-150">{result.title}</span>
                    {result.date && <span className="ml-auto text-xs text-muted-foreground">{result.date}</span>}
                </Link>
            </li>
        )
    },
    (prevProps, nextProps) => prevProps.result.id === nextProps.result.id
)
ResultItem.displayName = "ResultItem"

const ResultGroup = memo(
    ({
        title,
        results,
        type,
        onSelect,
    }: {
        title: string
        results: SearchResult[]
        type: "article" | "document" | "service"
        onSelect: () => void
    }) => {
        if (!results || results.length === 0) return null

        return (
            <div className="py-2">
                <h3 className="mb-2 px-3 text-sm font-medium text-muted-foreground">{title}</h3>
                <ul>
                    {results.map((result) => (
                        <ResultItem key={`${type}-${result.id}`} result={result} type={type} onSelect={onSelect} />
                    ))}
                </ul>
            </div>
        )
    },
    (prevProps, nextProps) => {
        if (prevProps.results.length !== nextProps.results.length) return false
        return prevProps.results.every((prevResult, index) => prevResult.id === nextProps.results[index].id)
    }
)
ResultGroup.displayName = "ResultGroup"

const LoadingState = memo(() => (
    <div className="flex flex-col space-y-6 pt-2 pb-4">
        <div className="space-y-3">
            <Skeleton className="h-4 w-24 bg-muted-foreground/20" />
            <div className="space-y-2">
                {Array(3).fill(0).map((_, i) => (
                    <div key={`skeleton-article-${i}`} className="flex items-center space-x-2 px-3 py-2">
                        <Skeleton className="h-4 w-4 rounded-full bg-muted-foreground/20" />
                        <Skeleton className="h-4 w-4/5 bg-muted-foreground/20" />
                        <Skeleton className="h-3 w-1/6 ml-auto bg-muted-foreground/20" />
                    </div>
                ))}
            </div>
        </div>

        <div className="space-y-3">
            <Skeleton className="h-4 w-24 bg-muted-foreground/20" />
            <div className="space-y-2">
                {Array(2).fill(0).map((_, i) => (
                    <div key={`skeleton-document-${i}`} className="flex items-center space-x-2 px-3 py-2">
                        <Skeleton className="h-4 w-4 rounded-full bg-muted-foreground/20" />
                        <Skeleton className="h-4 w-3/4 bg-muted-foreground/20" />
                        <Skeleton className="h-3 w-1/6 ml-auto bg-muted-foreground/20" />
                    </div>
                ))}
            </div>
        </div>

        <div className="space-y-3">
            <Skeleton className="h-4 w-24 bg-muted-foreground/20" />
            <div className="space-y-2">
                {Array(2).fill(0).map((_, i) => (
                    <div key={`skeleton-service-${i}`} className="flex items-center px-3 py-2">
                        <Skeleton className="h-4 w-5/6 bg-muted-foreground/20" />
                    </div>
                ))}
            </div>
        </div>
    </div>
), () => true)
LoadingState.displayName = "LoadingState"

const EmptyState = memo(({ query }: { query: string }) => (
    <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-lg text-muted-foreground">
            {!query || query.length < 2 ? "Tapez pour rechercher..." : `Aucun résultat trouvé pour "${query}"`}
        </p>
    </div>
), (prevProps, nextProps) => prevProps.query === nextProps.query)
EmptyState.displayName = "EmptyState"

export function SearchDialog() {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [debouncedSearch] = useDebounce(search, 300)
    const queryClient = useQueryClient()

    const toggleDialog = useCallback(() => {
        setOpen((prev) => !prev)
    }, [])

    const closeDialog = useCallback(() => {
        setOpen(false)
    }, [])

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }, [])

    const clearSearch = useCallback(() => {
        setSearch("")
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                toggleDialog()
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [toggleDialog])

    useEffect(() => {
        const popularTerms = ["guide", "tutoriel", "documentation", "finance"]
        if (typeof window !== 'undefined') {
            if ('requestIdleCallback' in window) {
                window.requestIdleCallback(() => {
                    popularTerms.forEach((term) => {
                        queryClient.prefetchQuery({
                            queryKey: ["search", term],
                            queryFn: () => searchApi(term),
                            staleTime: 1000 * 60 * 30,
                        })
                    })
                })
            } else {
                setTimeout(() => {
                    popularTerms.forEach((term) => {
                        queryClient.prefetchQuery({
                            queryKey: ["search", term],
                            queryFn: () => searchApi(term),
                            staleTime: 1000 * 60 * 30,
                        })
                    })
                }, 1000)
            }
        }
    }, [queryClient])

    useEffect(() => {
        if (!open) {
            const timer = setTimeout(() => {
                setSearch("")
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [open])

    const {
        data: results,
        isLoading,
        error,
    } = useQuery<SearchResults>({
        queryKey: ["search", debouncedSearch],
        queryFn: async () => {
            if (!debouncedSearch || debouncedSearch.length < 2)
                return {
                    formattedArticles: [],
                    formattedDocuments: [],
                    formattedServices: [],
                }
            return await searchApi(debouncedSearch)
        },
        enabled: open && debouncedSearch.length >= 2,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        placeholderData: (previousData) => previousData,
    })

    const hasResults = useMemo(() => {
        if (!results) return false;

        return (
            (results.formattedArticles && results.formattedArticles.length > 0) ||
            (results.formattedDocuments && results.formattedDocuments.length > 0) ||
            (results.formattedServices && results.formattedServices.length > 0)
        );
    }, [results])

    const renderContent = useCallback(() => {
        if (isLoading) return <LoadingState />

        if (error)
            return (
                <div className="py-8 text-center">
                    <p className="text-sm text-destructive">Une erreur est survenue. Veuillez réessayer.</p>
                </div>
            )

        if (!hasResults) return <EmptyState query={debouncedSearch} />

        return (
            <ScrollArea className="max-h-[60vh]">
                <div className="space-y-2 px-1">
                    <ResultGroup
                        title="Articles"
                        results={results?.formattedArticles || []}
                        type="article"
                        onSelect={closeDialog}
                    />
                    <ResultGroup
                        title="Documents"
                        results={results?.formattedDocuments || []}
                        type="document"
                        onSelect={closeDialog}
                    />
                    <ResultGroup
                        title="Services"
                        results={results?.formattedServices || []}
                        type="service"
                        onSelect={closeDialog}
                    />
                </div>
            </ScrollArea>
        )
    }, [isLoading, error, hasResults, debouncedSearch, results, closeDialog])

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <span className="text-primary">
                        <Search className="w-6 h-6" />
                    </span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] p-0 border-primary/20 shadow-lg overflow-auto">
                    <DialogHeader className="px-4 pt-5 pb-0">
                        <DialogTitle className="sr-only">Recherche</DialogTitle>
                        <div className="flex items-center border-b pb-4">
                            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                            <Input
                                placeholder="Rechercher dans les articles, documents, services..."
                                value={search}
                                onChange={handleSearchChange}
                                className="flex-1 border-0 bg-transparent text-lg p-0 shadow-none focus-visible:ring-0 placeholder:text-lg"
                                autoFocus
                            />

                        </div>
                    </DialogHeader>
                    <div className="px-4 py-2">{renderContent()}</div>
                </DialogContent>
            </Dialog>
        </>
    )
}

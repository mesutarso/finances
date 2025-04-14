//@ts-nocheck
"use client"
import { useEffect, useState, useMemo } from "react"
import { Book, File, Loader2, Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { getInitialData } from "@/actions/search"
import { Button } from "@/components/ui/button"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { searchApi } from "@/lib/api"
import { Link } from "next-view-transitions"

export function SearchDialog() {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [debouncedSearch] = useDebounce(search, 500)

    const { data: initialData } = useQuery({
        queryKey: ["initialData"],
        queryFn: async () => await getInitialData(),
        staleTime: 1000 * 60 * 60, // 1 heure
        cacheTime: 1000 * 60 * 60 * 24, // 24 heures
    })

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const filteredResults = useMemo(() => {
        if (!initialData) return { articles: [], documents: [], services: [] }

        const searchLower = search.toLowerCase()
        return {
            articles: initialData.articles?.filter((article) =>
                article.title.toLowerCase().includes(searchLower)
            ) || [],
            documents: initialData.documents?.filter((document) =>
                document.title.toLowerCase().includes(searchLower)
            ) || [],
            services: initialData.services?.filter((service) =>
                service.title.toLowerCase().includes(searchLower)
            ) || []
        }
    }, [initialData, search])

    const shouldFetchApi = useMemo(() =>
        debouncedSearch.length >= 2 &&
        (filteredResults.articles.length === 0 ||
            filteredResults.documents.length === 0 ||
            filteredResults.services.length === 0),
        [debouncedSearch, filteredResults]
    )

    const { data: apiResults, isLoading } = useQuery({
        queryKey: ["search", debouncedSearch],
        queryFn: async () => await searchApi(debouncedSearch),
        enabled: shouldFetchApi,
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 30, // 30 minutes
    })

    const renderLoadingState = () => (
        <div className="flex items-center justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-sm text-primary">Recherche en cours...</span>
        </div>
    )

    const renderResults = () => (
        <>

            {filteredResults.articles.length > 0 && (
                <CommandGroup heading="Articles récents">
                    {filteredResults?.articles?.map((article: any) => (
                        <CommandItem
                            key={`recent-article-${article.id}`}
                            onSelect={() => setOpen(false)}
                        >
                            <Link href={`/articles/${article.link}`} className="grid grid-cols-[5%_70%_25%] w-full">
                                <Book className="mr-2 h-4 w-4" />
                                <span className="text-left hover:text-primary">{article.title}</span>
                                <span className="ml-auto text-xs text-muted-foreground">{article.date}</span>
                            </Link>
                        </CommandItem>
                    ))}
                </CommandGroup>
            )}

            {filteredResults.documents.length > 0 && (
                <CommandGroup heading="Documents récents">
                    {filteredResults?.documents?.map((document: any) => (
                        <CommandItem
                            key={`recent-document-${document.id}`}
                            onSelect={() => setOpen(false)}
                        >
                            <Link href={`/ressources/${document.link}`} className="flex items-center w-full">
                                <File className="mr-2 h-4 w-4" />
                                <span>{document.title}</span>
                                <span className="ml-auto text-xs text-muted-foreground">{document.date}</span>
                            </Link>
                        </CommandItem>
                    ))}
                </CommandGroup>
            )}

            {filteredResults.services.length > 0 && (
                <CommandGroup heading="Services récents">
                    {filteredResults?.services?.map((service: any) => (
                        <CommandItem
                            key={`recent-service-${service.id}`}
                            onSelect={() => setOpen(false)}
                        >
                            <Link href={service.link} className="flex items-center w-full">
                                <span>{service.title}</span>
                            </Link>
                        </CommandItem>
                    ))}
                </CommandGroup>
            )}

            {shouldFetchApi && (
                <>

                    <CommandGroup heading="Résultats de recherche (articles)">
                        {apiResults?.formattedArticles?.map((article: any) => (
                            <CommandItem
                                key={article.id}
                                onSelect={() => setOpen(false)}
                            >
                                <Book className="mr-2 h-4 w-4" />
                                <span>{article.title}</span>
                                <span className="ml-auto text-xs text-muted-foreground">{article.date}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>



                    <CommandGroup heading="Résultats de recherche (documents)">
                        {apiResults?.formattedDocuments?.map((document: any) => (
                            <CommandItem
                                key={document.id}
                                onSelect={() => setOpen(false)}
                            >
                                <File className="mr-2 h-4 w-4" />
                                <span>{document.title}</span>
                                <span className="ml-auto text-xs text-muted-foreground">{document.date}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>



                    <CommandGroup heading="Résultats de recherche (services)">
                        {apiResults?.formattedServices?.map((service: any) => (
                            <CommandItem
                                key={service.id}
                                onSelect={() => setOpen(false)}
                            >
                                <File className="mr-2 h-4 w-4" />
                                <span>{service.title}</span>
                                <span className="ml-auto text-xs text-muted-foreground">{service.date}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>


                </>
            )}
        </>
    )

    return (
        <>
            <Button
                className="relative bg-transparent border-none hover:bg-transparent hover:text-primary text-primary p-0"
                onClick={() => setOpen(true)}
            >
                <Search className="text-3xl" />
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder="Rechercher dans les articles, documents, services..."
                    value={search}
                    onValueChange={setSearch}
                />
                <CommandList>
                    <CommandEmpty>
                        {isLoading && renderLoadingState()}
                    </CommandEmpty>
                    {renderResults()}
                </CommandList>
            </CommandDialog>
        </>
    )
}


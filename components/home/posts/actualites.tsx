"use client"
import { useLayoutEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllArticlesQuery } from "@/lib/react-query/articles/options"
import { categoriesQuery } from "@/lib/react-query/categories/options"
import LineCard from "./line-card"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, ChevronFirst, ChevronLast } from "lucide-react"
import Line from "@/components/shared/line"
import { Badge } from "@/components/ui/badge"

function Posts() {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [thematique, setThematique] = useState('')
    const [pageCount, setPageCount] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [title, setTitle] = useState("Toute l'actualité du ministère")


    const { data, isLoading } = useQuery(getAllArticlesQuery(page, pageSize, thematique))
    const { data: categories, isLoading: isCategoriesLoading } = useQuery(categoriesQuery)
    useLayoutEffect(() => {
        if (data) {
            setTotalItems(data?.meta?.pagination?.total as number)
            setPageCount(data?.meta?.pagination?.pageCount as number)
        }
    }, [data])

    const handlePageSizeChange = (value: string,) => {
        const newPageSize = Number.parseInt(value)
        setPageSize(newPageSize)
        setPage(1)
    }



    const getPaginationItems = () => {
        const items = []
        const showEllipsisStart = page > 3
        const showEllipsisEnd = page < pageCount - 2


        items.push(
            <PaginationItem key="page-1">
                <PaginationLink onClick={() => setPage(1)} isActive={page === 1}>
                    1
                </PaginationLink>
            </PaginationItem>,
        )


        if (showEllipsisStart) {
            items.push(
                <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis />
                </PaginationItem>,
            )
        }

        for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i++) {
            if (i === 1 || i === pageCount) continue
            items.push(
                <PaginationItem key={`page-${i}`}>
                    <PaginationLink onClick={() => setPage(i)} isActive={page === i}>
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            )
        }

        if (showEllipsisEnd) {
            items.push(
                <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis />
                </PaginationItem>,
            )
        }

        if (pageCount > 1) {
            items.push(
                <PaginationItem key={`page-${pageCount}`}>
                    <PaginationLink onClick={() => setPage(pageCount)} isActive={page === pageCount}>
                        {pageCount}
                    </PaginationLink>
                </PaginationItem>,
            )
        }

        return items
    }

    const handleThematiqueChange = (value: string, title: string) => {
        setThematique(value)
        setTitle(title)
        setPage(1)
    }


    const startItem = (page - 1) * pageSize + 1
    const endItem = Math.min(page * pageSize, totalItems)

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4 relative">
            <div className="">
                <div className="max-w-2xl relative inline-block space-y-2 mb-8">
                    <h1 className="md:text-3xl text-2xl font-bold">{title}</h1>
                    <Line />
                </div>
                {isLoading && (<div className="grid grid-cols-1 gap-4 max-w-2xl">
                    {[...Array(pageSize)].map((_, index) => (
                        <div key={index} className="flex flex-col gap-2 p-4 border rounded-lg">
                            <Skeleton className="h-6 w-3/4" />
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-4 w-1/6" />
                            </div>
                        </div>
                    ))}
                </div>)}

                {data?.data?.map((article: any, index: number) => (
                    <div key={index}>
                        <LineCard title={article.title} date={article.date} link={article.link} categorie={article.categorie} />
                    </div>
                ))}
                {
                    data?.data?.length === 0 && (
                        <div className="flex flex-col gap-4 mt-8 max-w-2xl ">
                            <p className="text-center text-muted-foreground">Aucun article trouvé</p>
                        </div>
                    )
                }

                <div className="flex flex-col gap-4 mt-8 max-w-2xl ">

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                Affichage {startItem}-{endItem} sur {totalItems} articles
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm whitespace-nowrap">Articles par page:</span>
                                <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                                    <SelectTrigger className="w-[80px]">
                                        <SelectValue placeholder={pageSize.toString()} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5</SelectItem>
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
                                    className={page === 1 ? "opacity-50 cursor-not-allowed" : ""}
                                >
                                    <ChevronFirst className="h-4 w-4" />
                                </PaginationLink>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    aria-disabled={page === 1}
                                    className={page === 1 ? "opacity-50 cursor-not-allowed" : ""}
                                />
                            </PaginationItem>

                            {getPaginationItems()}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))}
                                    aria-disabled={page === pageCount}
                                    className={page === pageCount ? "opacity-50 cursor-not-allowed" : ""}
                                />
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => setPage(pageCount)}
                                    isActive={false}
                                    aria-label="Aller à la dernière page"
                                    aria-disabled={page === pageCount}
                                    className={page === pageCount ? "opacity-50 cursor-not-allowed" : ""}
                                >
                                    <ChevronLast className="h-4 w-4" />
                                </PaginationLink>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
            <div>
                <div className="border-l-4 pl-4">
                    <h2 className="text-2xl font-bold mb-8">Thématiques</h2>
                    <div className="flex flex-col gap-4">
                        {isCategoriesLoading && (<div className="grid grid-cols-1 gap-4 max-w-2xl">
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="flex flex-col gap-2 p-4 border rounded-lg">
                                    <Skeleton className="h-6 w-3/4" />
                                </div>
                            ))}
                        </div>)}
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleThematiqueChange('', "Toute l'actualité du ministère")}>
                            <p>
                                Toutes les thématiques
                            </p>
                            <Badge>
                                <ArrowRight className="w-2 h-2" />
                            </Badge>
                        </div>
                        {/* @ts-ignore */}
                        {categories?.map((category: any, index: number) => (
                            <div key={index} className="flex items-center gap-2 cursor-pointer" onClick={() => handleThematiqueChange(category.documentId, `Categorie : ${category.nom}`)}>
                                <p>{category.nom}</p>
                                <Badge>{category.totalArticles}</Badge>
                            </div>
                        ))}
                    </div>

                </div>

            </div>


        </div>

    )
}

export default Posts


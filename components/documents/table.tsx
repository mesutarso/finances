"use client"

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { FileIcon, ExternalLinkIcon, DownloadIcon } from "lucide-react"
import type { Document } from "@/types/documents"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

export function DocumentsTable({
    data,
    isLoading,
    isError,
}: {
    data: Document[]
    isLoading: boolean
    isError: boolean
}) {
    const columns: ColumnDef<Document>[] = [
        {
            accessorKey: "titre",
            header: "Titre",
            cell: ({ row }) => <div className="font-medium text-lg text-balance line-clamp-4">{row.getValue("titre")}</div>,
        },

        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                const type = row.getValue("type") as { titre: string }
                return type?.titre || "-"
            },
        },
        {
            accessorKey: "categories",
            header: "Catégories",
            cell: ({ row }) => {
                const categories = row.getValue("categories") as { nom: string }[]


                return (
                    <div className="flex flex-wrap gap-1">
                        {categories.map((cat, index) => (
                            <Badge key={index} variant="outline" className="text-md">
                                {cat?.nom || "-"}
                            </Badge>
                        ))}
                    </div>
                )
            },
        },
        {
            accessorKey: "date_publication",
            header: "Date de publication",
            cell: ({ row }) => {
                const date = row.getValue("date_publication") as string
                return formatDate(date)
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const document = row.original
                return (
                    <div className="flex items-center gap-2">
                        {document.fichier?.url && (
                            <a
                                href={`${document.fichier.url || document?.url}?download=true`}
                                target="_blank"
                                download
                                className="inline-flex bg-primary text-white items-center justify-center h-8 w-8 rounded-md border  "
                            >
                                <DownloadIcon className="h-4 w-4" />
                                <span className="sr-only">Télécharger</span>
                            </a>
                        )}
                        {document && (
                            <Link
                                href={`/ressources/${document?.id}`}
                                className="inline-flex items-center justify-center h-8 w-8 rounded-md border text-muted-foreground hover:bg-muted"
                            >
                                <ExternalLinkIcon className="h-4 w-4" />
                                <span className="sr-only">Voir le lien</span>
                            </Link>
                        )}
                    </div>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    if (isError) {
        return (
            <div className="flex justify-center items-center h-40 text-muted-foreground">
                Une erreur est survenue lors du chargement des documents.
            </div>
        )
    }

    if (isLoading) {
        return <TableSkeleton />
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader className="bg-primary text-white hover:bg-primary">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="hover:bg-primary">
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="text-white text-md">
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="text-md">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Aucun document trouvé.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

function TableSkeleton() {
    return (
        <div className="w-full rounded-md border">
            <div className="border-b px-4 py-3">
                <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="w-1/5 px-2">
                            <Skeleton className="h-5 w-full" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="px-4">
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex items-center py-3 border-b last:border-0">
                        {Array.from({ length: 5 }).map((_, colIndex) => (
                            <div key={colIndex} className="w-1/5 px-2">
                                <Skeleton className="h-4 w-full" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

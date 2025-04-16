//@ts-nocheck
"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { CalendarIcon, RefreshCwIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchDocumentTypes, fetchDocumentCategories } from "@/actions/documents"
import type { DocumentFilters } from "@/types/documents"
import { cn } from "@/lib/utils"

interface DocumentFilterFormProps {
    filters: DocumentFilters
    onFiltersChange: (filters: DocumentFilters) => void
}

export function DocumentFilterForm({ filters, onFiltersChange }: DocumentFilterFormProps) {
    const [localFilters, setLocalFilters] = useState<DocumentFilters>(filters)

    const { data: types } = useQuery({
        queryKey: ["documentTypes"],
        queryFn: fetchDocumentTypes,
    })



    const handleTypeChange = (value: string | null) => {
        setLocalFilters((prev) => ({
            ...prev,
            type: value,

        }))
    }


    const handleDateFromChange = (date: Date | null) => {
        setLocalFilters((prev) => ({
            ...prev,
            dateFrom: date,
        }))
    }

    const handleDateToChange = (date: Date | null) => {
        setLocalFilters((prev) => ({
            ...prev,
            dateTo: date,
        }))
    }

    const applyFilters = () => {
        onFiltersChange(localFilters)
    }

    const resetFilters = () => {
        const resetFilters = {
            type: null,
            dateFrom: null,
            dateTo: null,
        }
        setLocalFilters(resetFilters)
        onFiltersChange(resetFilters)
    }

    return (
        <div className="rounded-md border p-4 bg-primary text-white space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                <div className="space-y-2">
                    <label className="text-md font-medium">Type de document</label>
                    <Select value={localFilters.type || ""} onValueChange={(value) => handleTypeChange(value || null)}>
                        <SelectTrigger className="w-full bg-white  text-black  ">
                            <SelectValue className="text-black text-md uppercase font-medium px-8 py-2  " placeholder="Tous les types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            {types?.map((type: { id: string; nom: string }) => (
                                <SelectItem key={type.id} value={type.nom}>
                                    {type.nom}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>



                <div className="space-y-2">
                    <label className="text-md font-medium">Date de début</label>
                    <Popover>
                        <PopoverTrigger asChild className="w-full text-black ">
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal text-black    text-md px-8 py-2",
                                    !localFilters.dateFrom && "text-black",
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {localFilters.dateFrom ? (
                                    format(localFilters.dateFrom, "PPP", { locale: fr })
                                ) : (
                                    <span>Sélectionner une date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={localFilters.dateFrom || undefined}
                                onSelect={handleDateFromChange}
                                initialFocus

                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="space-y-2">
                    <label className="text-md font-medium">Date de fin</label>
                    <Popover>
                        <PopoverTrigger asChild className="w-full text-black ">
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal text-black    text-md px-8 py-2",
                                    !localFilters.dateTo && "text-black",
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {localFilters.dateTo ? (
                                    format(localFilters.dateTo, "PPP", { locale: fr })
                                ) : (
                                    <span>Sélectionner une date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={localFilters.dateTo || undefined}
                                onSelect={handleDateToChange}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className='space-y-2'>
                    <label className="text-md font-medium ">Recherche</label>
                    <div className="flex items-center space-x-2 ">
                        <Button size="lg" className="bg-white text-black" size={'icon'} onClick={resetFilters}>
                            <RefreshCwIcon className="h-4 w-4" />

                        </Button>
                        <Button size="lg" className="bg-red text-white hover:bg-red-600 " onClick={applyFilters}>Appliquer les filtres</Button>
                    </div>
                </div>

            </div>


        </div>
    )
}

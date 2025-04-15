"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface PhotoGalleryProps {
    photos: string[]
    viewMode: "grid" // Removed list option
}

export function PhotoGallery({ photos, viewMode }: PhotoGalleryProps) {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

    if (photos.length === 0) {
        return (
            <div className="text-center p-10 border rounded-lg">
                <p className="text-muted-foreground">Aucune photo disponible.</p>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                    <Dialog key={index}>
                        <DialogTrigger asChild>
                            <div
                                className="cursor-pointer overflow-hidden rounded-lg border hover:opacity-90 transition-opacity"
                                onClick={() => setSelectedPhoto(photo)}
                            >
                                <div className="relative h-48 w-full">
                                    <Image src={photo || "/placeholder.svg"} alt={`Photo ${index + 1}`} fill className="object-cover" />
                                </div>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                            <div className="relative h-[70vh]">
                                <Image src={photo || "/placeholder.svg"} alt={`Photo ${index + 1}`} fill className="object-contain" />
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </>
    )
}

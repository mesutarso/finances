"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PhotoSlideshowProps {
    photos: string[]
    autoPlay?: boolean
    interval?: number
}

export function PhotoSlideshow({ photos, autoPlay = true, interval = 5000 }: PhotoSlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(autoPlay)

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
    }, [photos.length])

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
    }, [photos.length])

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev)
    }

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null

        if (isPlaying && photos.length > 1) {
            timer = setInterval(goToNext, interval)
        }

        return () => {
            if (timer) clearInterval(timer)
        }
    }, [isPlaying, goToNext, interval, photos.length])

    if (photos.length === 0) {
        return (
            <div className="text-center p-10 border rounded-lg">
                <p className="text-muted-foreground">Aucune photo disponible.</p>
            </div>
        )
    }

    return (
        <div className="relative rounded-lg overflow-hidden border">

            <div className="relative h-[60vh] w-full">
                <Image
                    src={photos[currentIndex] || "/placeholder.svg"}
                    alt={`Photo ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                />
            </div>


            <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={goToPrevious}
                >
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Précédent</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={goToNext}
                >
                    <ChevronRight className="h-6 w-6" />
                    <span className="sr-only">Suivant</span>
                </Button>
            </div>


            <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={togglePlayPause} className="text-foreground">
                    {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    {isPlaying ? "Pause" : "Lecture"}
                </Button>
                <div className="flex items-center gap-1">
                    {photos.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={cn(
                                "h-2 w-2 rounded-full transition-all",
                                currentIndex === index ? "bg-primary w-4" : "bg-muted-foreground/50",
                            )}
                            aria-label={`Aller à la photo ${index + 1}`}
                        />
                    ))}
                </div>
                <div className="text-sm">
                    {currentIndex + 1} / {photos.length}
                </div>
            </div>
        </div>
    )
}

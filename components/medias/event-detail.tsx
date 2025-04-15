"use client"

import { useState } from "react"
import { ArrowLeft, Grid, VideoIcon, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoPlayer } from "@/components/medias/video-player"
import { PhotoGallery } from "@/components/medias/photo-gallery"
import { PhotoSlideshow } from "@/components/medias/photo-slideshow"

interface Event {
    id: number
    documentId: string
    titre: string
    description: string
    photos: number
    lien_video?: string
    photoUrls: string[]
    date: string
}

interface EventDetailProps {
    event: Event
}

type ViewMode = "grid" | "slideshow"

export function EventDetail({ event }: EventDetailProps) {
    const [viewMode, setViewMode] = useState<ViewMode>("grid")

    return (
        <div className="space-y-8">

            <div className="flex items-center justify-between gap-4">
                <Link href="/ressources/photos-et-videos">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Retour</span>
                    </Button>
                </Link>
                <div className="text-center text-primary">
                    <h1 className="text-3xl font-bold">{event.titre}</h1>
                    <p className="text-muted-foreground">{event.date}</p>
                </div>
                <div>

                </div>
            </div>

            {/* Event description */}
            <Card className="p-6">
                <p className="text-lg">{event.description}</p>
            </Card>

            {/* Tabs for Photos and Video */}
            <Tabs defaultValue="photos" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="photos">Photos ({event.photos})</TabsTrigger>
                    <TabsTrigger value="video" disabled={!event.lien_video}>
                        Vidéo {!event.lien_video && "(Non disponible)"}
                    </TabsTrigger>
                </TabsList>


                <TabsContent value="photos" className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Galerie Photos</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground mr-2">Vue:</span>
                            <Button
                                variant={viewMode === "grid" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("grid")}
                                aria-label="Vue en grille"
                            >
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === "slideshow" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("slideshow")}
                                aria-label="Diaporama"
                            >
                                <SlidersHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {viewMode === "slideshow" ? (
                        <PhotoSlideshow photos={event.photoUrls} />
                    ) : (
                        <PhotoGallery photos={event.photoUrls} viewMode="grid" />
                    )}
                </TabsContent>

                {/* Video Tab */}
                <TabsContent value="video" className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Vidéo</h2>
                    {event.lien_video ? (
                        <VideoPlayer videoUrl={event.lien_video} title={event.titre} />
                    ) : (
                        <div className="text-center p-10 border rounded-lg">
                            <VideoIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Aucune vidéo disponible pour cet événement.</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}

import { Calendar, Camera, Video, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { Link } from 'next-view-transitions'

// Update the Event interface to include date
interface Event {
    id: number
    documentId: string
    titre: string
    description: string
    photos: number
    lien_video?: string
    date: string
    cover: string
    slug: string
}

interface EventCardProps {
    event: Event
}

export function EventCard({ event }: EventCardProps) {
    return (
        <Link href={`/ressources/photos-et-videos/${event.slug}`} legacyBehavior passHref className="cursor-pointer">
            <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow pt-0">
                <div className="relative h-60 w-full">
                    <Image
                        src={event.cover}
                        alt={event.titre}
                        fill
                        className="object-cover"
                        priority
                    />
                    {event.lien_video && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white p-1.5 rounded-full animate-pulse">
                            <Video className="h-5 w-5" />
                        </div>
                    )}
                </div>
                <CardHeader className="">
                    <h3 className="text-xl font-semibold line-clamp-2">{event.titre}</h3>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3">{event.description}</p>
                </CardContent>
                <CardFooter className="pt-2 border-t">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Camera className="h-4 w-4 mr-1" />
                            <span>{event.photos} photos</span>
                        </div>

                        {event.lien_video && (
                            <a
                                href={event.lien_video}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors group"
                            >
                                <Video className="h-4 w-4 mr-1 group-hover:animate-bounce" />
                                <span className="border-b border-dashed border-primary/50">Voir la vidéo</span>
                                <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                        )}
                    </div>
                    <div className="ml-auto text-sm flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {event.date}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}

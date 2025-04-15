"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ExternalLink, Youtube, VideoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

interface VideoPlayerProps {
    videoUrl: string
    title: string
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
    const [videoType, setVideoType] = useState<"youtube" | "vimeo" | "twitter" | "direct">("direct")
    const [videoIcon, setVideoIcon] = useState<React.ReactNode>(<VideoIcon className="h-24 w-24" />)
    const [serviceName, setServiceName] = useState<string>("la vidéo")

    useEffect(() => {

        if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
            setVideoType("youtube")
            setVideoIcon(<Youtube className="h-6 w-6 text-red-600" />)
            setServiceName("YouTube")
        } else if (videoUrl.includes("vimeo.com")) {
            setVideoType("vimeo")
            setVideoIcon(<VideoIcon className="h-6 w-6 text-blue-500" />)
            setServiceName("Vimeo")
        } else if (videoUrl.includes("twitter.com") || videoUrl.includes("x.com")) {
            setVideoType("twitter")
            setVideoIcon(
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>,
            )
            setServiceName("X")
        } else {
            setVideoType("direct")
            setVideoIcon(<VideoIcon className="h-6 w-6" />)
            setServiceName("la vidéo")
        }
    }, [videoUrl])

    return (
        <Card className="overflow-hidden max-w-md pt-0">
            <div className="relative bg-primary text-white h-48 flex items-center justify-center">

                {videoIcon}
            </div>
            <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Cette vidéo est disponible sur {serviceName}. Cliquez sur le bouton ci-dessous pour la visualiser.
                </p>
            </CardContent>
            <CardFooter className="px-4 pb-4 pt-0">
                <Button asChild className="w-full">
                    <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        <span>Voir sur {serviceName}</span>
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </CardFooter>
        </Card>
    )
}

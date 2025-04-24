"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share2, Download } from "lucide-react"
import PdfViewer from "./pdf-viewer"

export default function DocumentDetails({ document }: { document: any }) {
    function formatDate(dateString: string) {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date)
    }

    function shareDocument() {
        if (navigator.share) {
            navigator
                .share({
                    title: document.titre,
                    text: `${document.titre} - ${document.categories}`,
                    url: window.location.href,
                })
                .catch((error) => console.log("Error sharing", error))
        } else {
            navigator.clipboard
                .writeText(window.location.href)
                .then(() => alert("Lien copié dans le presse-papier"))
                .catch((error) => console.error("Erreur lors de la copie du lien", error))
        }
    }

    return (
        <div className="container mx-auto py-4 sm:py-6 md:py-8 px-2 sm:px-4">
            <Card className="mb-4 sm:mb-6">
                <CardHeader className="p-3 sm:p-4 md:p-6">
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <div>
                            <CardTitle className="text-xl sm:text-2xl capitalize line-clamp-2">{document.titre}</CardTitle>
                            <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                                <Badge variant="outline" className="text-xs sm:text-sm">{document.type}</Badge>
                                <Badge className="text-xs sm:text-sm">{document.categories}</Badge>
                                <Badge variant="default" className="text-xs sm:text-sm">Publié le {formatDate(document.date_publication)}</Badge>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" onClick={shareDocument} className="text-xs sm:text-sm h-8 sm:h-9">
                                <Share2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                Partager
                            </Button>
                            <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm h-8 sm:h-9">
                                <a href={document.fichier} download={`${document.titre}.pdf`}>
                                    <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                    Télécharger
                                </a>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card className="overflow-hidden">
                <CardContent className="p-0 sm:p-2 md:p-4 h-full">
                    <PdfViewer url={document.fichier} />
                </CardContent>
            </Card>
        </div>
    )
}

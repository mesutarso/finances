"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share2, Download, ZoomIn, ZoomOut } from "lucide-react"

export default function PDFViewer({ document }: { document: any }) {
    const [scale, setScale] = useState(1.0)

    function zoomIn() {
        setScale((prevScale) => Math.min(prevScale + 0.2, 2.5))
    }

    function zoomOut() {
        setScale((prevScale) => Math.max(prevScale - 0.2, 0.5))
    }

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
        <div className="container mx-auto py-8 px-4">
            <Card className="mb-6">
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                            <CardTitle className="text-2xl capitalize">{document.titre}</CardTitle>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline">{document.type}</Badge>
                                <Badge>{document.categories}</Badge>
                                <Badge variant="default">Publié le {formatDate(document.date_publication)}</Badge>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={shareDocument}>
                                <Share2 className="mr-2 h-4 w-4" />
                                Partager
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                                <a href={document.fichier} download={`${document.titre}.pdf`}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Télécharger
                                </a>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                        <div className="bg-muted p-4 rounded-lg mb-4 w-full max-w-4xl">
                            <div className="flex justify-center mb-4">
                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" size="icon" onClick={zoomOut} disabled={scale <= 0.5}>
                                        <ZoomOut className="h-4 w-4" />
                                    </Button>
                                    <span className="text-sm">{Math.round(scale * 100)}%</span>
                                    <Button variant="outline" size="icon" onClick={zoomIn} disabled={scale >= 2.5}>
                                        <ZoomIn className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <iframe
                                src={`${document.fichier}#toolbar=0&navpanes=0&scrollbar=0&zoom=${scale * 100}`}
                                className="w-full h-[900px] border-0"
                                title={document.titre}
                                allowFullScreen
                            />

                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

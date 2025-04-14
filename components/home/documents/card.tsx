import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileIcon, Download, Eye } from "lucide-react"
import Image from "next/image"

interface PdfCardProps {
    id: string
    title: string
    dateAdded: string
    url: string
    description?: string
}

export default function PdfCard({ id, title, dateAdded, url, description }: PdfCardProps) {
    return (
        <Card className="max-w-md overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="h-12 w-12 rounded-md bg-red-100 p-2 flex items-center justify-center">
                    <Image src={'/folder.svg'} alt={title} width={48} height={48} />
                </div>
                <div>
                    <CardTitle className="line-clamp-3 text-lg">{title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Ajouté le {dateAdded}
                    </p>
                </div>
            </CardHeader>



            <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm" asChild>
                    <a href={`/ressources/${id}`} target="_blank" rel="noopener noreferrer">
                        <Eye className="mr-2 h-4 w-4" />
                        Visualiser
                    </a>
                </Button>
                <Button variant="default" size="sm" asChild>
                    <a href={url} download>
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger
                    </a>
                </Button>
            </CardFooter>
        </Card>
    )
}


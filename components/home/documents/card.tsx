import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileIcon, Download, Eye, FolderOpen } from "lucide-react"


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
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <div className="h-12 w-[20%] rounded-md bg-muted p-3 flex items-center justify-center">
                    <FileIcon className="w-12 h-12 text-primary" />
                </div>
                <div className="flex flex-col gap-2 w-[80%]">
                    <CardTitle className="line-clamp-3 text-md">{title}</CardTitle>
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


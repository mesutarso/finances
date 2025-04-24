import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileIcon, Download, Eye, FolderOpen } from "lucide-react"
import { Link } from "next-view-transitions"


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
                <Button variant="outline" size="sm" asChild className="relative overflow-hidden border-primary text-primary capitalize text-sm font-medium px-2 py-2 group">
                    <Link href={`/ressources/${id}`} target="_blank" rel="noopener noreferrer">
                        <span className="absolute w-0 h-full bg-primary left-0 top-0 transition-all duration-500 ease-in-out group-hover:w-full"></span>
                        <span className="relative z-10 flex items-center transition-colors duration-500 ease-in-out group-hover:text-white">
                            <Eye className="mr-2 h-4 w-4" />
                            Visualiser
                        </span>
                    </Link>
                </Button>
                <Button variant="default" size="sm" asChild className="relative overflow-hidden bg-primary capitalize text-white text-sm font-medium px-2 py-2 border-2 border-primary group">
                    <a href={url} download>
                        <span className="absolute w-0 h-full bg-white left-0 top-0 transition-all duration-500 ease-in-out group-hover:w-full"></span>
                        <span className="relative z-10 flex items-center transition-colors duration-500 ease-in-out group-hover:text-primary">
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger
                        </span>
                    </a>
                </Button>
            </CardFooter>
        </Card>
    )
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import BRAIN from "@/public/intelligence.webp"

interface ServiceCardProps {
    title: string
    description: string
    type: string
    link: string
}

function ServiceCard({ title, description, link, type }: ServiceCardProps) {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Card className="flex flex-row h-40 gap-2 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:border-primary/20">
                <CardContent className="w-1/4 transition-transform duration-300 hover:scale-105">
                    <Image src={BRAIN} alt="Service" />
                </CardContent>
                <CardHeader className="w-3/4">
                    <CardTitle className="text-sm font-bold line-clamp-3 text-primary transition-colors duration-300 hover:text-primary/80">{title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{description}</CardDescription>
                    <Badge variant="outline" className="transition-colors duration-300 hover:bg-primary/10">{type || 'Service'}</Badge>
                </CardHeader>
            </Card>
        </a>
    )
}

export default ServiceCard
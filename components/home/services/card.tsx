import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartNoAxesCombined, DatabaseZap, MonitorCog } from "lucide-react"

const icons = [ChartNoAxesCombined, DatabaseZap, MonitorCog];

interface ServiceCardProps {
    title: string
    description: string
    type: string
    link: string
}

function ServiceCard({ title, description, link, type }: ServiceCardProps) {
    const randomIndex = Math.floor(Math.random() * icons.length);
    const IconComponent = icons[randomIndex];

    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="group">
            <Card className="h-full transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-lg group-hover:border-primary/20 group-hover:bg-primary">
                <CardHeader className="flex  items-center justify-center h-full p-4 ">
                    <div className='w-[20%]'>

                        <IconComponent className="w-16 h-16 mb-2 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className='w-[80%]'>
                        <CardTitle className="text-lg font-bold line-clamp-3 text-primary group-hover:text-white transition-colors duration-300">{title}</CardTitle>
                        <CardDescription className="mt-1 text-sm line-clamp-2 group-hover:text-white transition-colors duration-300">{description}</CardDescription>

                    </div>

                </CardHeader>
                <CardContent>
                    <Badge variant="outline" className="mt-auto text-xs group-hover:text-white group-hover:border-white/50 group-hover:bg-transparent transition-colors duration-300">{type || 'Service'}</Badge>
                </CardContent>
            </Card>
        </a>
    )
}

export default ServiceCard
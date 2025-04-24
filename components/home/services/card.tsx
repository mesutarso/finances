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
            <Card className="relative h-full overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-lg">
                <span className="absolute w-0 h-0 bg-primary left-0 bottom-0 transition-all duration-500 ease-in-out group-hover:w-full group-hover:h-full z-0"></span>

                <CardHeader className="relative z-10 flex items-center justify-center h-full p-4">
                    <div className='w-[20%]'>
                        <IconComponent className="w-16 h-16 mb-2 text-primary transition-colors duration-300 cursor-pointer group-hover:text-white" />
                    </div>
                    <div className='w-[80%]'>
                        <CardTitle className="text-lg font-bold line-clamp-3 text-primary transition-colors duration-300 cursor-pointer group-hover:text-white">{title}</CardTitle>
                        <CardDescription className="mt-1 text-sm line-clamp-2 transition-colors duration-300 cursor-pointer group-hover:text-white">{description}</CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="relative z-10">
                    <Badge variant="outline" className="mt-auto text-xs transition-colors duration-300 cursor-pointer group-hover:text-white group-hover:border-white/50 group-hover:bg-transparent">{type || 'Service'}</Badge>
                </CardContent>
            </Card>
        </a>
    )
}

export default ServiceCard
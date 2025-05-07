import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChartNoAxesCombined, DatabaseZap, MonitorCog } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
            <Card className="h-full transition-all duration-300 ease-in-out group text-primary hover:shadow-md hover:bg-primary hover:text-white">
                <CardHeader className="p-2 flex">
                    <div className='w-[20%]'>
                        <IconComponent className="w-16 h-16 mb-2 " />
                    </div>
                    <div className='w-[80%]'>
                        <CardTitle className="text-lg font-bold line-clamp-3 ">{title}</CardTitle>
                        <CardDescription className="mt-1 text-sm line-clamp-2">{description}</CardDescription>
                    </div>

                </CardHeader>
                <CardContent className='w-[100%] flex justify-end'>
                    <Badge variant={'outline'} className="text-xs mt-2 group-hover:text-white">service</Badge>
                </CardContent>


            </Card>
        </a>
    )
}

export default ServiceCard
import { Badge } from "@/components/ui/badge";
import { Link } from "next-view-transitions";


type LineCardProps = {
    title: string;
    date: string;
    link: string;
    categorie: string;
}


function LineCard({ title, date, link, categorie }: LineCardProps) {
    return (
        <div className="max-w-2xl  relative inline-block border-b border-gray-200 pb-4 cursor-pointer group group:hover:bg-gray-50">
            <Link href={link} className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div className="text-sm text-gray-800">{date}</div>
                </div>
                <div className="text-md text-gray-800 group-hover:text-primary font-semibold">{title}</div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline">{categorie}</Badge>
                </div>
            </Link>
        </div>
    )
}

export default LineCard
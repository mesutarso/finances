import Heading from "@/components/shared/heading"
import PdfCard from "./card"
import { documents } from "@/lib/constants/documents"
import { Button } from "@/components/ui/button"
import { Link } from "next-view-transitions"

function HomeDocuments() {
    return (
        <section className="bg-white">
            <div className="container section space-y-8">
                <Heading title="Documents récents" color="yellow" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map((document) => (
                        <PdfCard key={document.title} {...document} />
                    ))}
                </div>
                <div className="flex justify-center">
                    <Link href="/ressources">
                        <Button size="lg" className="w-fit bg-yellow text-primary hover:text-white ">Voir les ressources</Button>
                    </Link>
                </div>
            </div>
        </section>

    )
}

export default HomeDocuments
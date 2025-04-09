import IMAGE404 from "@/public/404.svg"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 ">
            <Image src={IMAGE404} alt="404" width={500} height={500} />
            <h1 className="text-2xl font-bold">Page non trouvée</h1>
            <p className="text-sm text-gray-500">La page que vous cherchez n&apos;existe pas.</p>
            <Link href="/" className="text-sm text-gray-500">
                <Button>
                    Retour à la page d&apos;accueil
                </Button>
            </Link>
        </div>
    )
}
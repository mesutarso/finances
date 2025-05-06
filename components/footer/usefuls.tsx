import { USEFULSLINKS } from "@/lib/constants"
import { Link } from "next-view-transitions"

function Useful() {
    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Liens utiles</h3>
            <ul className="flex flex-col gap-2">
                {USEFULSLINKS.map((link) => (
                    <li key={link.label} className="text-md text-white font-medium text-md hover:text-yellow transition-all duration-300 ease-in-out hover:translate-x-2">
                        <Link href={link.href}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Useful
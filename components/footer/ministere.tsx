import { MINISTERE } from "@/lib/constants"
import { Link } from "next-view-transitions"

function Ministere() {
    return (
        <div>
            <h3 className="text-lg font-bold mb-4">Le Ministère</h3>
            <ul className="flex flex-col gap-2">
                {MINISTERE.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Ministere
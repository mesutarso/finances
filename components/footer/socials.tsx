import { SOCIALS } from "@/lib/constants"
import { FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";


const icons = {
    linkedin: FaLinkedin,
    x: FaXTwitter,
    youtube: FaYoutube,
}

const reseaux_sociaux = SOCIALS.map((social) => ({
    label: social.label,
    href: social.href,
    icon: icons[social.label as keyof typeof icons],
}))

function Socials() {
    return (
        <div className="flex gap-4">
            {reseaux_sociaux.map((social) => (
                <a href={social.href} key={social.label}>
                    <social.icon className="w-6 h-6" />
                </a>
            ))}
        </div>
    )
}

export default Socials
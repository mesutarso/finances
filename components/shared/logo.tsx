import Image from "next/image"
import { Link } from 'next-view-transitions'
import LOGO_DARK from "@/public/logo.png"
import LOGO_WHITE from "@/public/logo-white.png"
type LogoProps = {
    type: "dark" | "light"
}

function Logo({ type }: LogoProps) {
    return (
        <Link href="/">
            <Image src={type === "dark" ? LOGO_DARK : LOGO_WHITE} alt="Logo" width={250} height={100} />
        </Link>
    )
}

export default Logo
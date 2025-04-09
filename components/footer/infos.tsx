import Logo from "../shared/logo"
import { Phone, Mail } from "lucide-react"
import Socials from "./socials"

function Infos() {
    return (
        <div className="flex flex-col gap-4">
            <Logo type="light" />
            <div className="flex flex-col gap-2">
                <p>
                    Centre Financier de Kinshasa
                    <br />
                    Kinshasa, RDC
                </p>
                <div className="flex flex-col gap-2">
                    <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        +243 999 999 999
                    </p>
                    <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        contact@finances.gouv.cd
                    </p>
                </div>
            </div>
            <Socials />

        </div>
    )
}

export default Infos
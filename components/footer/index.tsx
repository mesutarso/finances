import Infos from "./infos"
import Useful from "./usefuls"
import Ministere from "./ministere"
import Line from "../shared/line"
import Institutionnels from "./institutionnels"
function Footer() {
    return (
        <>
            <Line />
            <footer className="bg-primary  text-white">
                <div className="container section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    <Infos />
                    <Useful />
                    <Ministere />
                    <Institutionnels />
                </div>
                <div className="flex flex-col items-center justify-center py-5">
                    <p className="text-sm text-white">
                        Ministère des Finances  &copy; {new Date().getFullYear()} - Tous droits réservés
                    </p>
                </div>

            </footer>
        </>
    )
}

export default Footer
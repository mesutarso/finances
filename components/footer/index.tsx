import Infos from "./infos"
import Useful from "./usefuls"
import Line from "../shared/line"
import Institutionnels from "./institutionnels"
import Newsletter from "./newsletter"
function Footer() {
    return (
        <>
            <Line />
            <footer className="bg-primary  text-white">
                <div className="container section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <Infos />
                    <Useful />
                    <Institutionnels />
                    <Newsletter />
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
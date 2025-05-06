import Logo from "../shared/logo";
import Menu from "./menu";
import Drawer from "./drawer";


function Header() {
    return (
        <header className=" py-2 shadow-sm bg-white sticky top-0 z-50 ">
            <div className="container flex items-center justify-between ">
                <Logo type="dark" />
                <Menu />
                <Drawer />
            </div>
        </header>
    );
}

export default Header;
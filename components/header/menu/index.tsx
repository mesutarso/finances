import { MENU } from "@/lib/constants"
import { MenuItem } from "./item"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import { SearchDialog } from "../search"


function Menu() {
    return (
        <NavigationMenu className="w-full hidden md:block">
            <NavigationMenuList>
                {MENU.map((item) => (
                    <MenuItem key={item.label} label={item.label} href={item.href} subMenu={item?.submenus || []} />
                ))}
                <div className="">
                    <SearchDialog />
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Menu
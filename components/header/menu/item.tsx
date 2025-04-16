'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { Link } from 'next-view-transitions'
import { NavigationMenuItem, navigationMenuTriggerStyle } from "../../ui/navigation-menu"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"

export function MenuItem({ label, href, subMenu }: { label: string, href: string, subMenu: { label: string, href: string }[] }) {
    const pathname = usePathname()
    const isActive = pathname === href || subMenu.some(item => pathname === item.href)

    if (!subMenu || subMenu.length === 0) {
        return (
            <NavigationMenuItem>
                <Link
                    href={href}
                    className={cn(
                        navigationMenuTriggerStyle(),
                        isActive && "bg-primary text-white font-medium",
                        "capitalise text-xl focus:outline-none focus:ring-0 focus-visible:ring-0"
                    )}
                >
                    {label}
                </Link>
            </NavigationMenuItem>
        )
    }

    return (
        <NavigationMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Link
                        className={cn(
                            navigationMenuTriggerStyle(),
                            isActive && "bg-primary text-white text-xl font-medium",
                            "flex items-center gap-1 capitalise text-xl focus:outline-none focus:ring-0 focus-visible:ring-0"
                        )}
                        href={href}
                    >
                        {label}
                        <ChevronDown className="h-4 w-4" />
                    </Link>
                </DropdownMenuTrigger>
                <AnimatePresence>
                    <DropdownMenuContent
                        align="start"
                        className="w-56"
                        asChild
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {subMenu.map((item) => (
                                <DropdownMenuItem key={item.label} asChild>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "w-full text-lg focus:outline-none focus:ring-0 focus-visible:ring-0",
                                            pathname === item.href && "text-primary font-medium text-lg"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </motion.div>
                    </DropdownMenuContent>
                </AnimatePresence>
            </DropdownMenu>
        </NavigationMenuItem>
    )
}
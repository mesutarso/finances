'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { MENU } from "@/lib/constants"
import { Menu } from "lucide-react"
import {
    Drawer as Hamburger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Logo from "@/components/shared/logo"
import { Link } from 'next-view-transitions'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "motion/react"
import { cn } from '@/lib/utils'

function Drawer() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()


    return (
        <div className="md:hidden">
            <Hamburger open={isOpen} onOpenChange={setIsOpen} direction="left" >
                <DrawerTrigger>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Menu className="w-6 h-6" />
                    </motion.div>
                </DrawerTrigger>
                <DrawerContent className="container bg-white/95 backdrop-blur-sm">
                    <DrawerHeader>
                        <DrawerTitle>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Logo type="dark" />
                            </motion.div>
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col gap-4 mt-8">
                        <ul className="flex flex-col gap-4">
                            {MENU.map((item, index) => (
                                <motion.li
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    {item.submenus ? (
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value={item.label}>
                                                <AccordionTrigger className={cn('hover:no-underline p-0 text-lg font-medium hover:text-primary transition-colors', item.href === pathname || item.submenus.some(submenu => submenu.href === pathname) && 'bg-primary text-white rounded-md px-4 py-1 hover:text-white')}>
                                                    {item.label}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <ul className="pl-4 flex flex-col gap-4 mt-4 ">
                                                        {item.submenus.map((submenu, subIndex) => (
                                                            <motion.li
                                                                key={submenu.label}
                                                                onClick={() => setIsOpen(false)}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ duration: 0.3, delay: (index + subIndex) * 0.1 }}
                                                            >
                                                                <Link
                                                                    href={submenu.href}
                                                                    className={cn("text-gray-600 hover:text-primary transition-colors", submenu.href === pathname && 'bg-primary text-white rounded-md px-4 py-1 hover:text-white')}
                                                                >
                                                                    {submenu.label}
                                                                </Link>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ) : (
                                        <motion.div
                                            className="flex items-center gap-2"
                                            onClick={() => setIsOpen(false)}
                                            whileHover={{ x: 10 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className={cn("text-lg font-medium text-gray-800 hover:text-primary transition-colors", item.href === pathname && 'bg-primary text-white rounded-md px-4 py-1 hover:text-white')}
                                            >
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    )}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </DrawerContent>
            </Hamburger>

        </div>


    )
}

export default Drawer
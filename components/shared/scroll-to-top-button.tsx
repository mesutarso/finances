"use client"

import { useCallback, useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"

interface ScrollToTopButtonProps {
    threshold?: number
    className?: string
    position?: "right" | "left"
    offset?: number
}

export function ScrollToTopButton({
    threshold = 50,
    className,
    position = "right",
    offset = 20,
}: ScrollToTopButtonProps) {
    const [isVisible, setIsVisible] = useState(false)

    const checkScrollPosition = useCallback(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPosition = window.scrollY
        const scrollPercentage = (scrollPosition / scrollHeight) * 100

        setIsVisible(scrollPercentage >= threshold)
    }, [threshold])

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }, [])

    useEffect(() => {
        checkScrollPosition()

        let timeoutId: NodeJS.Timeout | null = null
        const handleScroll = () => {
            if (timeoutId) return
            timeoutId = setTimeout(() => {
                checkScrollPosition()
                timeoutId = null
            }, 100)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [checkScrollPosition])

    const buttonPosition = {
        [position === "right" ? "right" : "left"]: `${offset}px`,
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-6 z-50"
                    style={buttonPosition}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 0.3,
                    }}
                >
                    <Button
                        className={cn(
                            "rounded-full p-3 shadow-lg bg-white text-black hover:bg-gray-100 hover:text-black focus:ring-2 focus:ring-gray-300",
                            "transition-all duration-300 hover:shadow-xl",
                            className,
                        )}
                        onClick={scrollToTop}
                        aria-label="Remonter en haut de la page"

                    >
                        <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                ease: "easeInOut",
                            }}
                        >
                            <ArrowUp className="h-5 w-5" />
                        </motion.div>
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ScrollToTopButton

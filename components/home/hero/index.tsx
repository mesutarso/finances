"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "motion/react"
import { Link } from "next-view-transitions"

export default function Home() {
    const [current, setCurrent] = useState(0)

    const slides = [
        {
            id: 1,
            title: "Ministère des Finances",
            description:
                "Gestion des finances publiques, politique économique et financière, budget de l'État, dette publique, impôts, régulation financière.",
            image: "/cfk.jpeg",
        },


    ]

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1)
    }


    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, 3000)
        return () => clearInterval(interval)
    }, [current])


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.3,
                duration: 0.1,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                when: "afterChildren",
                staggerChildren: 0.1,
                staggerDirection: -1,
                duration: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3,
                ease: "easeIn",
            },
        },
    }

    return (
        <section id="hero">
            <div className="relative min-h-[600px] w-full overflow-hidden">
                {slides?.map((slide: any, index: number) => (
                    <div
                        key={slide.id}
                        className={`absolute  inset-0 ${index === current ? "" : "pointer-events-none"}`}
                        style={{ zIndex: index === current ? 10 : 0 }}
                    >

                        <div className="absolute inset-0">
                            <Image
                                src={slide.image || "/placeholder.svg"}
                                alt="Ministère des Finances"
                                fill
                                priority
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-black/50"></div>
                        </div>


                        <AnimatePresence mode="wait">
                            {index === current && (
                                <motion.div
                                    key={`content-${slide.id}`}
                                    className="relative container z-10 flex h-full flex-col justify-center text-white px-4 "
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className="max-w-4xl mx-auto md:ml-0">
                                        <motion.h1
                                            className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-left"
                                            variants={itemVariants}
                                        >
                                            {slide.title}
                                        </motion.h1>
                                        <motion.p
                                            className="mb-8 text-sm md:text-base max-w-2xl mx-auto md:mx-0 text-left"
                                            variants={itemVariants}
                                        >
                                            {slide.description}
                                        </motion.p>
                                        <motion.div className="flex flex-col sm:flex-row gap-4 justify-start" variants={itemVariants}>
                                            <Link href="/programme">
                                                <Button className="relative bg-primary text-white font-medium px-6 py-3 overflow-hidden group border-2 border-primary hover:border-primary">
                                                    <span className="absolute cursor-pointer w-0 h-full bg-white left-0 top-0 transition-all duration-500 ease-in-out group-hover:w-full"></span>
                                                    <span className="relative cursor-pointer z-10 transition-colors duration-500 ease-in-out group-hover:text-primary">
                                                        Programme du ministre
                                                    </span>
                                                </Button>
                                            </Link>
                                            <Link href="/contact">
                                                <Button
                                                    variant="outline"
                                                    className="relative border-primary text-primary font-medium px-6 py-3 overflow-hidden group"
                                                >
                                                    <span className="absolute cursor-pointer  w-0 h-full bg-yellow left-0 top-0 transition-all duration-500 ease-in-out group-hover:w-full"></span>
                                                    <span className="relative cursor-pointer z-10 transition-colors duration-500 ease-in-out group-hover:text-primary">
                                                        Contactez nous
                                                    </span>
                                                </Button>
                                            </Link>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}

                {slides.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                            aria-label="Slide précédente"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                            aria-label="Slide suivante"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </>
                )}

                {/* Indicators */}
                <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
                    {slides?.map((_: any, index: number) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`h-2 w-8 rounded-full transition-all ${index === current ? "bg-white" : "bg-white/50"}`}
                            aria-label={`Aller au slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}


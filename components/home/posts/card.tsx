"use client"

import { useState } from "react"
import Image from "next/image"
import { Link } from "next-view-transitions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, type AnimationProps, type MotionProps } from "motion/react"

interface AnimationConfig {
    initial?: AnimationProps["initial"]
    animate?: AnimationProps["animate"]
    transition?: MotionProps["transition"]
    hoverScale?: number
    hoverDuration?: number
    loadingAnimation?: "pulse" | "shimmer" | "fade" | "none"
}

interface PostCardProps {
    title: string
    categorie?: string
    date: string
    image: string
    link: string
    animation?: AnimationConfig
}

function PostCard({
    title,
    categorie,
    date,
    image,
    link,
    animation = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        hoverScale: 1.1,
        hoverDuration: 300,
        loadingAnimation: "pulse",
    },
}: PostCardProps) {
    const [isLoading, setIsLoading] = useState(true)

    const { initial, animate, transition, hoverScale, hoverDuration, loadingAnimation } = animation

    // Generate loading animation styles
    const getLoadingAnimationClass = () => {
        switch (loadingAnimation) {
            case "pulse":
                return "animate-pulse bg-gray-200"
            case "shimmer":
                return "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent bg-gray-200 relative overflow-hidden"
            case "fade":
                return "animate-[fade_1.5s_infinite] bg-gray-200"
            case "none":
            default:
                return "bg-gray-200"
        }
    }

    return (
        <motion.div initial={initial} animate={animate} transition={transition} whileHover={{ scale: 1.02 }}>
            <Link href={link}>
                <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 h-full p-0">
                    <div className="relative h-64 w-full overflow-hidden">
                        <Image
                            src={image || "/placeholder.svg"}
                            alt={title}
                            fill
                            className={`object-cover transition-transform duration-${hoverDuration} group-hover:scale-${hoverScale ? hoverScale * 10 : 11} ${isLoading ? "blur-sm" : "blur-0"}`}
                            onLoad={() => setIsLoading(false)}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {isLoading && <div className={`absolute inset-0 ${getLoadingAnimationClass()}`} />}
                    </div>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold line-clamp-3">{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-8 flex justify-between items-center">
                        {categorie && (
                            <p className="text-sm font-medium bg-blue-500 text-white px-2 py-1 rounded-md">{categorie}</p>
                        )}
                        <p className="text-sm text-gray-800 mt-2 font-bold">{date}</p>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    )
}

export default PostCard

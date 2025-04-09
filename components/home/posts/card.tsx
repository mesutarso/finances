'use client'
import { useState } from "react"
import Image from "next/image"
import { Link } from 'next-view-transitions'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "motion/react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface PostCardProps {
    title: string
    categorie?: string
    date: string
    image: string
    link: string
}

function PostCard({ title, categorie, date, image, link }: PostCardProps) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Link href={link}>
                <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 h-full p-0">
                    <div className="relative h-64 w-full overflow-hidden">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className={`object-cover transition-transform duration-300 group-hover:scale-110 ${isLoading ? 'blur-sm' : 'blur-0'
                                }`}
                            onLoad={() => setIsLoading(false)}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {isLoading && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                        )}
                    </div>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold line-clamp-3">{title}</CardTitle>
                    </CardHeader>
                    <CardContent className=" pb-8 flex justify-between items-center">
                        <p className="text-sm font-medium bg-blue-500 text-white px-2 py-1 rounded-md">{categorie}</p>
                        <p className="text-sm text-gray-800 mt-2 font-bold">{date}</p>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    )
}

export default PostCard
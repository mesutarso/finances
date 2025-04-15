"use client"

import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"


interface CabinetSectionProps {
    title: string
    members: any[]
    level: "primary" | "secondary" | "tertiary" | "quaternary"
    className?: string
}

export function CabinetSection({ title, members, level, className = "" }: CabinetSectionProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
    }

    const getSectionBgColor = () => {
        switch (level) {
            case "primary":
                return "bg-blue-50"
            case "secondary":
                return "bg-red-50"
            case "tertiary":
                return "bg-yellow-50"
            case "quaternary":
                return "bg-green-50"
            default:
                return "bg-gray-50"
        }
    }

    return (
        <section className={`${getSectionBgColor()} rounded-lg py-8 px-6 mb-4 ${className}`}>
            <h2 className="text-2xl font-semibold mb-8 text-center">{title}</h2>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center w-full"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {members?.map((member: any, index: number) => (
                    <motion.div key={index} variants={item}>
                        <MemberCard name={member?.noms} role={member?.fonction} image={member?.portrait || "/default.png"} level={level} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}

interface MemberCardProps {
    name: string
    role: string
    image: string
    level: "primary" | "secondary" | "tertiary" | "quaternary"
}

function MemberCard({ name, role, image, level }: MemberCardProps) {
    const getBgColor = () => {
        switch (level) {
            case "primary":
                return "bg-white border-blue-200"
            case "secondary":
                return "bg-white border-red-200"
            case "tertiary":
                return "bg-white border-yellow-200"
            case "quaternary":
                return "bg-white border-green-200"
            default:
                return "bg-white border-gray-200"
        }
    }

    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
            <Card className={`overflow-hidden border-2 p-0 ${getBgColor()}`}>
                <div className="relative h-68 w-full">
                    <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
                </div>
                <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-lg">{name}</h3>
                    <p className="text-sm text-gray-600">{role}</p>
                </CardContent>
            </Card>
        </motion.div>
    )
}

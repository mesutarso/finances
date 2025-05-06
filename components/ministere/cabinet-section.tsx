"use client"

import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"


interface CabinetSectionProps {
    title: string
    members: any
    level: "primary" | "secondary" | "tertiary" | "quaternary"
    className?: string
    type?: 'single' | 'double'
}

export function CabinetSection({ title, members, level, className = "", type = 'single' }: CabinetSectionProps) {
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



    return (
        <section className={`rounded-lg py-8 px-6 mb-4 ${className}`}>
            <h2 className="text-2xl font-semibold mb-8 text-center">{title}</h2>
            <motion.div
                className={`  mx-auto ${type === 'double' ? 'grid grid-cols-2 gap-16 max-w-2xl' : 'max-w-sm min-h-[300px]'}`}
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

    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
            <Card className={`overflow-hidden h-[450px] border border-neutral-50 p-0 shadow-lg `}>
                <div className="relative h-[80%] w-full">
                    <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover w-full" />
                </div>
                <CardContent className="p-2 text-center mb-6">
                    <h3 className="font-semibold text-xl text-primary">{name}</h3>
                    <p className="text-lg text-black">{role}</p>
                </CardContent>
            </Card>
        </motion.div>
    )
}

import Line from '@/components/shared/line'
import ServicesContent from "@/components/home/services/content";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | Ministère des Finances",
    description: "Services",
}

export default function Services() {
    return (
        <div className="container section">
            <div className="max-w-2xl relative inline-block space-y-2 mb-8">
                <h1 className="md:text-3xl text-2xl font-bold">Les services </h1>
                <Line />
            </div>
            <ServicesContent />
        </div>
    )
}
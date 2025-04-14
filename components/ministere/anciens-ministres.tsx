'use client'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { anciensMinistresQuery } from '@/lib/react-query/ministere/options'
import { motion } from 'motion/react'
import Image from 'next/image'

interface AncienMinistre {
    noms: string
    periode: string
    portrait: string
}

function AnciensMinistresContent() {
    const { data } = useQuery(anciensMinistresQuery)
    const [searchTerm, setSearchTerm] = useState('')

    const filteredData = data?.filter((ministre: AncienMinistre) =>
        ministre.noms.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 max-w-md ">
                <input
                    type="text"
                    placeholder="Rechercher par nom..."
                    className="w-full p-2  rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredData?.map((ministre: AncienMinistre, index: number) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="relative h-78">
                            <Image
                                src={ministre.portrait || '/default.png'}
                                alt={ministre.noms}
                                fill
                                className="object-cover"
                            />





                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{ministre.noms}</h3>
                            <p className="text-gray-600">{ministre.periode}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default AnciensMinistresContent
'use client'
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import { FaLinkedin, FaXTwitter, FaFacebook, FaInstagram, FaWikipediaW } from 'react-icons/fa6'
import { Link } from 'next-view-transitions'
import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { useQuery } from '@tanstack/react-query'
import { ministreQuery } from '@/lib/react-query/ministere/options'
import Image from 'next/image'

function MinistreContent() {
    const { data } = useQuery(ministreQuery);

    const socials = {
        linkedin: <FaLinkedin className="text-3xl" />,
        x: <FaXTwitter className="text-3xl" />,
        facebook: <FaFacebook className="text-3xl" />,
        instagram: <FaInstagram className="text-3xl" />,
        wikipedia: <FaWikipediaW className="text-3xl" />,
    };
    return (
        <div className="container section  px-4 py-8 space-y-16">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-primary">{data?.noms}</h1>
                <h2 className="text-xl font-bold mb-2">Ministre des Finances</h2>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col items-center">
                    <Card className="w-full  overflow-hidden p-0">
                        <CardContent className="p-0">
                            <Image
                                // @ts-ignore
                                src={data?.portrait}
                                alt="Portrait du Ministre des Finances"
                                width={400}
                                height={600}
                                className="w-full object-cover"
                            />
                        </CardContent>
                    </Card>

                    <div className="mt-6 flex justify-center gap-4">
                        {data?.reseaux_sociaux?.map((social: any, index: number) => (
                            <a key={index} className="text-3xl hover:text-primary transition-all duration-300 hover:scale-110" href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.nom}>
                                {socials[social.nom as keyof typeof socials]}
                            </a>

                        ))}
                    </div>
                </div>

                <div className="">
                    <h2 className="text-2xl font-bold mb-4">Biographie</h2>
                    <div className="space-y-4 text-justify prose">
                        <div dangerouslySetInnerHTML={{ __html: data?.biographie }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MinistreContent
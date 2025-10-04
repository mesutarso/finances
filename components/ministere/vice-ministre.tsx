'use client'

import { FaLinkedin, FaXTwitter, FaFacebook, FaInstagram, FaWikipediaW } from 'react-icons/fa6'
import { Card, CardContent } from '../ui/card'
import { useQuery } from '@tanstack/react-query'
import { viceMinistreQuery } from '@/lib/react-query/ministere/options'
import Image from 'next/image'
import ConstructionMode from '../maintenance/construction-mode'

function ViceMinistreContent() {
    const { data } = useQuery(viceMinistreQuery);

    const socials = {
        linkedin: <FaLinkedin className="text-3xl" />,
        x: <FaXTwitter className="text-3xl" />,
        facebook: <FaFacebook className="text-3xl" />,
        instagram: <FaInstagram className="text-3xl" />,
        wikipedia: <FaWikipediaW className="text-3xl" />,
    };
    if (!data?.noms) {
        return <ConstructionMode />
    }
    return (
        <div className="container section">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-primary">{data?.noms}</h1>
                <h2 className="text-xl font-bold mb-2">Vice-Ministre des Finances</h2>
            </div>

            <article className="prose prose-lg max-w-none">
                <div className="relative">
                    <div className="float-left mr-8 mb-6 w-full max-w-[550px] md:w-[550px]">
                        <Card className="overflow-hidden shadow-xl p-0">
                            <CardContent className="p-0">
                                <Image
                                    src={data?.portrait}
                                    alt="Portrait du Vice-Ministre des Finances"
                                    width={550}
                                    height={700}
                                    className="h-auto w-full object-cover"
                                />
                            </CardContent>
                        </Card>

                        <div className="mt-4 flex justify-center gap-4">
                            {data?.reseaux_sociaux?.map((social: any, index: number) => (
                                <a key={index} className="text-2xl hover:text-primary transition-all duration-300 hover:scale-110" href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.nom}>
                                    {socials[social.nom as keyof typeof socials]}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="leading-relaxed text-foreground text-justify">
                        <h2 className="text-2xl font-bold mb-4">Biographie</h2>
                        <div dangerouslySetInnerHTML={{ __html: data?.biographie }} />
                    </div>
                </div>
            </article>
        </div>
    )
}

export default ViceMinistreContent
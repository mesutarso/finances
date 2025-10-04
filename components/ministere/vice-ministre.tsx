'use client'

import { FaLinkedin, FaXTwitter, FaFacebook, FaInstagram, FaWikipediaW } from 'react-icons/fa6'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { useQuery } from '@tanstack/react-query'
import { viceMinistreQuery } from '@/lib/react-query/ministere/options'
import Image from 'next/image'
import ConstructionMode from '../maintenance/construction-mode'
import { useState } from 'react'

function ViceMinistreContent() {
    const { data } = useQuery(viceMinistreQuery);
    const [showFullBiography, setShowFullBiography] = useState(false);

    const socials = {
        linkedin: <FaLinkedin className="text-3xl" />,
        x: <FaXTwitter className="text-3xl" />,
        facebook: <FaFacebook className="text-3xl" />,
        instagram: <FaInstagram className="text-3xl" />,
        wikipedia: <FaWikipediaW className="text-3xl" />,
    };

    const truncateHTML = (html: string, maxLength: number = 300) => {
        const textOnly = html.replace(/<[^>]*>/g, '');
        if (textOnly.length <= maxLength) return html;

        const truncated = textOnly.substring(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');
        const actualLength = lastSpace > 0 ? lastSpace : maxLength;
        let charCount = 0;
        let result = '';
        let inTag = false;

        for (let i = 0; i < html.length; i++) {
            const char = html[i];

            if (char === '<') {
                inTag = true;
            } else if (char === '>') {
                inTag = false;
            }

            result += char;

            if (!inTag && char !== '<' && char !== '>') {
                charCount++;
                if (charCount >= actualLength) {

                    result += '...';
                    break;
                }
            }
        }

        return result;
    };
    if (!data?.noms) {
        return <ConstructionMode />
    }
    return (
        <div className="container section px-4 py-8 space-y-16">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-primary">{data?.noms}</h1>
                <h2 className="text-xl font-bold mb-2">Vice-Ministre des Finances</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col items-center">
                    <Card className="w-full overflow-hidden p-0">
                        <CardContent className="p-0">
                            <Image
                                src={data?.portrait}
                                alt="Portrait du Vice-Ministre des Finances"
                                width={400}
                                height={600}
                                className="w-full object-cover"
                            />
                        </CardContent>
                    </Card>

                    <div className="mt-6 flex justify-center gap-4">
                        {data?.reseaux_sociaux?.map((social: any, index: number) => (
                            <a
                                key={index}
                                className="text-3xl hover:text-primary transition-all duration-300 hover:scale-110"
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.nom}
                            >
                                {socials[social.nom as keyof typeof socials]}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="">
                    <h2 className="text-2xl font-bold mb-4">Biographie</h2>
                    <div className="space-y-4 text-justify prose">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: showFullBiography
                                    ? data?.biographie
                                    : truncateHTML(data?.biographie || '', 1000)
                            }}
                        />

                        {data?.biographie && data.biographie.replace(/<[^>]*>/g, '').length > 1000 && (
                            <div className="mt-6 text-center">
                                <Button
                                    onClick={() => setShowFullBiography(!showFullBiography)}
                                    variant="outline"
                                    className="px-6 py-2"
                                >
                                    {showFullBiography ? 'Voir moins' : 'Voir plus'}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViceMinistreContent
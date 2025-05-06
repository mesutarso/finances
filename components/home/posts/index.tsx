'use client'
import Heading from "@/components/shared/heading"
import PostCard from "./card"

import { Button } from "@/components/ui/button"
import { Link } from 'next-view-transitions'
import { useQuery } from '@tanstack/react-query'
import { latestArticlesQuery } from "@/lib/react-query/articles/options";
function HomePosts() {
    const { data: articles } = useQuery(latestArticlesQuery);
    return (
        <div className="container section space-y-16">

            <Heading title="À la une" color="blue" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles?.map((article: any) => (
                    <PostCard key={article.link} {...article} />
                ))}
            </div>
            <div className="flex justify-center ">
                <Link href="/actualites">
                    <Button className="relative w-fit bg-primary text-white px-8 py-4 overflow-hidden group border border-neutral-50 hover:shadow-md">
                        <span className="absolute cursor-pointer w-0 h-full bg-white left-0 top-0 transition-all duration-500 ease-in-out group-hover:w-full"></span>
                        <span className="relative cursor-pointer font-semibold z-10 transition-colors duration-500 ease-in-out group-hover:text-primary">
                            Voir toutes les actualités
                        </span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default HomePosts
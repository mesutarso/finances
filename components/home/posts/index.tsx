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
        <div className="container section space-y-8">

            <Heading title="À la une" color="blue" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article) => (
                    <PostCard key={article.link} {...article} />
                ))}
            </div>
            <div className="flex justify-center">
                <Link href="/actualites">
                    <Button size="lg" className="w-fit bg-primary text-white ">Voir les actualités</Button>
                </Link>
            </div>
        </div>
    )
}

export default HomePosts
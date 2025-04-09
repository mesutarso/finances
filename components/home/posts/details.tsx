'use client'
import { CalendarIcon, ClockIcon, TagIcon, User } from "lucide-react"
import Image from "next/image"
import { useSuspenseQuery } from '@tanstack/react-query'
import { articleBySlugQuery } from "@/lib/react-query/articles/options"
import { notFound } from "next/navigation"
import ShareButtons from "@/components/shared/share-buttons"
import PostCard from "@/components/home/posts/card"

type PostDetailsProps = {
    slug: string
}

function PostDetails({ slug }: PostDetailsProps) {
    const { data } = useSuspenseQuery(articleBySlugQuery(slug))
    if (!data) {
        notFound()
    }
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/articles/${data?.link}`
    return (
        <div>
            <article className="max-w-4xl mx-auto px-4 ">

                <h1 className="text-4xl font-bold tracking-tight mb-6">
                    {data?.title}
                </h1>


                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
                    <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span className="text-sm text-muted-foreground">{data?.date}</span>
                    </div>
                    <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Cellule de communication</span>
                    </div>
                    <div className="flex items-center">
                        <TagIcon className="mr-2 h-4 w-4" />
                        <span>{data?.categorie}</span>
                    </div>
                </div>



                <div className="mb-8">
                    <Image
                        src={data?.image}
                        alt={data?.title}
                        width={1200}
                        height={600}
                        className="rounded-lg"
                    />


                </div>


                <div className="prose  max-w-none space-y-4 ">
                    <div dangerouslySetInnerHTML={{ __html: data?.content }} />

                </div>
                <div className="flex flex-col items-center justify-center space-y-4 my-4">
                    <h2 className="text-2xl font-bold">Partager sur :</h2>
                    <ShareButtons title={data?.title} url={url} />
                </div>


            </article>
            <div className=" space-y-4 my-8">
                <h2 className="text-3xl text-primary font-bold">Les articles similaires</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.similarArticles?.map((item: any) => (
                        <PostCard key={item.title} {...item} />
                    ))}
                </div>
            </div>

        </div>

    )
}

export default PostDetails
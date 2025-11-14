import type { Metadata, ResolvingMetadata } from 'next'
import { getArticleMetadata, getArticleSlugs } from "@/actions/articles";
import PostDetailsClient from "@/components/home/posts/details-client";
import { Suspense } from 'react';
import { cacheLife } from 'next/cache';

type ArticleDetailProps = {
    params: Promise<{
        slug: string
    }>
}


export async function generateStaticParams() {
    const articles = await getArticleSlugs()
    return articles.map((article) => ({
        slug: article.slug,
    }))
}

export async function generateMetadata(
    { params }: ArticleDetailProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    'use cache'
    cacheLife('minutes')
    const slug = (await params).slug
    const post = await getArticleMetadata(slug)

    return {
        title: post.title,
        description: post.description,
        authors: {
            name: post.author,
        },
        openGraph: {
            images: post.image as string,
            url: post.url,
            publishedTime: post.publishedTime,
            title: post.title,
            description: post.description,
            type: "article",
            siteName: "Ministère des Finances",
            locale: "fr"
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: post.image as string,
            site: "@financesRDC",
        },
    }
}

export default async function ArticleDetail({ params }: ArticleDetailProps) {
    const { slug } = await params;

    return (
        <div className="container section">
            <Suspense fallback={<div className="container section">Chargement de l'article...</div>}>
                <PostDetailsClient slug={slug} />
            </Suspense>
        </div>
    )
}
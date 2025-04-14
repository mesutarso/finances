import type { Metadata, ResolvingMetadata } from 'next'
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { articleBySlugQuery } from "@/lib/react-query/articles/options";
import { getArticleMetadata } from "@/actions/articles";
import { getQueryClient } from "@/components/providers/react-query/client";
import PostDetails from "@/components/home/posts/details";
import { notFound } from "next/navigation";

type ArticleDetailProps = {
    params: Promise<{
        slug: string
    }>
}

export const dynamic = "force-dynamic";

export async function generateMetadata(
    { params }: ArticleDetailProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug


    const post = await getArticleMetadata(slug)

    return {
        title: post.title,
        description: post.description,
        authors: {
            name: post.author,
        },
        openGraph: {
            images: post.image,
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
            images: post.image,
            site: "@financesRDC",
        },
    }
}

async function ArticleDetail({ params }: ArticleDetailProps) {
    const { slug } = await params;
    if (!slug) {
        notFound()
    }
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(articleBySlugQuery(slug));
    const dehydratedState = dehydrate(queryClient);
    return (
        <div className="container section">
            <HydrationBoundary state={dehydratedState}>
                <PostDetails slug={slug} />
            </HydrationBoundary>
        </div>
    )
}

export default ArticleDetail
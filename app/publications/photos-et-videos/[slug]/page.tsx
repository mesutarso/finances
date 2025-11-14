import { getMediathequeSlugs } from "@/actions/mediatheques"
import EventDetailClient from "@/components/medias/event-detail-client"

type MediathequePageDetailProps = {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const mediatheques = await getMediathequeSlugs()
    return mediatheques.map((mediatheque) => ({
        slug: mediatheque.slug,
    }))
}

export default async function MediathequePageDetail({ params }: MediathequePageDetailProps) {
    const { slug } = await params

    return (
        <div className="container section">
            <EventDetailClient slug={slug} />
        </div>
    )
}
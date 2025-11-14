import { getMediathequeBySlug } from "@/actions/mediatheques"

import { EventDetail } from "@/components/medias/event-detail"


type MediathequePageDetailProps = {
    params: Promise<{
        slug: string
    }>
}

async function MediathequePageDetail({ params }: MediathequePageDetailProps) {
    const { slug } = await params
    const mediatheque = await getMediathequeBySlug(slug)
    return (
        <div className="container section">

            {/* @ts-ignore */}
            <EventDetail event={mediatheque} />
        </div>
    )
}

export default MediathequePageDetail
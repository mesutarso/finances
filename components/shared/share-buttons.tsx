'use client'
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton, TwitterIcon, TwitterShareButton, TelegramIcon, TelegramShareButton, EmailIcon, EmailShareButton, LinkedinIcon, LinkedinShareButton } from 'next-share'


type Props = {
    title: string,
    url: string
}

function ShareButtons({ title, url }: Props) {
    return (
        <div className='flex gap-2'>
            <FacebookShareButton url={url} quote={title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton url={url} title={title}>
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <TelegramShareButton url={url} title={title}>
                <TelegramIcon size={32} round />
            </TelegramShareButton>
            <EmailShareButton url={url} title={title}>
                <EmailIcon size={32} round />
            </EmailShareButton>
            <LinkedinShareButton url={url} title={title}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>

        </div>
    )
}

export default ShareButtons
// dynamic routes will not cache
import {
    getContent,
    getContentByID,
    getNowAsLocalTimeString,
} from '@/utils/cache'
import { BlockTypes } from '@/utils/constants'
import { Block } from 'global'
import Image from 'next/image'

interface AxiosPageProps {
    params: {
        contentId: string
    }
}

export default async function Page(props: AxiosPageProps) {
    const { contentId } = props.params
    const topic = await getContentByID(contentId)

    return (
        <main className="relative max-w-4xl">
            <span className="text-xs font-normal absolute top-1 left-1">
                Built @ {getNowAsLocalTimeString()}
            </span>
            <article className="flex flex-1 items-center justify-center flex-col gap-4 p-8 relative">
                {topic.primary_image ? (
                    <Image
                        height={500}
                        width={500}
                        src={topic.primary_image.base_image_url}
                        alt={topic.headline}
                    />
                ) : null}
                <section>
                    <h1 className="text-4xl mb-8">{topic.headline}</h1>
                    {parseBlocks(topic.blocks.blocks)}
                </section>
            </article>
        </main>
    )
}

function parseBlocks(blocks: Block[]) {
    return blocks.map((block) => {
        switch (block.type) {
            case BlockTypes.H2:
                return (
                    <h2 key={block.key} className={'py-2 text-2xl'}>
                        {block.text}
                    </h2>
                )
            case BlockTypes.LI:
                return (
                    <li key={block.key} className={'pb-2'}>
                        {block.text}
                    </li>
                )
            case BlockTypes.KEEP_READING:
                return
            default:
                return (
                    <p key={block.key} className={'pb-2'}>
                        {block.text}
                    </p>
                )
        }
    })
}

export async function generateStaticParams() {
    const content = await getContent()

    return content.results.map((id) => ({
        contentId: id,
    }))
}

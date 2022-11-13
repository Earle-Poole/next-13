import Image from 'next/image'
import { getContentByID } from '@/utils/cache'

export default async function Page(props: {
  params: {
    contentId: string
  }
}) {
  const { contentId } = props.params
  const topic = await getContentByID(contentId)
  console.log('topic', topic)

  return (
    <main className='max-h-[calc(100%-2.125rem)] overflow-auto'>
      <section className='max-w-7xl flex flex-1 items-center justify-center flex-col gap-4 p-4 relative'>
        {topic.primary_image ? (
          <Image
            height={500}
            width={500}
            src={topic.primary_image.base_image_url}
            alt={topic.headline}
          />
        ) : null}
        <h1 className='text-4xl'>{topic.headline}</h1>
      </section>
    </main>
  )
}

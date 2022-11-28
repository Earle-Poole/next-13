import {
  getContent,
  getContentByID,
  getNowAsLocalTimeString,
} from '@/utils/cache'
import Image from 'next/image'

const Page = async () => {
  const content = await getContent()
  const topic = await getContentByID(content.results[0])

  return (
    <main className='relative'>
      <span className='text-xs font-normal absolute top-1 left-1'>
        Built @ {getNowAsLocalTimeString()}
      </span>
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

export default Page

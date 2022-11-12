import { getContentByID } from '@/utils/cache'

export default async function Page(props: {
  params: {
    contentId: string
  }
}) {
  const { contentId } = props.params
  const topic = await getContentByID(contentId)

  return (
    <div className='w-full flex flex-1 items-center justify-center flex-col gap-4 max-w-7xl p-4'>
      <h1 className='text-4xl'>{topic.headline}</h1>
    </div>
  )
}

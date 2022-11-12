import { asyncComponent } from '@/utils/lib'
import { getContentByID } from '@/utils/cache'

interface PageProps {
  params: {
    contentId: string
  }
  searchParams: {}
}

const Page = asyncComponent(async (props: PageProps) => {
  const { contentId } = props.params
  const topic = await getContentByID(contentId)

  return (
    <div className='w-full flex flex-1 items-center justify-center flex-col gap-4 max-w-7xl p-4'>
      <h1 className='text-4xl'>{topic.headline}</h1>
    </div>
  )
})

export default Page

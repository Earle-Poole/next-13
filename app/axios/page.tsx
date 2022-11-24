import { getNowAsLocalTimeString } from '@/utils/cache'

const Page = () => {
  return (
    <div className='flex flex-1 items-center justify-center flex-col gap-4 relative'>
      <span className='text-xs font-normal absolute top-1 left-1'>
        Built @ {getNowAsLocalTimeString()}
      </span>
      Select a story from the left
    </div>
  )
}

export default Page

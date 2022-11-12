import Link from 'next/link'
import { getNowAsLocalTimeString } from '../../../../utils/cache'

const SectionOne = () => {
  return (
    <section className='flex items-center flex-1 gap-4'>
      <Link href='/'>
        <button className='bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded'>
          Home
        </button>
      </Link>
      <span className='text-xs font-normal'>
        Built @ {getNowAsLocalTimeString()}
      </span>
    </section>
  )
}

export default SectionOne

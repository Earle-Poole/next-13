import Link from 'next/link'

const Header = () => {
  const now = new Date()

  return (
    <nav className='border-4 border-slate-800 bg-slate-700 min-h-[4rem] max-h-[4rem] flex text-xl font-semibold gap-4 p-2 mb-8'>
      <section className='flex items-center flex-1 gap-4'>
        <Link href='/'>
          <button className='bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded'>
            Home
          </button>
        </Link>
        <span className='text-xs font-normal'>
          Built @ {now.toLocaleTimeString()}
        </span>
      </section>
      <section className='flex-1 border-2 border-red-600'></section>
      <section className='flex-1 border-2 border-red-600'></section>
      <section className='flex-1 border-2 border-red-600'></section>
      <section className='flex-1 border-2 border-red-600'></section>
    </nav>
  )
}

export default Header

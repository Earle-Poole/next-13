import SectionOne from './Header.SectionOne'

const Header = () => {
  return (
    <nav className='border-4 border-slate-800 bg-slate-700 min-h-[4rem] max-h-[4rem] flex text-xl font-semibold gap-4 p-2 mb-8'>
      <SectionOne />
      <section className='flex-1 border-2 border-red-600'></section>
      <section className='flex-1 border-2 border-red-600'></section>
      <section className='flex-1 border-2 border-red-600'></section>
    </nav>
  )
}

export default Header

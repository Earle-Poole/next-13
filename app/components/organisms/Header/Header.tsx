import SectionOne from './Header.SectionOne'
import SectionThree from './Header.SectionThree'
import SectionTwo from './Header.SectionTwo'

const Spacer = () => {
  return <div className="min-h-[4rem] max-h-[4rem]"></div>
}

const Header = () => {
  return (
    <>
      <nav className="border-4 border-slate-800 bg-slate-700 min-h-[4rem] max-h-[4rem] flex text-xl font-semibold md:gap-4 p-2 fixed top-0 left-0 right-0 z-50">
        <SectionOne />
        <SectionTwo />
        <SectionThree />
      </nav>
      <Spacer />
    </>
  )
}

export default Header

'use client'

import { usePathname } from 'next/navigation'

const SectionTwo = () => {
  const pathname = usePathname()

  const title = parsePathForTitle(String(pathname))
  return (
    <section className='flex items-center flex-1 gap-4 justify-center text-3xl'>
      {title}
    </section>
  )
}

export default SectionTwo

const titleByPathName = new Map([
  ['/axios', 'Axios'],
  ['/pokemon', 'Pokémon'],
])

const parsePathForTitle = (pathname: string) => {
  let title = ''
  titleByPathName.forEach((value, key) => {
    if (!title && pathname.includes(key)) {
      title = value
    }
  })

  return title || 'Home'
}

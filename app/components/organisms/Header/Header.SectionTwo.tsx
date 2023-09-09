'use client'

import { usePathname } from 'next/navigation'

const SectionTwo = () => {
  const pathname = usePathname()
  const title = parsePathForTitle(String(pathname))

  return (
    <section className="flex flex-1 items-center justify-center gap-4 text-3xl">
      {title}
    </section>
  )
}

export default SectionTwo

const titleByPathName = new Map([
  ['/axios', 'Axios'],
  ['/pokemon', 'Pokémon'],
  ['/events', 'Event'],
  ['/chat', 'Chat'],
  ['/image', 'Image'],
])

const parsePathForTitle = (pathname: string) => {
  let str = 'Home'

  titleByPathName.forEach((value, key) => {
    if (pathname.includes(key)) {
      str = value
    }
  })

  return str
}

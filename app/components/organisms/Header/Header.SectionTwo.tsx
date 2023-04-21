'use client'

import { usePathname } from 'next/navigation'

const SectionTwo = () => {
    const pathname = usePathname()
    const title = parsePathForTitle(String(pathname))

    return (
        <section className="flex items-center flex-1 gap-4 justify-center text-3xl">
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

import Button from './components/atom/Button'
import Link from 'next/link'
import { getPokemonList } from '@/utils/cache'

const pages = [
  { href: '/axios', title: 'Axios' },
  { href: '/pokemon', title: 'Pokemon' },
  { href: '/events', title: 'Events' },
  { href: '/chat', title: 'Chat' },
  { href: '/image', title: 'Image' },
  { href: '/gravity', title: 'Gravity' }
]

const Page = async () => {
  await getPokemonList()

  return (
    <div className="w-screen flex flex-1 items-center flex-col gap-4 p-8">
      {pages.map(({ href, title }) => (
        <Link href={href} key={title}>
          <Button title={title}>{title}</Button>
        </Link>
      ))}
    </div>
  )
}

export default Page

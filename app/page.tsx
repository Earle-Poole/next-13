import Button from './components/atom/Button'
import Link from 'next/link'
import { getPokemonList } from '@/utils/cache'

const Page = async () => {
  await getPokemonList()

  return (
    <div className='w-screen flex flex-1 items-center justify-center flex-col gap-4 p-8'>
      <Link href='/axios'>
        <Button title='Axios'>Axios</Button>
      </Link>
      <Link href='/pokemon'>
        <Button title='Pokemon'>Pokémon</Button>
      </Link>
    </div>
  )
}

export default Page

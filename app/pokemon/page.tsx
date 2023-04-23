import PokemonInput from '@/components/atom/PokemonInput'
import PokemonButton from '@/components/molecules/PokemonButton'
import { getPokemonList } from '@/utils/cache'

export const metadata = {
  title: 'Pokemon - Next 13',
}

const Page = async () => {
  const pokemonList = await getPokemonList()

  return (
    <div className="w-screen flex flex-1 items-center justify-center flex-col gap-4 p-8">
      <PokemonInput />
      <PokemonButton pokemonList={pokemonList} />
    </div>
  )
}

export default Page

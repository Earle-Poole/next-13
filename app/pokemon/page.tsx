import PokemonButton from '@/components/molecules/PokemonButton'
import PokemonInput from '@/components/atom/PokemonInput'
import { getPokemonList } from '@/utils/cache'
import { getRandomPokemon } from '@/utils/lib'

export const metadata = {
  title: 'Pokemon - Next 13',
}

const Page = async () => {
  const pokemonList = await getPokemonList()
  const randomPokemon = getRandomPokemon(pokemonList)

  return (
    <div className="w-screen flex flex-1 items-center justify-center flex-col gap-4 p-8">
      <PokemonInput />
      <PokemonButton pokemon={randomPokemon} />
    </div>
  )
}

export default Page

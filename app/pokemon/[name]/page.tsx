import { getPokemonByName, getRandomPokemon } from '@/utils/lib'
import PokemonButton from '@/components/molecules/PokemonButton'
import PokemonCard from '@/components/organisms/PokemonCard'
import { WithPageProps } from '@/app/types'
import { getPokemonList } from '@/utils/cache'

export default async function Page(props: WithPageProps<{ name: string }>) {
  const {
    params: { name },
  } = props
  const pokemon = await getPokemonByName(name)
  const pokemonList = await getPokemonList()
  const randomPokemon = getRandomPokemon(pokemonList)
  return (
    <div className='flex-1 flex justify-center items-center flex-col p-8'>
      <PokemonCard pokemon={pokemon} />
      <PokemonButton pokemon={randomPokemon} />
    </div>
  )
}

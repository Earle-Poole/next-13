import {
  getNowAsLocalTimeString,
  getPokemonByName,
  getPokemonList,
} from '@/utils/cache'
import PokemonButton from '@/components/molecules/PokemonButton'
import PokemonCard from '@/components/organisms/PokemonCard'
import { WithPageProps } from 'global'
import { getRandomPokemon } from '@/utils/lib'

export default async function Page(props: WithPageProps<{ name: string }>) {
  const {
    params: { name },
  } = props
  const pokemon = await getPokemonByName(name)
  const pokemonList = await getPokemonList()
  const randomPokemon = getRandomPokemon(pokemonList)
  return (
    <div className='flex-1 flex justify-center items-center flex-col p-8 relative'>
      <span className='text-xs font-normal absolute top-1 left-1'>
        Built @ {getNowAsLocalTimeString()}
      </span>
      <PokemonCard pokemon={pokemon} />
      <PokemonButton pokemon={randomPokemon} />
    </div>
  )
}

export async function generateStaticParams() {
  const preloadedPokemon = ['pikachu', 'charmander', 'squirtle', 'bulbasaur']

  return preloadedPokemon.map((name) => ({ name }))
}

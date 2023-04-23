import PokemonButton from '@/components/molecules/PokemonButton'
import PokemonCard from '@/components/organisms/PokemonCard'
import {
  getNowAsLocalTimeString,
  getPokemonByName,
  getPokemonList,
} from '@/utils/cache'

interface PokemonNamePageProps {
  params: { name: string }
}

const Page = async (props: PokemonNamePageProps): Promise<JSX.Element> => {
  const {
    params: { name },
  } = props
  const pokemon = await getPokemonByName(name)
  const pokemonList = await getPokemonList()
  return (
    <div className="flex-1 flex justify-center items-center flex-col p-8 relative">
      <span className="text-xs font-normal absolute top-1 left-1">
        Built @ {getNowAsLocalTimeString()}
      </span>
      <PokemonCard pokemon={pokemon} />
      <PokemonButton pokemonList={pokemonList} />
    </div>
  )
}

export default Page

export async function generateStaticParams(): Promise<
  Array<{
    name: string
  }>
> {
  const preloadedPokemon = ['pikachu', 'charmander', 'squirtle', 'bulbasaur']

  return preloadedPokemon.map((name) => ({ name }))
}

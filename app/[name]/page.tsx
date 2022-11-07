import { getPokemonByName, getPokemonList } from '../../utils/lib'
import PokemonButton from '../components/atom/PokemonButton'
import PokemonCard from '../components/organisms/PokemonCard'

export default async function Page({
  params: { name },
}: {
  params: { name: string }
}) {
  const pokemon = await getPokemonByName(name)
  const pokemonList = await getPokemonList()

  return (
    <div className='flex-1 flex justify-center items-center flex-col'>
      <PokemonCard pokemon={pokemon} />
      <PokemonButton pokemonList={pokemonList} />
    </div>
  )
}

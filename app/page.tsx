import { getPokemonList } from '../utils/lib'
import PokemonButton from './components/atom/PokemonButton'
import PokemonInput from './components/atom/PokemonInput'
const Page = async () => {
  const pokemonList = await getPokemonList()

  return (
    <div className='min-h-screen w-screen flex items-center justify-center flex-col gap-4'>
      <PokemonInput />
      <PokemonButton pokemonList={pokemonList} />
    </div>
  )
}

export default Page

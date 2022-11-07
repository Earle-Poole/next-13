import PokemonButton from './components/atom/PokemonButton'
import PokemonInput from './components/atom/PokemonInput'
import { getPokemonList } from '../utils/lib'

const Page = async () => {
  const pokemonList = await getPokemonList()

  return (
    <div className='w-screen flex flex-1 items-center justify-center flex-col gap-4'>
      <PokemonInput />
      <PokemonButton pokemonList={pokemonList} />
    </div>
  )
}

export default Page

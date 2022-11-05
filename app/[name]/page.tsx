import {
  getPokemonByName,
  getPokemonList,
  inchesToFeetAndInches,
} from '../../utils/lib'
import capitalize from 'lodash/capitalize'
import Image from 'next/image'
import PokemonButton from '../components/atom/PokemonButton'

export default async function Page({
  params: { name },
}: {
  params: { name: string }
}) {
  const pokemon = await getPokemonByName(name)
  const pokemonList = await getPokemonList()
  return (
    <div className='min-h-screen flex justify-center items-center flex-col'>
      <div className='flex flex-col mb-4 justify-center items-center'>
        <section className='flex'>
          {pokemon.sprites.back_default ? (
            <Image
              style={{ imageRendering: 'pixelated' }}
              src={pokemon.sprites.back_default}
              height='280'
              width='280'
              priority
              alt=''
            />
          ) : null}
          {pokemon.sprites.front_default ? (
            <Image
              style={{ imageRendering: 'pixelated' }}
              src={pokemon.sprites.front_default}
              height='280'
              width='280'
              priority
              alt=''
            />
          ) : null}
        </section>
        <h1 className='text-2xl font-bold'>{capitalize(pokemon.name)}</h1>
        <h2 className='text-xl font-bold'>
          Height: {inchesToFeetAndInches(Math.round(pokemon.height * 3.93701))}
        </h2>
        <h2 className='text-xl font-bold'>
          Weight: {Math.round(pokemon.weight * 0.220462)} lbs
        </h2>
        <h2 className='text-xl font-bold'>
          Type: {pokemon.types.map((t) => capitalize(t.type.name)).join(', ')}
        </h2>
      </div>
      <PokemonButton pokemonList={pokemonList} />
    </div>
  )
}

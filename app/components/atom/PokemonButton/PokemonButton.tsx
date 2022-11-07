'use client'
import Link from 'next/link'
import { NamedAPIResourceList } from '../../../types'

const PokemonButton = ({
  pokemonList,
}: {
  pokemonList: NamedAPIResourceList
}) => {
  const randomPokemon =
    pokemonList.results[Math.floor(Math.random() * pokemonList.results.length)]
  return (
    <Link href={randomPokemon.name}>
      <button
        title={randomPokemon.name}
        className='bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded'>
        Random Pokemon!
      </button>
    </Link>
  )
}

export default PokemonButton

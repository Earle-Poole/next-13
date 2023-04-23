'use client'
import { getRandomPokemon } from '@/utils/lib'
import type { NamedAPIResourceList } from 'global'
import Link from 'next/link'
import { FC } from 'react'
import Button from '../../atom/Button'

const PokemonButton: FC<{
  pokemonList: NamedAPIResourceList
}> = ({ pokemonList }) => {
  const randomPokemon = getRandomPokemon(pokemonList)
  return (
    <Link href={`/pokemon/${randomPokemon.name}`}>
      <Button title={randomPokemon.name}>Random Pokemon!</Button>
    </Link>
  )
}

export default PokemonButton

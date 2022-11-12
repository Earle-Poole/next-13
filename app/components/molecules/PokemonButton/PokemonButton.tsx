'use client'
import Button from '../../atom/Button'
import Link from 'next/link'
import { NamedAPIResource } from '../../../types'

const PokemonButton = ({ pokemon }: { pokemon: NamedAPIResource }) => {
  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <Button title={pokemon.name}>Random Pokemon!</Button>
    </Link>
  )
}

export default PokemonButton

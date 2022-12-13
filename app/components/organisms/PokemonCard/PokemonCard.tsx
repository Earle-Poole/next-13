'use client'
import { Pokemon } from 'global'
import PokemonImage from '@/components/molecules/PokemonImage'
import PokemonInfo from '@/components/molecules/PokemonInfo'
import { useEffect } from 'react'

const PokemonCard = (props: { pokemon: Pokemon | null }) => {
  const { pokemon } = props

  useEffect(() => {
    if (!pokemon) {
      throw new Error('Pokemon is null')
    }
  }, [pokemon])

  if (!pokemon) {
    return null
  }

  return (
    <div className='flex flex-col mb-4 justify-center items-center font-bold text-xl'>
      <section className='flex'>
        <PokemonImage pokemon={pokemon} />
      </section>
      <PokemonInfo pokemon={pokemon} />
    </div>
  )
}

export default PokemonCard

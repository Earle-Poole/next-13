'use client'
import {
  decimetersToFeetAndInches,
  hectogramsToPounds,
} from '../../../../utils/lib'
import Image from 'next/image'
import { Pokemon } from '../../../types'
import { capitalize } from 'lodash'
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

  const { front_default, back_default } = pokemon.sprites
  return (
    <div className='flex flex-col mb-4 justify-center items-center font-bold text-xl'>
      <section className='flex'>
        {back_default ? (
          <Image
            style={{ imageRendering: 'pixelated' }}
            src={back_default}
            height='280'
            width='280'
            priority
            alt=''
          />
        ) : null}
        {front_default ? (
          <Image
            style={{ imageRendering: 'pixelated' }}
            src={front_default}
            height='280'
            width='280'
            priority
            alt=''
          />
        ) : null}
      </section>
      <h1 className='text-2xl'>{capitalize(pokemon.name)}</h1>
      <h2>Height: {decimetersToFeetAndInches(pokemon.height)}</h2>
      <h2>Weight: {hectogramsToPounds(pokemon.weight)} lbs</h2>
      <h2>
        Type: {pokemon.types.map((t) => capitalize(t.type.name)).join(', ')}
      </h2>
    </div>
  )
}

export default PokemonCard

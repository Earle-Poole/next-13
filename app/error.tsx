'use client'
// Error pages must be client components

import { use, useEffect } from 'react'
import { ErrorPageProps } from './types'
import PokemonButton from './components/atom/PokemonButton'
import { getPokemonList } from '../utils/lib'

/**
 *
 * This is a page-level error handler
 */
const Error = ({ error, reset }: ErrorPageProps) => {
  const pokemonList = use(getPokemonList())
  useEffect(() => {
    // Log the error to Sentry, or similar
    console.log('The error: ', error)
  }, [error])

  return (
    <div className='w-screen flex flex-1 items-center justify-center flex-col gap-4'>
      <p>Something went wrong!</p>
      <button onClick={reset}>Reset error boundary</button>
      <div>
        <PokemonButton pokemonList={pokemonList} />
      </div>
    </div>
  )
}

export default Error

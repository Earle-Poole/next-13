'use client'

import { SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'

const POKEMON_NAME = 'pokemon-name'

type TargetType<T> = T & {
  [POKEMON_NAME]: HTMLInputElement
}

const PokemonInput = () => {
  const router = useRouter()
  const onSubmitHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as TargetType<typeof e.target>
    const inputValue = target[POKEMON_NAME].value.toLocaleLowerCase()
    const cleanInputValue = inputValue.replace(/[^a-z]/g, '')

    if (inputValue) {
      router.push('/pokemon/' + cleanInputValue)
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col gap-2'>
      <label htmlFor={POKEMON_NAME} className='text-lg font-bold'>
        Look up by name
      </label>
      <input className='text-black p-2 rounded' type='text' id={POKEMON_NAME} />{' '}
      <button
        className='bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded'
        type='submit'>
        Submit
      </button>
    </form>
  )
}

export default PokemonInput

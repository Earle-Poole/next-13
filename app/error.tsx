"use client"
// Error pages must be client components
// https://beta.nextjs.org/docs/routing/error-handling
import { use, useEffect } from "react"
import { ErrorPageProps } from "global"
import PokemonButton from "@/components/molecules/PokemonButton"
import { getPokemonList } from "@/utils/cache"
import { getRandomPokemon } from "@/utils/lib"

/**
 * This is a page-level error handler
 */
const Error = (props: ErrorPageProps) => {
  const { error, reset } = props
  const pokemonList = use(getPokemonList())
  const randomPokemon = getRandomPokemon(pokemonList)
  useEffect(() => {
    // Log the error to Sentry, or similar
    console.log("The error: ", error)
  }, [error])

  return (
    <div className="w-screen flex flex-1 items-center justify-center flex-col gap-4">
      <p>Something went wrong!</p>
      <button onClick={reset}>Reset error boundary</button>
      <div>
        <PokemonButton pokemon={randomPokemon} />
      </div>
    </div>
  )
}

export default Error

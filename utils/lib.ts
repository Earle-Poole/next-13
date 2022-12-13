import { NamedAPIResourceList } from 'global'

export function decimetersToFeetAndInches(decimeters: number) {
  const inches = Math.round(decimeters * 3.93701)
  const feet = Math.floor(inches / 12)
  const remainingInches = inches % 12
  return `${feet}'${remainingInches}"`
}

export function hectogramsToPounds(hectograms: number) {
  return Math.round(hectograms / 4.536)
}

export function isServer() {
  return typeof window === 'undefined'
}

/**
 * Retrieves a random Pokemon from a list of Pokemon.
 *
 * This function selects a random Pokemon from the provided list of Pokemon and returns it. The random Pokemon is selected by generating a random index within the range of the list and then returning the Pokemon at that index.
 *
z * @param {NamedAPIResourceList} pokemonList - A list of Pokemon.
 * @returns {NamedAPIResource} - A random Pokemon from the list.
 */
export function getRandomPokemon(pokemonList: NamedAPIResourceList) {
  const randomIndex = Math.floor(Math.random() * pokemonList.results.length)
  return pokemonList.results[randomIndex]
}

/**
 * This is a workaround for TypeScript to allow us to use async components within client components.
 */
export function asyncComponent<T, R>(
  // The function to wrap
  fn: (arg: T) => Promise<R>
): (arg: T) => R {
  // Return the wrapped function
  return fn as (arg: T) => R
}

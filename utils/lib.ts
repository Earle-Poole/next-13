import { NamedAPIResourceList, Pokemon } from 'global'
import { POKE_API_ROOT } from './constants'
import capitalize from 'lodash/capitalize'

export async function getPokemonByName(name: string): Promise<Pokemon | null> {
  const response = await fetch(POKE_API_ROOT + `/${name}`)
  if (response.status !== 200) {
    throw new Error(`Failed to fetch pokemon ${capitalize(name)}`)
  }
  return response.json()
}

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

export function getRandomPokemon(pokemonList: NamedAPIResourceList) {
  const randomIndex = Math.floor(Math.random() * pokemonList.results.length)
  return pokemonList.results[randomIndex]
}

/**
 * This is a workaround for TypeScript to allow us to use async components within client components.
 */
export function asyncComponent<T, R>(
  fn: (arg: T) => Promise<R>
): (arg: T) => R {
  return fn as (arg: T) => R
}

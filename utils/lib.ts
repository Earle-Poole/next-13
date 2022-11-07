import { NamedAPIResourceList, Pokemon } from '../app/types'
import { POKE_API_ROOT } from './constants'
import { cache } from 'react'

export async function getPokemonByName(name: string): Promise<Pokemon | null> {
  const res = await fetch(POKE_API_ROOT + `/${name}`)
  if (res.status !== 200) {
    throw new Error(`Failed to fetch pokemon ${name}`)
  }
  return res.json()
}

export const getPokemonList = cache(async (): Promise<NamedAPIResourceList> => {
  const response = await fetch(POKE_API_ROOT + '?limit=100000&offset=0', {
    next: { revalidate: 3600 },
  })

  return response.json()
})

export function decimetersToFeetAndInches(decimeters: number) {
  const inches = Math.round(decimeters * 3.93701)
  const feet = Math.floor(inches / 12)
  const remainingInches = inches % 12
  return `${feet}'${remainingInches}"`
}

export function hectogramsToPounds(hectograms: number) {
  return Math.round(hectograms / 4.536)
}

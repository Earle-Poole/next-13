import { NamedAPIResourceList, Pokemon } from '../app/types'
import { POKE_API_ROOT } from './constants'
import { cache } from 'react'
import capitalize from 'lodash/capitalize'

export async function getPokemonByName(name: string): Promise<Pokemon | null> {
  const response = await fetch(POKE_API_ROOT + `/${name}`)
  if (response.status !== 200) {
    throw new Error(`Failed to fetch pokemon ${capitalize(name)}`)
  }
  return response.json()
}

export const getPokemonList = cache(async (): Promise<NamedAPIResourceList> => {
  const response = await fetch(POKE_API_ROOT + '?limit=100000&offset=0')

  if (response.status !== 200) {
    throw new Error(`Failed to fetch pokemon list`)
  }

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

let localTime: string
export const getNowAsLocaleTimeString = cache(() => {
  if (!localTime) {
    const now = new Date()

    localTime = now.toLocaleTimeString('en-US', { timeZone: 'America/Chicago' })
  }

  return localTime
})

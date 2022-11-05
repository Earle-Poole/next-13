import { NamedAPIResourceList, Pokemon } from '../app/types'
import { POKE_API_ROOT } from './constants'

export async function getPokemonByName(name: string): Promise<Pokemon> {
  const res = await fetch(POKE_API_ROOT + `/${name}`)
  return res.json()
}

export async function getPokemonList(): Promise<NamedAPIResourceList> {
  const response = await fetch(POKE_API_ROOT + '?limit=100000&offset=0', {
    next: { revalidate: 3600 },
  })

  return response.json()
}

export function inchesToFeetAndInches(inches: number) {
  const feet = Math.floor(inches / 12)
  const remainingInches = inches % 12
  return `${feet}'${remainingInches}"`
}

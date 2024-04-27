import { NamedAPIResourceList } from 'global'
import { ChangeEventHandler } from 'react'

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
  return pokemonList.results[randomIndex] || null
}

/**
 * This is a workaround for TypeScript to allow us to use async components within client components.
 */
export function asyncComponent<T, R>(
  // The function to wrap
  fn: (arg: T) => Promise<R>,
): (arg: T) => R {
  // Return the wrapped function
  return fn as (arg: T) => R
}

/**
 * 
 * @returns A generated v4 UUID
 */
export function generateUUID() {
  return '3xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(
    /[x]/g,
    function (char) {
      const random16Bits = (Math.random() * 16) | 0
      const value = char === 'x' ? random16Bits : (random16Bits & 0x3) | 0x8
      return value.toString(16)
    },
  )
}

export const decodeBase64 = (data: string): string => {
  return atob(data)
}

export const encodeBase64 = (data: string): string => {
  return btoa(data)
}

export const onTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = ({
  target,
}) => {
  target.style.height = ''

  const targetComputedStyle = getComputedStyle(target, null)
  const lineHeight = parseInt(
    targetComputedStyle.getPropertyValue('line-height'),
    10,
  )
  const maxLines = 10
  const maxHeight = lineHeight * maxLines

  const scrollHeight = target.scrollHeight
  target.style.height = Math.min(scrollHeight, maxHeight) + 'px'
}

function dec2hex(dec: number) {
  return dec.toString(16).padStart(2, '0')
}

export const generateId = (len: number) => {
  const arr = new Uint8Array((len ?? 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

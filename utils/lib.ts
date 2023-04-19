import { NamedAPIResourceList } from "global"

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
  return typeof window === "undefined"
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
  fn: (arg: T) => Promise<R>
): (arg: T) => R {
  // Return the wrapped function
  return fn as (arg: T) => R
}

export function generateUUID() {
  return "3xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(
    /[x]/g,
    function (char) {
      const random16Bits = (Math.random() * 16) | 0
      const value = char === "x" ? random16Bits : (random16Bits & 0x3) | 0x8
      return value.toString(16)
    }
  )
}

export const decodeBase64 = (data: string): string => {
  return atob(data)
}

export const encodeBase64 = (data: string): string => {
  return btoa(data)
}

export const prePromptBuilder = (props: {
  persona: string
  skillLevel: string
}) => {
  const { persona, skillLevel } = props

  return ` I want you to act as an expert in the field most related to the topic of each of my requests. If I ask a medical question you will act as an expert in the field of medicine related to the question. If I make a programming request you will act as an expert in in the programming language I am using. Etc… Before responding to my request, first please enumerate all appropriate and relevant areas of expertise that will help you with my request and how they will impact your response.
   
   
   Before responding to each of my requests or messages I want you to write out your internal monologue going through your thought process for responding to my request. Please be extremely detailed about how you approaching answering. Enumerate and execute all of your step by step reasoning before delivering a response to my request at the very end.
   
   Here is my first request:
  `
}

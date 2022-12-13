import {
  GetContentsResponse,
  NamedAPIResourceList,
  Pokemon,
  Topic,
} from 'global'
import { POKE_API_ROOT } from './constants'
import { cache } from 'react'
import capitalize from 'lodash/capitalize'

/**
 * Fetches a list of Pokemon from a remote API and returns the list as a JavaScript object.
 *
 * @returns {Promise<NamedAPIResourceList>} A promise that resolves with the list of Pokemon.
 *
 * @throws {Error} If the request to the Pokemon API fails.
 */
export const getPokemonList = cache(async (): Promise<NamedAPIResourceList> => {
  const response = await fetch(POKE_API_ROOT + '?limit=100000&offset=0')

  if (response.status !== 200) {
    throw new Error('Failed to fetch pokemon list')
  }

  return response.json()
})

export const getNowAsLocalTimeString = cache(() => {
  const now = new Date()

  return `${now.toDateString()} ${now.toLocaleTimeString('en-US', {
    timeZone: 'America/Chicago',
  })} CST`
})

/**
 * This function fetches content from the Axios API and stores the result in cache.
 *
 * If the request is unsuccessful, it will throw an error with the URL of the failed request.
 *
 * The function returns the response in JSON format.
 */
export const getContent = cache(async (): Promise<GetContentsResponse> => {
  const url = 'https://api.axios.com/api/render/stream/content'
  const response = await fetch(url, { next: { revalidate: 60 } })

  if (response.status !== 200) {
    throw new Error(`Failed to fetch content from ${url}`)
  }

  return response.json()
})

/**
 * The getContentByID function is an async function that takes an ID as an argument, makes a request to the Axios API to fetch content with the specified ID, and returns a Promise that resolves with the fetched content.
 *
 * The function uses the cache function to cache the results of the request, so that if the function is called with the same ID multiple times, it will return the cached result instead of making a new request to the API. This can improve the performance of the function, as it avoids making unnecessary requests to the API.
 *
 * If the request to the API fails or the response has a non-200 status code, the function throws an error with a message that indicates the URL of the failed request.
 */
export const getContentByID = cache(async (id: string): Promise<Topic> => {
  const url = `https://api.axios.com/api/render/content/${id}`
  const response = await fetch(url)

  if (response.status !== 200) {
    throw new Error(`Failed to fetch content from ${url}`)
  }

  return response.json()
})

export async function getPokemonByName(name: string): Promise<Pokemon | null> {
  const response = await fetch(POKE_API_ROOT + `/${name}`)
  if (response.status !== 200) {
    throw new Error(`Failed to fetch pokemon ${capitalize(name)}`)
  }
  return response.json()
}

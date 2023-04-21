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

/**
 * Retrieves the current date and time as a string in the America/Chicago timezone.
 * @return {string} - The current date and time as a string in the America/Chicago timezone.
 */
export const getNowAsLocalTimeString = cache(() =>
    new Date().toLocaleTimeString('en-US', {
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        month: '2-digit',
        timeZone: 'America/Chicago',
        timeZoneName: 'short',
        year: '2-digit',
    })
)

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
 * Retrieves content by ID.
 * @param {string} id - The ID of the content to retrieve.
 * @return {Promise<Topic>} The content with the specified ID.
 */
export const getContentByID = cache(async (id: string): Promise<Topic> => {
    const url = `https://api.axios.com/api/render/content/${id}`
    const response = await fetch(url)

    if (response.status !== 200) {
        throw new Error(`Failed to fetch content from ${url}`)
    }

    return response.json()
})

/**
 * Retrieves a Pokemon by name.
 * @param {string} name - The name of the Pokemon to retrieve.
 * @return {Promise<Pokemon | null>} A promise that resolves with the Pokemon with the specified name, or null if not found.
 */
export async function getPokemonByName(name: string): Promise<Pokemon | null> {
    const response = await fetch(POKE_API_ROOT + `/${name}`)
    if (response.status !== 200) {
        throw new Error(`Failed to fetch pokemon ${capitalize(name)}`)
    }
    return response.json()
}

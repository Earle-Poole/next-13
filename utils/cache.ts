import { GetContentsResponse, NamedAPIResourceList, Topic } from 'global'
import { POKE_API_ROOT } from './constants'
import { cache } from 'react'

export const getPokemonList = cache(async (): Promise<NamedAPIResourceList> => {
  const response = await fetch(POKE_API_ROOT + '?limit=100000&offset=0')

  if (response.status !== 200) {
    throw new Error(`Failed to fetch pokemon list`)
  }

  return response.json()
})

export const getNowAsLocalTimeString = cache(() => {
  const now = new Date()

  return `${now.toDateString()} ${now.toLocaleTimeString('en-US', {
    timeZone: 'America/Chicago',
  })} CST`
})

export const getContent = cache(async (): Promise<GetContentsResponse> => {
  const url = 'https://api.axios.com/api/render/stream/content'
  const response = await fetch(url, { next: { revalidate: 60 } })

  if (response.status !== 200) {
    throw new Error(`Failed to fetch content from ${url}`)
  }

  return response.json()
})

export const getContentByID = cache(async (id: string): Promise<Topic> => {
  const url = `https://api.axios.com/api/render/content/${id}`
  const response = await fetch(url)

  if (response.status !== 200) {
    throw new Error(`Failed to fetch content from ${url}`)
  }

  return response.json()
})

import { NamedAPIResourceList } from '../app/types'
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

  return now.toLocaleTimeString('en-US', { timeZone: 'America/Chicago' })
})

interface GetContentsResponse {
  count: number
  next: string | null
  previous: string | null
  results: string[]
}
export const getContent = cache(async (): Promise<GetContentsResponse> => {
  const url = 'https://api.axios.com/api/render/stream/content'
  const response = await fetch(url)

  if (response.status !== 200) {
    throw new Error(`Failed to fetch content from ${url}`)
  }

  return response.json()
})

interface Author {
  username: string
  display_name: string
  subscription: null
}

export interface Topic {
  slug: string
  id: string
  headline: string
  seo_headline: string
  authors: Author[]
  byline_photo: string
  published_date: string
  last_published: string
  first_published: string
  primary_section: string
  cover_for_deep_dive: string
  deep_dive: string
  sections: {}[]
  primary_tag: {}
  tags: {}[]
  is_featured: boolean
  new_featured: boolean
  permalink: string
  amp_permalink: string
  primary_image?: {
    id: string
    alt_text: string
    blurred_data: string
    caption: { blocks: [][]; entityMap: [] }
    source: string
    base_image_url: string
    crops: { '1x1': {}[]; '4x3': {}[]; '16x9': {}[] }
    embed: boolean
    is_animated: boolean
  }
  social_image: null
  og_headline: string
  og_description: string
  rubric: null
  template: null
  promotion: null
  wordcount: number
  read_more_wordcount: number
  before_read_more_wordcount: number
  keep_reading_mins: string
  is_breaking_news: boolean
  topics: {}[]
  subtopics: {}[]
  audience: {}
  cross_promote_to: []
  include_on_site: boolean
  include_in_latest_stories: boolean
  homepage_unit_title: boolean
  needs_redirect: boolean
  is_paywalled: boolean
  blocks: {}
}
export const getContentByID = cache(async (id: string): Promise<Topic> => {
  const url = `https://api.axios.com/api/render/content/${id}`
  const response = await fetch(url)

  if (response.status !== 200) {
    throw new Error(`Failed to fetch content from ${url}`)
  }

  return response.json()
})

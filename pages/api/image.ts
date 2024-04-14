import { ImageModels, ImageSizes } from '@/components/stores/ImageStore'
import type { NextRequest } from 'next/server'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET,
})


const handler = async (req: NextRequest): Promise<Response> => {
  if (req.method !== 'POST') {
    return new Response('Invalid request method, please use POST', {
      status: 400,
    })
  }
  const body = await new Response(req.body).json()

  if (!('message' in body) || typeof body.message !== 'string') {
    return new Response('Missing message parameter', { status: 400 })
  }

  try {
    const size = typeof body.size === 'string' ? body.size : ImageSizes.SMALL
    const model = typeof body.model === 'string' ? body.model : ImageModels.DALL_E_2
    const image = await openai.images.generate({
      prompt: body.message,
      n: 1,
      size,
      response_format: 'url',
      model
    })

    const json = await image

    // TODO: Migrate to returning `json.data` as a whole, instead of
    // just the first item's URL, so that we can return multiple images
    // TODO: Return the size and model in the response for the UI to
    // label the fetched image
    const res = { url: json?.data?.[0]?.url ?? '' }

    return new Response(JSON.stringify(res), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    })
  } catch (error: any) {
    // TODO: Properly handle errors, pop off last user message, or add a message to the chat bot
    console.error(
      'Could not access OpenAI, please try again.\n\nError: ',
      error,
    )
    return new Response('Could not access OpenAI, please try again.', {
      status: 400,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}

export default handler

export const config = {
  runtime: 'edge',
}

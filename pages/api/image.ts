import { ImageSizes } from '@/utils/hooks/useImage'
import type { NextRequest } from 'next/server'
import { Configuration, OpenAIApi } from 'openai-edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET,
})
const openai = new OpenAIApi(configuration)

const handler = async (req: NextRequest) => {
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
    const image = await openai.createImage({
      prompt: body.message,
      n: 1,
      size: body.size || ImageSizes.SMALL,
      response_format: 'url',
    })

    const json = await image.json()

    // TODO: Migrate to returning `json.data` as a whole, instead of
    // just the first item's URL, so that we can return multiple images
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
      error
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

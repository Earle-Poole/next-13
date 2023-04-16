import { TextModelValues } from "@/components/stores/TextCompleteStore"
import type { NextRequest } from "next/server"
import { Configuration, OpenAIApi } from "openai-edge"
import { ChatModelValues } from "types/useChat.types"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET,
  organization: "org-oxy4ydBZDsiyT71nD4KiFVBC",
})
const openai = new OpenAIApi(configuration)

const validateRequest = (req: NextRequest) => {
  if (req.method !== "POST") {
    return new Response("Invalid request method, please use POST.", {
      status: 405,
    })
  }

  return null
}

const getRequestBody = async (req: NextRequest) => {
  const body = await new Response(req.body).json()

  if (!("model" in body) || typeof body.model !== "string") {
    return new Response("Missing model parameter", { status: 400 })
  }

  return body
}

const createCompletion = async (body: any) => {
  return await openai.createChatCompletion({
    model: body.model as ChatModelValues | TextModelValues,
    messages: body.messages,
    temperature: 0.6,
    stream: true,
  })
}

const handler = async (req: NextRequest) => {
  const invalidRequestResponse = validateRequest(req)
  if (invalidRequestResponse) return invalidRequestResponse

  const body = await getRequestBody(req)
  if (body instanceof Response) return body

  try {
    const completion = await createCompletion(body)

    return new Response(completion.body, {
      headers: HEADERS_STREAM,
    })
  } catch (error: any) {
    console.error(error)

    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    })
  }
}

export const config = {
  runtime: "edge",
}

export default handler

export const HEADERS_STREAM = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "text/event-stream;charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
  "X-Accel-Buffering": "no",
}

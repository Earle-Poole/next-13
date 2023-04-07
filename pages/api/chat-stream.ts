import { ChatModelValues } from "@/components/stores/ChatStore"
import { TextModelValues } from "@/components/stores/TextCompleteStore"
import { decodeBase64 } from "@/utils/lib"
import type { NextRequest } from "next/server"
import { Configuration, OpenAIApi } from "openai-edge"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET,
  organization: "org-oxy4ydBZDsiyT71nD4KiFVBC",
})
const openai = new OpenAIApi(configuration)

const handler = async (req: NextRequest) => {
  if (req.method !== "POST") {
    return new Response("Invalid request method, please use POST.", {
      status: 405,
    })
  }

  const body = await new Response(req.body).json()
  console.log("body: ", body)

  if (!("model" in body) || typeof body.model !== "string") {
    return new Response("Missing model parameter", { status: 400 })
  }

  const parsedBodyModel: ChatModelValues | TextModelValues = body.model

  try {
    const completion = await openai.createChatCompletion({
      model: parsedBodyModel,
      messages: body.messages,
      max_tokens: 64,
      temperature: 0,
      stream: true,
    })

    return new Response(completion.body, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/event-stream;charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
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

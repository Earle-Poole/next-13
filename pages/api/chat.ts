import { ChatModels } from "@/components/stores/ChatStore"
import {
  TextModelValues,
  TextModels,
} from "@/components/stores/TextCompleteStore"
import { decodeBase64, encodeBase64 } from "@/utils/lib"
import { NextApiRequest, NextApiResponse } from "next"
import { Configuration, OpenAIApi } from "openai"
import { OpenAIApi as EdgeOpenAIApi } from "openai-edge"
import { ChatModelValues } from "types/useChat"

export const config = {
  runtime: "edge",
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET,
  organization: "org-oxy4ydBZDsiyT71nD4KiFVBC",
})

const openai = new OpenAIApi(configuration)
const edgeopenai = new EdgeOpenAIApi(configuration)

/**
 * Handler function for the /api/chat route
 * @param req
 * @param res
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const enginesResponse = await openai.listEngines()
    const { data: enginesData } = enginesResponse

    return new Response(JSON.stringify(enginesData), { status: 200 })
  }

  const body = await new Response(req.body).json()
  const decodedData = decodeBase64(body.data)
  const parsedBody =
    typeof body.data === "string" ? JSON.parse(decodedData) : {}

  if (req.method !== "POST") {
    return new Response("Invalid request method, please use POST.", {
      status: 400,
    })
  }

  if (!("model" in parsedBody) || typeof parsedBody.model !== "string") {
    return new Response("Missing model parameter", { status: 400 })
  }

  const parsedBodyModel: ChatModelValues | TextModelValues = parsedBody.model
  try {
    const isTextCompletionRequest = Object.values(TextModels).includes(
      parsedBodyModel as TextModelValues
    )

    if (isTextCompletionRequest) {
      const textCompletionResponse = await (
        await edgeopenai.createCompletion({
          model: parsedBodyModel,
          prompt: "Respond to this prompt with a short story.",
          max_tokens: 2048,
          n: 1,
        })
      ).json()

      return new Response(JSON.stringify(textCompletionResponse), {
        status: 200,
      })
    }

    const isChatCompletionRequest = Object.values(ChatModels).includes(
      parsedBodyModel as ChatModelValues
    )

    if (isChatCompletionRequest) {
      const chatCompletionResponse = await (
        await edgeopenai.createChatCompletion({
          model: parsedBodyModel,
          temperature: 0.7,
          messages: parsedBody.messages,
        })
      ).json()

      const encrypted = encodeBase64(JSON.stringify(chatCompletionResponse))
      return new Response(encrypted, { status: 200 })
    }
  } catch (e) {
    // TODO: Properly handle errors, pop off last user message, or add a message to the chat bot
    console.error("Could not access OpenAI, please try again.\n\nError: ", e)
    return new Response("Could not access OpenAI, please try again.", {
      status: 500,
    })
  }
}

export default handler

import { decodeBase64, encodeBase64 } from "./../../utils/lib"
import { NextApiRequest, NextApiResponse } from "next"
import {
  Configuration,
  OpenAIApi,
  CreateCompletionRequest,
  CreateChatCompletionRequest,
} from "openai"

const configuration = new Configuration({
  organization: "org-oxy4ydBZDsiyT71nD4KiFVBC",
  apiKey: process.env.OPENAI_SECRET,
})

const openai = new OpenAIApi(configuration)

/**
 * Handler function for the /api/chat route
 * @param req
 * @param res
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const enginesResponse = await openai.listEngines()
    const { data: enginesData } = enginesResponse

    res.status(200).json(enginesData)
    return
  }

  const { body } = req
  const parsedBody =
    typeof body === "string"
      ? JSON.parse(decodeBase64(JSON.stringify(body)))
      : {}

  if (req.method !== "POST") {
    res.status(400).json({ error: "Invalid request method, please use POST." })
    return
  }

  if (!("model" in parsedBody) || typeof parsedBody.model !== "string") {
    res.status(400).json({ error: "Missing model parameter" })
    return
  }

  const parsedBodyModel: ChatModelValues | TextModelValues = parsedBody.model
  try {
    const isTextCompletionRequest = Object.values(TextModels).includes(
      parsedBodyModel as TextModelValues
    )

    if (isTextCompletionRequest) {
      const textCompletionResponse = await openai.createCompletion({
        model: parsedBodyModel,
        prompt: "Respond to this prompt with a short story.",
        max_tokens: 2048,
        n: 1,
      })
      const { data: textCompletionData } = textCompletionResponse
      console.log("textCompletionData", textCompletionData)
      res.status(200).json({ textCompletionData })
      return
    }

    const isChatCompletionRequest = Object.values(ChatModels).includes(
      parsedBodyModel as ChatModelValues
    )

    if (isChatCompletionRequest) {
      const chatCompletionResponse = await openai.createChatCompletion({
        model: parsedBodyModel,
        temperature: 0.7,
        messages: parsedBody.messages,
      })
      const { data: chatCompletionData } = chatCompletionResponse

      const encrypted = encodeBase64(JSON.stringify(chatCompletionData))
      res.status(200).json(encrypted)
      return
    }
  } catch (e) {
    // TODO: Properly handle errors, pop off last user message, or add a message to the chat bot
    console.error(
      "An error occurred while accessing OpenAI, please try again.\n\nError: ",
      e
    )
    res.status(500).json({ error: e })
  }
}

export default handler

// enum ChatModels {
//   GPT4 = "gpt-4-0314",
//   GPT4Legacy = "gpt-4",
//   GPTTurbo = "gpt-3.5-turbo-0301",
//   GPTTurboLegacy = "gpt-3.5-turbo",
// }
//
// enum TextModels {
//   DAVINCI = "text-davinci-003",
//   CURIE = "text-curie-001",
//   BABBAGE = "text-babbage-001",
//   ADA = "text-ada-001",
// }

const ChatModels = {
  GPT4: "gpt-4-0314",
  GPT4Legacy: "gpt-4",
  GPTTurbo: "gpt-3.5-turbo-0301",
  GPTTurboLegacy: "gpt-3.5-turbo",
} as const

const TextModels = {
  DAVINCI: "text-davinci-003",
  CURIE: "text-curie-001",
  BABBAGE: "text-babbage-001",
  ADA: "text-ada-001",
} as const

type ChatModelValues = typeof ChatModels[keyof typeof ChatModels]
type TextModelValues = typeof TextModels[keyof typeof TextModels]

export interface IChatCompletionRequest extends CreateChatCompletionRequest {
  model: ChatModelValues
}

export interface ITextCompletionRequest extends CreateCompletionRequest {
  model: TextModelValues
}
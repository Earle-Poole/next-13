import { decodeBase64 } from "./lib"
import { ITextCompletionRequest } from "@/components/stores/TextCompleteStore"
import { CreateChatCompletionResponse } from "openai"

export const sendChatCompletionRequest = async (
  data: string
): Promise<CreateChatCompletionResponse> => {
  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const text = await response.text()
  const decodedData = decodeBase64(text)
  return JSON.parse(decodedData)
}

export const sendTextCompletionRequest = async (
  props: ITextCompletionRequest
) => {
  // TODO
}

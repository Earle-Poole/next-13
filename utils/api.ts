import { CreateChatCompletionResponse } from "openai"
import { ITextCompletionRequest } from "./../pages/api/chat"

export const sendChatCompletionRequest = async (
  str: string
): Promise<CreateChatCompletionResponse> => {
  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify(str),
  })

  return JSON.parse(window.atob(await response.json()))
}

export const sendTextCompletionRequest = async (
  props: ITextCompletionRequest
) => {
  // TODO
}

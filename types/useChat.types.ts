import { ChatModels } from '@/components/stores/ChatStore'
import { CreateChatCompletionResponse, CreateChatCompletionResponseChoicesInner } from 'openai-edge'
import { ChatCompletionMessageParam } from 'openai/resources'

export type ChatModelValues = (typeof ChatModels)[keyof typeof ChatModels]

export interface IChatCompletionRequest {
  model: ChatModelValues
  messages: ChatCompletionMessageParam[]
}

export interface ExtendedCreateChatCompletionResponseChoicesInner
  extends CreateChatCompletionResponseChoicesInner {
  delta: { content?: string }
}
export interface ExtendedCreateChatCompletionResponse
  extends CreateChatCompletionResponse {
  choices: [ExtendedCreateChatCompletionResponseChoicesInner]
}

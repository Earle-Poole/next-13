import { ChatModels } from '@/components/stores/ChatStore'
import {
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
  CreateChatCompletionResponseChoicesInner,
} from 'openai'

export type ChatModelValues = (typeof ChatModels)[keyof typeof ChatModels]

export interface IChatCompletionRequest extends CreateChatCompletionRequest {
  model: ChatModelValues
}

export interface ExtendedCreateChatCompletionResponseChoicesInner
  extends CreateChatCompletionResponseChoicesInner {
  delta: { content?: string }
}
export interface ExtendedCreateChatCompletionResponse
  extends CreateChatCompletionResponse {
  choices: [ExtendedCreateChatCompletionResponseChoicesInner]
}

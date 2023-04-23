import { atomWithStorage } from 'jotai/utils'
import { CreateCompletionRequest } from 'openai'

interface TextCompleteStore {
  prompt: string
  response: string
  model: TextModelValues
}

export const TextModels = {
  DAVINCI: 'text-davinci-003',
  CURIE: 'text-curie-001',
  BABBAGE: 'text-babbage-001',
  ADA: 'text-ada-001',
} as const

export const defaultTextCompleteAtom: TextCompleteStore = {
  prompt: '',
  response: '',
  model: TextModels.DAVINCI,
}

export type TextModelValues = (typeof TextModels)[keyof typeof TextModels]

const textCompleteAtom = atomWithStorage<TextCompleteStore>(
  'textComplete',
  defaultTextCompleteAtom,
)

export default textCompleteAtom

export interface ITextCompletionRequest extends CreateCompletionRequest {
  model: TextModelValues
}

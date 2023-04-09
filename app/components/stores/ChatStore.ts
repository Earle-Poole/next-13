import { atomWithStorage } from "jotai/utils"
import { ChatCompletionResponseMessage } from "openai"
import { ChatModelValues } from "types/useChat"

interface ChatStoreType {
  messages: ChatCompletionResponseMessage[]
  model: ChatModelValues
  isWaiting: boolean
}
const CHAT_KEY = "chat"
export const ChatModels = {
  GPT4: "gpt-4-0314",
  GPT4Legacy: "gpt-4",
  GPTTurbo: "gpt-3.5-turbo-0301",
  GPTTurboLegacy: "gpt-3.5-turbo",
} as const

export const defaultChatAtom: ChatStoreType = {
  messages: [
    { role: "user", content: "Hello Chatbot! Let's see what you can do!" },
    {
      role: "assistant",
      content:
        "I'd be happy to show you what I can do. What would you like to talk about?",
    },
  ],
  model: ChatModels.GPT4,
  isWaiting: false,
}

// The default state should be a conversation with the chat bot. The first entry will be the user's initial prompt.
export const chatAtom = atomWithStorage<ChatStoreType>(
  CHAT_KEY,
  defaultChatAtom
)
chatAtom.onMount = () => {
  const fromStorage = localStorage.getItem(CHAT_KEY) ?? "{}"
  try {
    const possiblyInvalid = JSON.parse(fromStorage)
    if (
      !("model" in possiblyInvalid) ||
      !("messages" in possiblyInvalid) ||
      !("isWaiting" in possiblyInvalid)
    ) {
      localStorage.removeItem(CHAT_KEY)

      if (fromStorage !== "{}") {
        location.reload()
      }
    }
  } catch (e) {
    localStorage.removeItem(CHAT_KEY)
  }
}

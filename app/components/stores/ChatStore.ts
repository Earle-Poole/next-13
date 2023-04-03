import { atomWithStorage } from "jotai/utils"
import { ChatCompletionResponseMessage } from "openai"

// The default state should be a conversation with the chat bot. The first entry will be the user's initial prompt.
export const chatAtom = atomWithStorage<ChatCompletionResponseMessage[]>(
  "chat",
  [
    { role: "user", content: "Hello Chatbot! Let's see what you can do!" },
    {
      role: "assistant",
      content:
        "I'd be happy to show you what I can do. What would you like to talk about?",
    },
  ]
)

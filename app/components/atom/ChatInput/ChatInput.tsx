"use client"

import { useAtom } from "jotai"
import Button from "../Button"
import { chatAtom, defaultChatAtom } from "@/components/stores/ChatStore"
import { sendChatCompletionRequest } from "@/utils/api"
import { ChatCompletionRequestMessageRoleEnum } from "openai"
import { FormEventHandler } from "react"
import { IChatCompletionRequest } from "pages/api/chat"

const ChatInput = () => {
  const [chatMessages, setChatMessages] = useAtom(chatAtom)

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const form = new FormData(target)

    const message = form.get("message")

    if (!message) {
      return
    }

    const newMessages = [
      ...chatMessages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: message.toString(),
      },
    ]

    setChatMessages(newMessages)
    target.reset()

    const requestObject: IChatCompletionRequest = {
      messages: newMessages,
      model: "gpt-3.5-turbo",
    }

    const encrypted = window.btoa(JSON.stringify(requestObject))

    const res = await sendChatCompletionRequest(encrypted)

    const newMessagesWithChatResponse = [
      ...newMessages,
      res.choices[0].message!,
    ]

    // TODO: Handle when `res.choices[0].message` is undefined
    setChatMessages(newMessagesWithChatResponse)
  }

  const onClear = () => {
    setChatMessages(defaultChatAtom)
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2 w-full">
      <input
        placeholder="Send a message..."
        className="text-black p-2 rounded flex-1"
        name="message"
        type="text"
      />
      <Button type="submit">Send</Button>
      <Button type="button" onClick={onClear}>Clear</Button>
    </form>
  )
}

export default ChatInput

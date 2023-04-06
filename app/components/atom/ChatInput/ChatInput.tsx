"use client"

import { useAtom } from "jotai"
import Button from "../Button"
import {
  ChatModelValues,
  ChatModels,
  IChatCompletionRequest,
  chatAtom,
  defaultChatAtom,
} from "@/components/stores/ChatStore"
import { sendChatCompletionRequest } from "@/utils/api"
import {
  ChatCompletionRequestMessageRoleEnum,
  ChatCompletionResponseMessage,
} from "openai"
import { FormEventHandler, useEffect, useState } from "react"
import Select from "react-select"
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator"
import { encodeBase64 } from "@/utils/lib"

const ChatInput = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [{ messages, model, isWaiting }, setChatStore] = useAtom(chatAtom)

  const setChatMessages = (newMessages: ChatCompletionResponseMessage[]) => {
    setChatStore((prev) => ({ ...prev, messages: newMessages }))
  }

  const setChatModel = (model: ChatModelValues) => {
    setChatStore((prev) => ({ ...prev, model }))
  }

  const setIsWaiting = (isWaiting: boolean) => {
    setChatStore((prev) => ({ ...prev, isWaiting }))
  }

  const onModelChange = (
    selectedOption: {
      value: ChatModelValues
      label: ChatModelValues
    } | null
  ) => {
    if (!selectedOption) {
      return
    }
    const value = selectedOption.value
    setChatModel(value)
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const form = new FormData(target)

    const message = form.get("message")

    if (!message) {
      return
    }

    const newMessages = [
      ...messages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: message.toString(),
      },
    ]

    setChatMessages(newMessages)
    target.reset()

    const requestObject: IChatCompletionRequest = {
      messages: newMessages,
      model,
    }

    const encrypted = encodeBase64(JSON.stringify(requestObject))

    setIsWaiting(true)
    try {
      console.log("hit #1")
      const res = await sendChatCompletionRequest(encrypted)
      console.log("hit #2")

      if (!res.choices[0].message) {
        console.log("hit #3")
        throw new Error(
          "No message returned from OpenAI, please try again.\nres.choices[0].message was falsy."
        )
      }

      const newMessagesWithChatResponse = [
        ...newMessages,
        res.choices[0].message,
      ]
      console.log("hit #4")

      setChatMessages(newMessagesWithChatResponse)
    } catch (e) {
      console.error(
        "An error occurred while sending ChatCompletionRequest:\n",
        e
      )
    }
    setIsWaiting(false)
  }

  const onClear = () => {
    setChatMessages(defaultChatAtom.messages)
    if (isWaiting) {
      setIsWaiting(false)
    }
  }

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
  }, [])

  return (
    <form onSubmit={onSubmit} className="flex gap-2 w-full">
      {isMounted ? (
        <Select
          className="text-black min-w-[14rem] min-h-[2.75rem]"
          classNames={{
            control: () => "!min-h-[2.75rem]",
          }}
          menuPlacement="top"
          options={Object.values(ChatModels).map((chatModel) => ({
            value: chatModel,
            label: chatModel,
          }))}
          defaultValue={{ value: model, label: model }}
          onChange={onModelChange}
        />
      ) : (
        <div className="flex justify-center items-center min-w-[14rem] min-h-[2.75rem]">
          <LoadingIndicator />
        </div>
      )}
      <input
        placeholder="Send a message..."
        className="text-black p-2 rounded flex-1"
        name="message"
        type="text"
      />
      <Button type="submit">Send</Button>
      <Button type="button" onClick={onClear}>
        Clear
      </Button>
    </form>
  )
}

export default ChatInput

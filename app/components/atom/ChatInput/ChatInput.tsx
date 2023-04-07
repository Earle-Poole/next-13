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
import { FormEventHandler, useEffect, useRef, useState } from "react"
import Select from "react-select"
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator"
import { encodeBase64 } from "@/utils/lib"
import { fetchEventSource } from "@microsoft/fetch-event-source"
import { HEADERS_STREAM } from "pages/api/chat-stream"

class RetriableError extends Error {}
class FatalError extends Error {}

const ChatInput = () => {
  const answerNode = useRef<HTMLElement>(null)
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
      const ctrl = new AbortController()
      fetchEventSource("/api/chat-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestObject),
        openWhenHidden: true,
        signal: ctrl.signal,
        async onopen(response) {
          // TODO: Reset the answer node
          if (answerNode.current) {
            answerNode.current.innerText = ""
          }
          console.log("onopen")
          if (
            response.ok &&
            response.headers.get("content-type")?.replace(/ /g, "") ===
              HEADERS_STREAM["Content-Type"]
          ) {
            // The stream opened successfully
            return
          } else if (
            response.status >= 400 &&
            response.status < 500 &&
            response.status !== 429
          ) {
            // client-side errors are usually non-retriable:
            throw new FatalError()
          } else {
            throw new RetriableError()
          }
        },
        onmessage(msg) {
          // TODO: If the server emits an error message, throw an exception
          // so it gets handled by the onerror callback below:
          if (msg.event === "FatalError") {
            throw new FatalError(msg.data)
          }
          try {
            console.log("msg.data: ", msg.data)
          } catch (error) {
            console.log("aborting")
            ctrl.abort()
            // onClose()
          }
        },
        onclose() {
          // TODO: If the server closes the connection unexpectedly, retry:
          // throw new RetriableError()
          // onClose()
        },
        onerror(err: Error) {
          if (err instanceof Error) {
            console.log("onerror fatal", err)
            // rethrow to stop the operation
            // setAwaitingFirstToken(false)
            // setStreaming(false)
            // setError(`Something went wrong with the request`)
            // throw err
          } else {
            console.log("onerror other", err)
            // do nothing to automatically retry. You can also
            // return a specific retry interval here.
          }
        },
      })
      const res = await sendChatCompletionRequest(encrypted)

      if (!res.choices[0].message) {
        throw new Error(
          "No message returned from OpenAI, please try again.\nres.choices[0].message was falsy."
        )
      }

      const newMessagesWithChatResponse = [
        ...newMessages,
        res.choices[0].message,
      ]

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
      <div className="flex flex-1 flex-wrap gap-2">
        {isMounted ? (
          <Select
            className="text-black min-w-[13rem] min-h-[2.75rem]"
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
          <div className="flex justify-center items-center min-w-[13rem] min-h-[2.75rem]">
            <LoadingIndicator />
          </div>
        )}
        <input
          placeholder="Send a message..."
          className="text-black p-2 rounded flex-1"
          name="message"
          type="text"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="submit">Send</Button>
        <Button type="button" onClick={onClear}>
          Clear
        </Button>
      </div>
    </form>
  )
}

export default ChatInput

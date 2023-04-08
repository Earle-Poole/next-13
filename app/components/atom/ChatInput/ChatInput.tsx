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
import {
  ChatCompletionRequestMessageRoleEnum,
  ChatCompletionResponseMessage,
  CreateChatCompletionResponse,
  CreateChatCompletionResponseChoicesInner,
} from "openai"
import { FormEventHandler, useEffect, useState } from "react"
import Select from "react-select"
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator"
import { fetchEventSource } from "@microsoft/fetch-event-source"
import { HEADERS_STREAM } from "pages/api/chat-stream"
import { streamAtom } from "@/components/stores/StreamStore"

class RetriableError extends Error {}
class FatalError extends Error {}

interface ExtendedCreateChatCompletionResponseChoicesInner
  extends CreateChatCompletionResponseChoicesInner {
  delta: { content?: string }
}
interface ExtendedCreateChatCompletionResponse
  extends CreateChatCompletionResponse {
  choices: [ExtendedCreateChatCompletionResponseChoicesInner]
}
const ChatInput = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [{ messages, model, isWaiting }, setChatStore] = useAtom(chatAtom)
  const [streamResponse, setStreamResponse] = useAtom(streamAtom)
  const ctrl = new AbortController()

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

    setIsWaiting(true)
    try {
      fetchEventSource("/api/chat-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestObject),
        openWhenHidden: true,
        signal: ctrl.signal,
        async onopen(response) {
          setStreamResponse("")
          setIsWaiting(false)
          if (
            response.ok &&
            response.headers.get("content-type")?.replace(/ /g, "") ===
              HEADERS_STREAM["Content-Type"]
          ) {
            // The stream opened successfully
            console.log("Opening stream...")
            return
          }

          if (
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
          if (msg.data === "[DONE]") {
            return
          }
          try {
            const jsonData = JSON.parse(msg.data) as Omit<
              ExtendedCreateChatCompletionResponse,
              "usage"
            >
            const newContent = jsonData.choices[0].delta.content
            setStreamResponse((prev) => (newContent ? prev + newContent : prev))
          } catch (error) {
            console.log("Aborting stream...")
            ctrl.abort()
          }
        },
        onclose() {
          console.log("Closing stream...")
          setStreamResponse((prevStream) => {
            setChatMessages([
              ...newMessages,
              { role: "assistant", content: prevStream },
            ])
            return ""
          })
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
    } catch (e) {
      console.error(
        "An error occurred while sending ChatCompletionRequest:\n",
        e
      )
    }
  }

  const onClear = () => {
    setChatMessages(defaultChatAtom.messages)
    if (isWaiting) {
      setIsWaiting(false)
    }

    ctrl.abort()
  }

  // This will avoid server vs client mismatch
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

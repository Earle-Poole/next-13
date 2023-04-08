"use client"
import { useAtom } from "jotai"
import { chatAtom } from "@/components/stores/ChatStore"
import { lazy, useEffect, useRef, useState } from "react"
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator"
import { ChatCompletionResponseMessageRoleEnum } from "openai"
import { streamAtom } from "@/components/stores/StreamStore"
import MessageRenderer from "@/components/molecules/Message/Message"

const ChatOutput = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [{ messages, isWaiting }] = useAtom(chatAtom)
  const [streamResponse] = useAtom(streamAtom)
  const chatOutputRef = useRef<HTMLElement>(null)

  // This will avoid server vs client mismatch
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
  }, [isMounted])

  // This useEffect is to scroll to the bottom of the chat output when a new message is added
  useEffect(() => {
    const { current } = chatOutputRef
    if (current) {
      current.scrollTop = current.scrollHeight
    }
  }, [messages])

  return (
    <section
      ref={chatOutputRef}
      className="flex-1 overflow-auto max-h-[calc(100vh-15rem)] sm:max-h-[calc(100vh-12rem)]"
    >
      {isMounted ? (
        <>
          {messages.map((message) => (
            <MessageRenderer key={message.content} message={message} />
          ))}
          {streamResponse ? (
            <MessageRenderer
              message={{
                role: ChatCompletionResponseMessageRoleEnum.Assistant,
                content: streamResponse,
              }}
            />
          ) : null}
          {isWaiting ? (
            <div className="flex justify-center pt-10">
              <LoadingIndicator />
            </div>
          ) : null}
        </>
      ) : (
        <div className="flex justify-center pt-10">
          <LoadingIndicator />
        </div>
      )}
    </section>
  )
}

export default ChatOutput

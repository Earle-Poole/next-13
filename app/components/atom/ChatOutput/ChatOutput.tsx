"use client"
import { useAtom } from "jotai"
import { chatAtom } from "@/components/stores/ChatStore"
import capitalize from "lodash/capitalize"
import { useEffect, useRef, useState } from "react"
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator"

const ChatOutput = () => {
  // `isMounted` is used to prevent the component from rendering before the
  // `useEffect` hook has been called. This prevents the component from
  // rendering with default data on the server.
  const [isMounted, setIsMounted] = useState(false)
  const [{ messages, isWaiting }] = useAtom(chatAtom)
  const chatOutputRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
  }, [isMounted])

  useEffect(() => {
    const { current } = chatOutputRef
    if (current) {
      current.scrollTop = current.scrollHeight
    }
  }, [messages])

  return (
    <section
      ref={chatOutputRef}
      className="flex-1 overflow-auto max-h-[calc(100vh-12rem)]"
    >
      {isMounted ? (
        <>
          {messages.map((message) => (
            <div key={message.content}>
              <article className="pb-2">
                <label className="text-sm italic pb-1">
                  {capitalize(message.role)}:
                </label>
                <p>{message.content}</p>
              </article>
            </div>
          ))}
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

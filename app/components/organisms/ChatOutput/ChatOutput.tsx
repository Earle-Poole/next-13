"use client"
import { useAtom } from "jotai"
import { chatAtom } from "@/components/stores/ChatStore"
import { useEffect, useRef } from "react"
import LoadingIndicator from "../../atom/LoadingIndicator/LoadingIndicator"
import MessageRenderer from "@/components/molecules/MessageRenderer"
import useChat from "@/utils/hooks/useChat"
import StreamRenderer from "@/components/molecules/StreamRenderer"
import { streamAtom } from "@/components/stores/StreamStore"
import { ChatCompletionResponseMessageRoleEnum } from "openai"

const ChatOutput = () => {
  const { isMounted } = useChat()
  const [{ messages, isWaiting }] = useAtom(chatAtom)
  const [streamResponse] = useAtom(streamAtom)
  const chatOutputRef = useRef<HTMLElement>(null)

  // Scroll the window down if the scroll is at the bottom, and
  // a response is actively streaming
  useEffect(() => {
    const { current } = chatOutputRef
    if (current) {
      const fontSize = Number(
        window
          .getComputedStyle(current, null)
          .getPropertyValue("font-size")
          .split("px")[0]
      )
      const scrollLeewayByFontSize = (fontSize || 0) * 4
      const scrollHeightRequiredToAutoScroll =
        current.scrollHeight - current.clientHeight - scrollLeewayByFontSize

      if (current.scrollTop > scrollHeightRequiredToAutoScroll) {
        current.scrollTop = current.scrollHeight
      }
    }
  }, [streamResponse])

  // Scroll the window down when a new message is added
  useEffect(() => {
    const { current } = chatOutputRef
    if (current) {
      current.scrollTop = current.scrollHeight
    }
  }, [messages])

  return (
    <section
      ref={chatOutputRef}
      className="flex-1 overflow-auto max-h-[calc(100vh-28rem)] sm:max-h-[calc(100vh-16rem)]"
    >
      {isMounted ? (
        <>
          {messages.length > 0 ? (
            messages.map((message) =>
              message.role !== ChatCompletionResponseMessageRoleEnum.System ? (
                <MessageRenderer key={message.content} message={message} />
              ) : null
            )
          ) : (
            <div className="flex justify-center italic">
              Send a message to get started...
            </div>
          )}
          <StreamRenderer />
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

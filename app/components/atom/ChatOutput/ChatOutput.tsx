"use client"
import { useAtom } from "jotai"
import { chatAtom } from "@/components/stores/ChatStore"
import capitalize from "lodash/capitalize"
import { lazy, useEffect, useRef, useState } from "react"
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator"
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism"
import classNames from "classnames"
import { ChatCompletionResponseMessageRoleEnum } from "openai"

const ReactMarkdown = lazy(() => import("react-markdown"))
const SyntaxHighlighter = lazy(
  () => import("react-syntax-highlighter/dist/esm/prism")
)

const ChatOutput = () => {
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
              <article
                className={classNames(
                  "px-4 py-2 rounded mr-4 mb-2 [&>p]:mb-2",
                  {
                    "bg-white/10":
                      message.role ===
                      ChatCompletionResponseMessageRoleEnum.Assistant,
                  }
                )}
              >
                <label className="text-sm italic mb-4">
                  {capitalize(message.role)}:
                </label>
                <ReactMarkdown
                  components={{
                    // This could use more components to fully support markdown
                    h1: ({ children }) => (
                      <h1 className="text-4xl font-normal leading-normal mt-0 mb-2">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-3xl font-normal leading-normal mt-0 mb-2">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-2xl font-normal leading-normal mt-0 mb-2">
                        {children}
                      </h3>
                    ),
                    code: ({ inline, children, className, node, ...props }) => {
                      const hasPosition = node.children[0].position
                      const match = /language-(\w+)/.exec(className || "")

                      return (!inline && match) || !hasPosition ? (
                        <SyntaxHighlighter
                          {...props}
                          children={String(children).replace(/\n$/, "")}
                          style={darcula}
                          className={classNames(
                            "w-fit rounded !m-4",
                            className
                          )}
                          language={match?.[1]}
                          PreTag="div"
                        />
                      ) : (
                        <code
                          {...props}
                          className={"bg-[rgb(43,43,43)] py-1 px-2 rounded"}
                        >
                          {children}
                        </code>
                      )
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
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

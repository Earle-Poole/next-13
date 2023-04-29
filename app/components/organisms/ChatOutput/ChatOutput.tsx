'use client'
import MessageRenderer from '@/components/molecules/MessageRenderer'
import StreamRenderer from '@/components/molecules/StreamRenderer'
import chatAtom from '@/components/stores/ChatStore'
import conversationListAtom from '@/components/stores/ConversationListStore'
import selectedConversationAtom from '@/components/stores/SelectedConversationStore'
import streamAtom from '@/components/stores/StreamStore'
import useChat from '@/utils/hooks/useChat'
import { useAtom } from 'jotai'
import { ChatCompletionResponseMessageRoleEnum } from 'openai'
import { useEffect, useRef } from 'react'
import LoadingIndicator from '../../atom/LoadingIndicator/LoadingIndicator'

const ChatOutput = () => {
  const [conversations] = useAtom(conversationListAtom)
  const [selectedConversationId] = useAtom(selectedConversationAtom)
  const [{ isWaiting }] = useAtom(chatAtom)
  const [streamResponse] = useAtom(streamAtom)

  const { isMounted } = useChat()
  const chatOutputRef = useRef<HTMLElement>(null)

  const currentConversation = conversations.find(
    (conversation) => conversation.id === selectedConversationId,
  )

  // Scroll the window down if the scroll is at the bottom, and
  // a response is actively streaming
  useEffect(() => {
    const { current } = chatOutputRef
    if (current) {
      const fontSize = Number(
        window
          .getComputedStyle(current, null)
          .getPropertyValue('font-size')
          .split('px')[0],
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
  }, [currentConversation?.messages])

  const hasMessages = currentConversation?.messages?.length ?? 0 > 0

  return (
    <section
      ref={chatOutputRef}
      className="flex-1 overflow-auto max-h-[calc(100vh-28rem)] sm:max-h-[calc(100vh-16rem)]"
    >
      {isMounted ? (
        <>
          {hasMessages ? (
            currentConversation?.messages.map((message) =>
              message.role !== ChatCompletionResponseMessageRoleEnum.System ? (
                <MessageRenderer key={message.content} message={message} />
              ) : null,
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

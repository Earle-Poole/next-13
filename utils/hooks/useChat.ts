import chatAtom, { defaultChatAtom } from '@/components/stores/ChatStore'
import selectedConversationAtom from '@/components/stores/SelectedConversationStore'
import streamAtom from '@/components/stores/StreamStore'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { useAtom } from 'jotai'
import { HEADERS_STREAM } from 'pages/api/chat-stream'
import {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  ChatModelValues,
  ExtendedCreateChatCompletionResponse,
  IChatCompletionRequest,
} from 'types/useChat.types'
import { generateId, onTextAreaChange } from '../lib'
// import useConversationList from './useConversationList'
import conversationListAtom from '@/components/stores/ConversationListStore'
import { cloneDeep } from 'lodash'
import usePrePrompt from './usePrePrompt'
import { ChatCompletionRequestMessageRoleEnum, ChatCompletionResponseMessage } from 'openai-edge'

function useChat() {
  const [isMounted, setIsMounted] = useState(false)
  const [selectedConversationId, setSelectedConversationId] = useAtom(
    selectedConversationAtom,
  )
  const [conversations, setConversations] = useAtom(conversationListAtom)
  // const { getConversationById, setConversationById } = useConversationList()
  const [{ model, isWaiting }, setChatStore] = useAtom(chatAtom)
  const [streamResponse, setStreamResponse] = useAtom(streamAtom)
  const { getPrePromptString } = usePrePrompt()
  const ctrl = useRef(new AbortController())
  const currentConversation = conversations.find(
    (c) => c.id === selectedConversationId,
  )

  const setChatMessages = (messages: ChatCompletionResponseMessage[]) => {
    setChatStore((prev) => ({ ...prev, messages }))
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
    } | null,
  ) => {
    if (!selectedOption) {
      return
    }
    const value = selectedOption.value
    setChatModel(value)
  }
  const updateCurrentConversation = (
    newMessages: ChatCompletionResponseMessage[],
  ) => {
    const updatedID = selectedConversationId || generateId(12)
    setSelectedConversationId(updatedID)

    const updatedIDIndex = conversations.findIndex((c) => c.id === updatedID)

    const clonedConversations = cloneDeep(conversations)
    if (updatedIDIndex === -1) {
      // HANDLE NEW CONVERSATION
      clonedConversations.push({
        id: updatedID,
        messages: newMessages,
        title: `Chat ${updatedID}`,
      })
      setConversations(clonedConversations)
      return
    }

    clonedConversations[updatedIDIndex].messages = newMessages
    setConversations(clonedConversations)
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const target = e.currentTarget as HTMLFormElement
    const inputElem = target.querySelector('[name="message"]')
    const form = new FormData(target)

    const message = form.get('message')

    if (!message) {
      return
    }

    const newMessages = [
      ...(currentConversation?.messages ?? []),
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: message.toString(),
      },
    ]

    const prevSystemMessage = newMessages.findIndex(
      (msg) => msg.role === ChatCompletionRequestMessageRoleEnum.System,
    )
    if (prevSystemMessage !== -1) {
      newMessages.splice(prevSystemMessage, 1)
    }

    const prePromptContent = getPrePromptString()
    if (prePromptContent) {
      newMessages.unshift({
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: prePromptContent,
      })
    }

    setChatMessages(newMessages)
    updateCurrentConversation(newMessages)
    target.reset()
    onTextAreaChange({
      target: inputElem,
    } as ChangeEvent<HTMLTextAreaElement>)

    const requestObject: IChatCompletionRequest = {
      messages: newMessages,
      model,
    }

    setIsWaiting(true)
    try {
      fetchEventSource('/api/chat-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestObject),
        openWhenHidden: true,
        signal: ctrl.current.signal,
        async onopen(response) {
          setStreamResponse('')
          setIsWaiting(false)
          if (ctrl.current.signal.aborted) {
            ctrl.current = new AbortController()
          }
          if (
            response.ok &&
            response.headers.get('content-type')?.replace(/ /g, '') ===
              HEADERS_STREAM['Content-Type']
          ) {
            console.log('Opening stream...')
            return
          }

          if (
            response.status >= 400 &&
            response.status < 500 &&
            response.status !== 429
          ) {
            // Non-retryable error
            throw new FatalError()
          } else {
            throw new RetriableError()
          }
        },
        onmessage(msg) {
          // TODO: If the server emits an error message, throw an exception
          // so it gets handled by the onerror callback below
          if (ctrl.current.signal.aborted) {
            throw new FatalError(ctrl.current.signal.reason)
          }
          if (msg.event === 'FatalError') {
            throw new FatalError(msg.data)
          }
          if (msg.data === '[DONE]') {
            return
          }
          try {
            const jsonData: Omit<
              ExtendedCreateChatCompletionResponse,
              'usage'
            > = JSON.parse(msg.data)
            const newContent = jsonData.choices[0].delta.content
            setStreamResponse((prev) => (newContent ? prev + newContent : prev))
          } catch (error) {
            console.log('Aborting stream...')
            ctrl.current.abort(error)
          }
        },
        onclose() {
          console.log('Closing stream...')
          setStreamResponse((prevStream) => {
            const updatedMessages: ChatCompletionResponseMessage[] = [
              ...newMessages,
              { role: 'assistant', content: prevStream },
            ]
            setChatMessages(updatedMessages)
            updateCurrentConversation(updatedMessages)

            return ''
          })
        },
        onerror(err: Error) {
          if (err instanceof FatalError) {
            console.log('onerror fatal', err)
            // rethrow to stop the operation
            throw err
          } else {
            console.log('onerror other', err)
            // do nothing to automatically retry. You can also
            // return a specific retry interval here.
          }
        },
      })
    } catch (e) {
      console.error(
        'An error occurred while sending ChatCompletionRequest:\n',
        e,
      )
    }
  }

  const onClear = () => {
    setChatMessages(defaultChatAtom.messages)
    updateCurrentConversation(defaultChatAtom.messages)
    if (isWaiting) {
      setIsWaiting(false)
    }

    if (streamResponse) {
      setStreamResponse('')
    }
    ctrl.current.abort('User cleared chat')
  }

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
  }, [isMounted])

  return {
    isMounted,
    model,
    onClear,
    onModelChange,
    onSubmit,
  }
}

class FatalError extends Error {}
class RetriableError extends Error {}

export default useChat

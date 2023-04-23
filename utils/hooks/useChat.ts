import chatAtom, { defaultChatAtom } from '@/components/stores/ChatStore'
import streamAtom from '@/components/stores/StreamStore'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { useAtom } from 'jotai'
import {
  ChatCompletionRequestMessageRoleEnum,
  ChatCompletionResponseMessage,
} from 'openai'
import { HEADERS_STREAM } from 'pages/api/chat-stream'
import { FormEventHandler, useEffect, useRef, useState } from 'react'
import {
  ChatModelValues,
  ExtendedCreateChatCompletionResponse,
  IChatCompletionRequest,
} from 'types/useChat.types'
import usePrePrompt from './usePrePrompt'

function useChat() {
  const [isMounted, setIsMounted] = useState(false)
  const [{ messages, model, isWaiting }, setChatStore] = useAtom(chatAtom)
  const [streamResponse, setStreamResponse] = useAtom(streamAtom)
  const { getPrePromptString } = usePrePrompt()
  const ctrl = useRef(new AbortController())

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

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const form = new FormData(target)

    const message = form.get('message')

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
    target.reset()

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
            setChatMessages([
              ...newMessages,
              { role: 'assistant', content: prevStream },
            ])
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

import MessageRenderer from '@/components/molecules/MessageRenderer'
import streamAtom from '@/components/stores/StreamStore'
import { useAtom } from 'jotai'
import { ChatCompletionResponseMessageRoleEnum } from 'openai-edge'

const StreamRenderer = () => {
  const [streamResponse] = useAtom(streamAtom)
  if (!streamResponse) {
    return null
  }

  return (
    <MessageRenderer
      message={{
        role: ChatCompletionResponseMessageRoleEnum.Assistant,
        content: streamResponse,
      }}
    />
  )
}

export default StreamRenderer

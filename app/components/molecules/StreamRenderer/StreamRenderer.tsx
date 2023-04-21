import { streamAtom } from '@/components/stores/StreamStore'
import { useAtom } from 'jotai'
import MessageRenderer from '@/components/molecules/MessageRenderer'
import { ChatCompletionResponseMessageRoleEnum } from 'openai'

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

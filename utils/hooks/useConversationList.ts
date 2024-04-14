import conversationListAtom from '@/components/stores/ConversationListStore'
import { useAtom } from 'jotai'
import { ChatCompletionMessageParam } from 'openai/resources'


const useConversationList = () => {
  const [conversations, setConversations] = useAtom(conversationListAtom)

  return {}
}

export default useConversationList

export interface Conversation {
  id: string
  title: string
  messages: ChatCompletionMessageParam[]
}

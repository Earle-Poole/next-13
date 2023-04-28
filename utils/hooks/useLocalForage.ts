import localforage from 'localforage'
import { ChatCompletionResponseMessage } from 'openai'

const useLocalForage = () => {
  const getConversations = async () => {
    const conversations = await localforage.getItem<Conversation[]>(
      'conversations',
    )
    return conversations || []
  }

  const getConversationById = async (id: string) => {
    const conversations = await getConversations()
    return conversations.find((c) => c.id === id)
  }

  const setConversationById = async (
    id: string,
    conversation: Conversation,
  ) => {
    const conversations = await getConversations()
    const index = conversations.findIndex((c) => c.id === id)
    if (index === -1) {
      conversations.push(conversation)
    } else {
      conversations[index] = conversation
    }
    await localforage.setItem('conversations', conversations)
  }

  const removeConversationById = async (id: string) => {
    const conversations = await getConversations()
    const index = conversations.findIndex((c) => c.id === id)
    if (index !== -1) {
      conversations.splice(index, 1)
    }
    await localforage.setItem('conversations', conversations)
  }

  const updateConversationTitleById = async (id: string, title: string) => {
    const conversations = await getConversations()
    const index = conversations.findIndex((c) => c.id === id)
    if (index !== -1) {
      conversations[index].title = title
    }
    await localforage.setItem('conversations', conversations)
  }

  return {
    getConversations,
    getConversationById,
    setConversationById,
    removeConversationById,
    updateConversationTitleById,
  }
}

export default useLocalForage

export interface Conversation {
  id: string
  title: string
  messages: ChatCompletionResponseMessage[]
}

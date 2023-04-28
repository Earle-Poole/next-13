'use client'

import ConversationItem from '@/components/molecules/ConversationItem/ConversationItem'
import NewConversation from '@/components/molecules/NewConversation/NewConversation'
import useLocalForage, { Conversation } from '@/utils/hooks/useLocalForage'
import { FC, useEffect, useState } from 'react'
import { ConversationListProps } from './ConversationList.types'

const mockConversations: Conversation[] = [
  { id: '1', title: 'Chat 1', messages: [] },
  { id: '2', title: 'Chat 2', messages: [] },
  { id: '3', title: 'Chat 3', messages: [] },
  { id: '4', title: 'Chat 4', messages: [] },
]

const ConversationList: FC<ConversationListProps> = () => {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null)
  const { getConversations } = useLocalForage()

  useEffect(() => {
    ;(async function () {
      const conversations = await getConversations()
      if (conversations.length > 0) {
        setConversations(conversations)
        setSelectedConversationId(conversations[0].id)
      }
    })()
  }, [getConversations])

  return (
    <aside className="flex flex-col border-4 border-t-0 border-slate-800 bg-slate-700 p-4 gap-4 min-w-[16rem] max-w-[16rem]">
      <strong>WIP</strong>
      <NewConversation setSelectedConversationId={setSelectedConversationId} />
      {mockConversations.map((props) => (
        <ConversationItem key={props.id} {...props} />
      ))}
    </aside>
  )
}

export default ConversationList

'use client'

import ConversationItem from '@/components/molecules/ConversationItem/ConversationItem'
import NewConversation from '@/components/molecules/NewConversation/NewConversation'
import conversationListAtom from '@/components/stores/ConversationListStore'
import { useAtom } from 'jotai'
import { FC, useEffect, useState } from 'react'
import { ConversationListProps } from './ConversationList.types'

const ConversationList: FC<ConversationListProps> = () => {
  const [conversations] = useAtom(conversationListAtom)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <aside className="flex flex-col border-4 border-t-0 border-slate-800 bg-slate-700 p-4 gap-4 min-w-[16rem] max-w-[16rem]">
      <strong>WIP</strong>
      <NewConversation />
      {isMounted &&
        conversations.map((props) => (
          <ConversationItem key={props.id} id={props.id} title={props.title} />
        ))}
    </aside>
  )
}

export default ConversationList

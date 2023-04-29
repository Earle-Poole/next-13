'use client'

import Button from '@/components/atom/Button/Button'
import conversationListAtom from '@/components/stores/ConversationListStore'
import selectedConversationAtom from '@/components/stores/SelectedConversationStore'
import { Conversation } from '@/utils/hooks/useConversationList'
import ConversationIcon from 'assets/ConversationIcon'
import TrashIcon from 'assets/TrashIcon'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import { cloneDeep } from 'lodash'
import { FC, MouseEventHandler } from 'react'

const ConversationItem: FC<Omit<Conversation, 'messages'>> = ({
  id,
  title,
}) => {
  const [selectedConversationId, setSelectedConversationId] = useAtom(
    selectedConversationAtom,
  )
  const [conversations, setConversations] = useAtom(conversationListAtom)
  const isSelected = id === selectedConversationId

  const onConversationClick = () => {
    setSelectedConversationId(id)
  }

  const onTrashClick: MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation()
    setSelectedConversationId(null)
    const conversationsClone = cloneDeep(conversations)
    const conversationIndex = conversationsClone.findIndex(
      (conversation) => conversation.id === id,
    )
    conversationsClone.splice(conversationIndex, 1)
    setConversations(conversationsClone)
  }

  return (
    <Button
      onClick={onConversationClick}
      className={classNames(
        'w-full flex items-center relative rounded-md bg-gray-500 h-16 p-4 gap-1 [&>span>svg:last-of-type]:hover:visible',
        {
          'border-2 border-gray-800 p-3.5': isSelected,
        },
      )}
    >
      <ConversationIcon fill="transparent" height="28px" width="28px" />
      <p className="truncate text-sm">{title}</p>
      <span onClick={onTrashClick} className="absolute right-2 z-10">
        <TrashIcon
          height="18"
          width="18"
          className="invisible bg-gray-500 shadow-md shadow-gray-500 fill-white hover:fill-gray-300"
        />
      </span>
    </Button>
  )
}

export default ConversationItem

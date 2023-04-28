'use client'

import Button from '@/components/atom/Button/Button'
import { FC } from 'react'
import { NewConversationProps } from './NewConversation.types'

const NewConversation: FC<NewConversationProps> = ({
  setSelectedConversationId,
}) => {
  return (
    <Button
      onClick={() => setSelectedConversationId(null)}
      className="w-full flex items-center rounded-md border-2 border-gray-500 h-16 p-4 gap-1"
    >
      <span className="font-bold text-lg">+</span>
      <p>New chat</p>
    </Button>
  )
}

export default NewConversation

'use client'

import Button from '@/components/atom/Button/Button'
import selectedConversationAtom from '@/components/stores/SelectedConversationStore'
import { useAtom } from 'jotai'
import { FC } from 'react'
// import { NewConversationProps } from './NewConversation.types'

const NewConversation: FC = () => {
  const [, setSelectedConversationId] = useAtom(selectedConversationAtom)
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

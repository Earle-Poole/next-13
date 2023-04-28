'use client'

import Button from '@/components/atom/Button/Button'
import ConversationIcon from 'assets/ConversationIcon'
import { FC } from 'react'
import { ConversationItemProps } from './ConversationItem.types'

const ConversationItem: FC<ConversationItemProps> = ({
  id,
  messages,
  title,
}) => {
  // const {} = props

  const onClick = () => {
    console.log('id: ', id)
  }

  return (
    <Button
      onClick={onClick}
      className="w-full flex items-center rounded-md bg-gray-500 h-16 p-4 gap-1"
    >
      <ConversationIcon fill="transparent" height="28px" width="28px" />
      <p className="truncate text-sm">
        Button Text Button Text Button Text Button Text
      </p>
    </Button>
  )
}

export default ConversationItem

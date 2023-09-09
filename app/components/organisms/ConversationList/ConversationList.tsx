'use client'

import Button from '@/components/atom/Button/Button'
import ConversationItem from '@/components/molecules/ConversationItem/ConversationItem'
import NewConversation from '@/components/molecules/NewConversation/NewConversation'
import conversationListAtom from '@/components/stores/ConversationListStore'
import ConversationIcon from 'assets/ConversationIcon'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import { throttle } from 'lodash'
import { FC, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import tailwindConfig from 'tailwind.config.js'
import resolveConfig from 'tailwindcss/resolveConfig'
import { ConversationListProps } from './ConversationList.types'

const fullConfig = resolveConfig(tailwindConfig)

const ConversationList: FC<ConversationListProps> = () => {
  const [conversations] = useAtom(conversationListAtom)
  const [isMounted, setIsMounted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  const navSectionElem = useRef<Element | null>(null)

  useEffect(() => {
    navSectionElem.current = document.querySelector('nav>section:first-of-type')
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const debouncedHandleResize = throttle<() => void>(function handleResize() {
      const newWidth = window.innerWidth
      if (fullConfig?.theme?.screens && 'lg' in fullConfig.theme.screens) {
        const lgWidth = parseInt(
          (fullConfig.theme.screens.lg as string).split('px')[0],
        )
        setIsExpanded(newWidth > lgWidth)
        return
      }
    }, 100)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  return (
    <aside
      className={classNames(
        'absolute z-10 border-4 border-t-0 border-slate-800 bg-slate-700 p-4 lg:relative lg:min-w-[16rem] lg:max-w-[16rem]',
        {
          'w-0 border-0 p-0': !isExpanded,
        },
      )}
    >
      <div className="flex flex-col gap-4 overflow-hidden">
        <NewConversation />
        {isMounted &&
          conversations.map((props) => (
            <ConversationItem
              key={props.id}
              id={props.id}
              title={props.title}
            />
          ))}
      </div>
      {navSectionElem.current &&
        createPortal(
          <Button
            onClick={() => setIsExpanded((prev) => !prev)}
            extendedClassName="lg:hidden"
          >
            <ConversationIcon fill="transparent" height={24} width={24} />
          </Button>,
          navSectionElem.current,
        )}
    </aside>
  )
}

export default ConversationList

import classNames from 'classnames'
import { capitalize } from 'lodash'
import {
  ChatCompletionResponseMessageRoleEnum,
} from 'openai-edge'
import { FC } from 'react'
import MarkdownWrapper from '../MarkdownWrapper/MarkdownWrapper'
import { ChatCompletionMessageParam } from 'openai/resources'

const MessageRenderer: FC<{ message: ChatCompletionMessageParam }> = ({
  message,
}) => {
  if (typeof message.content !== 'string') {
    return <article
      className={classNames('px-4 py-2 rounded mr-4 mb-2 [&>p]:mb-2', {
        'bg-white/10':
          message.role === ChatCompletionResponseMessageRoleEnum.Assistant,
      })}
    >
      <label className="text-sm italic mb-4">{capitalize(message.role)}:</label>
      <em>
        Chatting with images is not yet support, but coming soon!
      </em>
    </article>
  }
  return (
    <article
      className={classNames('px-4 py-2 rounded mr-4 mb-2 [&>p]:mb-2', {
        'bg-white/10':
          message.role === ChatCompletionResponseMessageRoleEnum.Assistant,
      })}
    >
      <label className="text-sm italic mb-4">{capitalize(message.role)}:</label>
      <MarkdownWrapper content={message.content ?? ''} />
    </article>
  )
}

export default MessageRenderer

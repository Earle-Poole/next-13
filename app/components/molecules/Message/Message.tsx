import classNames from "classnames"
import { capitalize } from "lodash"
import {
  ChatCompletionResponseMessage,
  ChatCompletionResponseMessageRoleEnum,
} from "openai"
import { FC } from "react"
import MarkdownWrapper from "../MarkdownWrapper/MarkdownWrapper"

const Message: FC<{ message: ChatCompletionResponseMessage }> = ({
  message,
}) => {
  return (
    <div key={message.content}>
      <article
        className={classNames("px-4 py-2 rounded mr-4 mb-2 [&>p]:mb-2", {
          "bg-white/10":
            message.role === ChatCompletionResponseMessageRoleEnum.Assistant,
        })}
      >
        <label className="text-sm italic mb-4">
          {capitalize(message.role)}:
        </label>
        <MarkdownWrapper content={message.content} />
      </article>
    </div>
  )
}

export default Message

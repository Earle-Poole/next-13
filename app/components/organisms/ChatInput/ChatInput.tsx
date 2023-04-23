'use client'

import Button from '@/components/atom/Button/Button'
import LoadingIndicator from '@/components/atom/LoadingIndicator/LoadingIndicator'
import { ChatModels } from '@/components/stores/ChatStore'
import useChat from '@/utils/hooks/useChat'
import { onTextAreaChange } from '@/utils/lib'
import Select from 'react-select'

const ChatInput = () => {
  const { model, onSubmit, isMounted, onModelChange, onClear } = useChat()
  return (
    <form onSubmit={onSubmit} className="flex gap-2 w-full">
      <div className="flex flex-1 flex-wrap gap-2 relative h-12">
        {isMounted ? (
          <Select
            className="text-black min-w-[13rem] min-h-[3rem]"
            classNames={{
              control: () => '!min-h-[3rem]',
            }}
            menuPlacement="top"
            options={Object.values(ChatModels).map((chatModel) => ({
              value: chatModel,
              label: chatModel,
            }))}
            defaultValue={{ value: model, label: model }}
            onChange={onModelChange}
          />
        ) : (
          <div className="flex justify-center items-center min-w-[13rem] min-h-[3rem]">
            <LoadingIndicator />
          </div>
        )}
        <div className="relative flex-1">
          <textarea
            placeholder="Send a message..."
            className={
              'text-black p-2 rounded absolute bottom-0 left-0 right-0 resize-none h-12'
            }
            name="message"
            onChange={onTextAreaChange}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="submit">Send</Button>
        <Button type="button" onClick={onClear}>
          Clear
        </Button>
      </div>
    </form>
  )
}

export default ChatInput

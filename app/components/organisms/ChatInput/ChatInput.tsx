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
      <div className="flex flex-1 flex-col lg:flex-row gap-2 relative">
        <div className="relative flex-1 min-w-[12rem] min-h-[3rem]">
          <textarea
            className="text-black rounded absolute bottom-0 left-0 right-0 resize-none placeholder:translate-x-2 placeholder:w-fit placeholder:translate-y-3 p-2"
            name="message"
            onChange={onTextAreaChange}
            style={{ height: '50px', lineHeight: '16px' }}
            placeholder="Send a message..."
          />
        </div>
        <div className="flex gap-2">
          {isMounted ? (
            <Select
              className="flex-1 text-black leading-[2.25rem]"
              defaultValue={{ value: model, label: model }}
              menuPlacement="top"
              onChange={onModelChange}
              options={Object.values(ChatModels).map((chatModel) => ({
                value: chatModel,
                label: chatModel,
              }))}
            />
          ) : (
            <div className="flex flex-1 justify-center items-center h-[3.125rem]">
              <LoadingIndicator />
            </div>
          )}
          <Button type="submit">Send</Button>
          <Button type="button" onClick={onClear}>
            Clear
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ChatInput

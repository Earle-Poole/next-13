'use client'

import { ChatModels } from '@/components/stores/ChatStore'
import Select from 'react-select'
import useChat from '@/utils/hooks/useChat'
import LoadingIndicator from '@/components/atom/LoadingIndicator/LoadingIndicator'
import Button from '@/components/atom/Button/Button'

const ChatInput = () => {
    const { model, onSubmit, isMounted, onModelChange, onClear } = useChat()

    return (
        <form onSubmit={onSubmit} className="flex gap-2 w-full">
            <div className="flex flex-1 flex-wrap gap-2">
                {isMounted ? (
                    <Select
                        className="text-black min-w-[13rem] min-h-[2.75rem]"
                        classNames={{
                            control: () => '!min-h-[2.75rem]',
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
                    <div className="flex justify-center items-center min-w-[13rem] min-h-[2.75rem]">
                        <LoadingIndicator />
                    </div>
                )}
                <input
                    placeholder="Send a message..."
                    className="text-black p-2 rounded flex-1"
                    name="message"
                    type="text"
                />
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

import ChatInput from '@/components/organisms/ChatInput'
import ChatOutput from '@/components/organisms/ChatOutput'
import PrePrompt from '@/components/organisms/PrePrompt/PrePrompt'

const Page = async () => {
  return (
    <div className="flex flex-[4] flex-col gap-4 px-8 py-4">
      <PrePrompt />
      <ChatOutput />
      <ChatInput />
    </div>
  )
}

export default Page

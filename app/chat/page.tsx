import ChatInput from "@/components/organisms/ChatInput"
import ChatOutput from "@/components/organisms/ChatOutput"
import PrePrompt from "@/components/organisms/PrePrompt/PrePrompt"

const Page = async () => {
  return (
    <div className="w-screen flex flex-1 flex-col gap-4 px-8 py-4 max-w-7xl">
      <PrePrompt />
      <ChatOutput />
      <ChatInput />
    </div>
  )
}

export default Page

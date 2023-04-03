import ChatInput from "@/components/atom/ChatInput"
import ChatOutput from "@/components/atom/ChatOutput/ChatOutput"

const Page = async () => {
  return (
    <div className="w-screen flex flex-1 items-center flex-col gap-4 p-8 max-w-4xl">
      <ChatOutput />
      <ChatInput />
    </div>
  )
}

export default Page

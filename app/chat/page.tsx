import ChatInput from "@/components/organisms/ChatInput"
import ChatOutput from "@/components/organisms/ChatOutput"

const Page = async () => {
  return (
    <div className="w-screen flex flex-1 flex-col gap-4 p-8 max-w-7xl">
      {/**Wrap these in a component that will handle the logic of `isWaiting`,
      instead of the atomWithStorage, maybe a template?*/}
      <ChatOutput />
      <ChatInput />
    </div>
  )
}

export default Page

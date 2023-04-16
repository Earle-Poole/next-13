import ImageInput from "@/components/organisms/ImageInput"
import ImageOutput from "@/components/organisms/ImageOutput/ImageOutput"

const Page = async () => {
  return (
    <div className="w-screen flex flex-1 flex-col gap-8 p-8 max-w-7xl">
      <ImageInput />
      <ImageOutput />
    </div>
  )
}

export default Page

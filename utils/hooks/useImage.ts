import imageAtom from "@/components/stores/ImageStore"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

export type ImageSizeValues = typeof ImageSizes[keyof typeof ImageSizes]
export const ImageSizes = {
  SMALL: "256x256",
  MEDIUM: "512x512",
  LARGE: "1024x1024",
} as const

const useImage = () => {
  const [{ url, isLoading }, setImageAtom] = useAtom(imageAtom)
  const [isMounted, setIsMounted] = useState(false)
  const [size, setSize] = useState<ImageSizeValues>(ImageSizes.SMALL)

  const setUrl = (url: string) => {
    setImageAtom((prev) => ({
      ...prev,
      url,
    }))
  }

  const setIsLoading = (isLoading: boolean) => {
    setImageAtom((prev) => ({
      ...prev,
      isLoading,
    }))
  }

  const onImageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const form = new FormData(target)

    const message = form.get("prompt")

    setIsLoading(true)
    const response = await fetch("/api/image", {
      method: "POST",
      body: JSON.stringify({
        message,
        size,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const json = await response.json()
    setUrl(json.url)
    setIsLoading(false)
  }

  const onSizeChange = (
    selectedOption: {
      value: ImageSizeValues
      label: ImageSizeValues
    } | null
  ) => {
    if (!selectedOption) {
      return
    }
    const value = selectedOption.value
    setSize(value)
  }

  useEffect(() => {
    if (!isMounted) setIsMounted(true)
  }, [])

  return {
    url,
    isMounted,
    isLoading,
    size,
    onImageSubmit,
    onSizeChange,
  }
}

export default useImage

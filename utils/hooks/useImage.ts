import imageAtom, { ImageModelValues, ImageSizeValues, ImageSizesByModel } from '@/components/stores/ImageStore'
import { useAtom } from 'jotai'
import { FormEvent, useEffect, useState } from 'react'

const useImage = () => {
  const [{ url, isLoading, size, model }, setImageAtom] = useAtom(imageAtom)
  const [isMounted, setIsMounted] = useState(false)

  const setSize = (size: ImageSizeValues) => {
    setImageAtom((prev) => ({
      ...prev,
      size,
    }))
  }
  const setModel = (model: ImageModelValues) => {
    setImageAtom((prev) => ({
      ...prev,
      model,
    }))
  }
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

  const onImageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const form = new FormData(target)

    const message = form.get('prompt')

    setIsLoading(true)
    const response = await fetch('/api/image', {
      method: 'POST',
      body: JSON.stringify({
        message,
        size,
        model,
      }),
      headers: {
        'Content-Type': 'application/json',
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
    } | null,
  ) => {
    if (!selectedOption) {
      return
    }
    const value = selectedOption.value
    setSize(value)
  }
  const onModelChange = (selectedOption: {
    value: ImageModelValues
    label: ImageModelValues
  } | null,) => {
    if (!selectedOption) {
      return
    }
    const value = selectedOption.value
    setModel(value)

    // If the current size is not supported by the new model, switch to the first supported size
    if (!ImageSizesByModel[value].includes(size)) {
      setSize(ImageSizesByModel[value][0])
    }
  }

  useEffect(() => {
    if (!isMounted) setIsMounted(true)
  }, [isMounted])

  return {
    url,
    isMounted,
    isLoading,
    model,
    size,
    onImageSubmit,
    onModelChange,
    onSizeChange,
  }
}

export default useImage

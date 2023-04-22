'use client'

import LoadingIndicator from '@/components/atom/LoadingIndicator/LoadingIndicator'
import imageAtom from '@/components/stores/ImageStore'
import { useAtom } from 'jotai'

const ImageOutput = () => {
  const [{ url, isLoading }] = useAtom(imageAtom)
  const image = url ? <img src={url} /> : null
  return (
    <section className="flex justify-center">
      {isLoading ? <LoadingIndicator /> : image}
    </section>
  )
}

export default ImageOutput

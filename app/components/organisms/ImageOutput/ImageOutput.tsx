'use client'

import LoadingIndicator from '@/components/atom/LoadingIndicator/LoadingIndicator'
import imageAtom from '@/components/stores/ImageStore'
import { useAtom } from 'jotai'
import Image from 'next/image'

const ImageOutput = () => {
  const [{ url, isLoading }] = useAtom(imageAtom)
  const image = url ? (
    <Image alt={'An AI generated image based on user input.'} src={url} />
  ) : null
  return (
    <section className="flex justify-center">
      {isLoading ? <LoadingIndicator /> : image}
    </section>
  )
}

export default ImageOutput

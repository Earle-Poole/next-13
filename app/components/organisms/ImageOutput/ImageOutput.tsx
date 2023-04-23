'use client'

import LoadingIndicator from '@/components/atom/LoadingIndicator/LoadingIndicator'
import imageAtom from '@/components/stores/ImageStore'
import { useAtom } from 'jotai'
import Image from 'next/image'

const ImageOutput = () => {
  const [{ url, isLoading, size }] = useAtom(imageAtom)
  const [height, width] = size.split('x')
  const image = url ? (
    <div className="">
      <Image
        alt={'An AI generated image based on user input.'}
        src={url}
        width={parseInt(width)}
        height={parseInt(height)}
      />
    </div>
  ) : null
  return (
    <section className="flex justify-center">
      {isLoading ? <LoadingIndicator /> : image}
    </section>
  )
}

export default ImageOutput

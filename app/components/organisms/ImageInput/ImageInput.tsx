'use client'

import Button from '@/components/atom/Button/Button'
import LoadingIndicator from '@/components/atom/LoadingIndicator/LoadingIndicator'
import useImage, { ImageSizes } from '@/utils/hooks/useImage'
import { FC } from 'react'
import Select from 'react-select'

const ImageInput: FC<{}> = () => {
  const { onImageSubmit, onSizeChange, isMounted, size } = useImage()

  return (
    <section>
      <form onSubmit={onImageSubmit} className="flex gap-2">
        {isMounted ? (
          <Select
            className="text-black min-w-[13rem] min-h-[2.75rem]"
            classNames={{
              control: () => '!min-h-[2.75rem]',
            }}
            menuPlacement="top"
            options={Object.values(ImageSizes).map((imageSize) => ({
              value: imageSize,
              label: imageSize,
            }))}
            defaultValue={{ value: size, label: size }}
            onChange={onSizeChange}
          />
        ) : (
          <div className="flex justify-center items-center min-w-[13rem] min-h-[2.75rem]">
            <LoadingIndicator />
          </div>
        )}
        <input
          placeholder="Enter your prompt..."
          className="text-black p-2 rounded flex-1"
          name="prompt"
          type="text"
        />
        <Button type="submit">Submit</Button>
      </form>
    </section>
  )
}

export default ImageInput

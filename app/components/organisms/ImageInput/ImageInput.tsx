'use client'

import Button from '@/components/atom/Button/Button'
import LoadingIndicator from '@/components/atom/LoadingIndicator/LoadingIndicator'
import { ImageModels, ImageSizesByModel } from '@/components/stores/ImageStore'
import useImage from '@/utils/hooks/useImage'
import { FC } from 'react'
import Select from 'react-select'

const ImageInput: FC = () => {
  const { onImageSubmit, onModelChange, onSizeChange, isMounted, size, model } = useImage()

  return (
    <section>
      <form onSubmit={onImageSubmit} className="flex gap-2 flex-col md:flex-row">
        {isMounted ? (<section className='flex gap-2'>
          <Select
            key={`image-size-${size}`}
            className="text-black min-w-[11rem] min-h-[2.75rem] flex-1"
            classNames={{
              control: () => '!min-h-[2.75rem]',
            }}
            menuPlacement="bottom"
            options={ImageSizesByModel[model].map((imageSize) => ({
              value: imageSize,
              label: imageSize,
            }))}
            defaultValue={{ value: size, label: size }}
            onChange={onSizeChange}
          />
          <Select
            className="text-black min-w-[11rem] min-h-[2.75rem] flex-1"
            classNames={{
              control: () => '!min-h-[2.75rem]',
            }}
            menuPlacement="bottom"
            options={Object.values(ImageModels).map((imageModel) => ({
              value: imageModel,
              label: imageModel,
            }))}
            defaultValue={{ value: model, label: model }}
            onChange={onModelChange} />
        </section>
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

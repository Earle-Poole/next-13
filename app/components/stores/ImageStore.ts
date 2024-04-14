import { atom } from 'jotai'
import OpenAI from 'openai'

export type ImageSizeValues = NonNullable<OpenAI.ImageGenerateParams['size']>
export type ImageModelValues = NonNullable<OpenAI.ImageGenerateParams['model']>

export const ImageModels = {
  DALL_E_2: 'dall-e-2',
  DALL_E_3: 'dall-e-3',
} as const

export const ImageSizes = {
  SMALL: '256x256',
  MEDIUM: '512x512',
  LARGE: '1024x1024',
  LARGE_PORTRAIT: '1024x1792',
  LARGE_LANDSCAPE: '1792x1024',
} as const

export const ImageSizesByModel: Record<NonNullable<ImageModelValues>, ImageSizeValues[]> = {
  [ImageModels.DALL_E_2]: [ImageSizes.SMALL, ImageSizes.MEDIUM, ImageSizes.LARGE],
  [ImageModels.DALL_E_3]: [
    ImageSizes.LARGE,
    ImageSizes.LARGE_PORTRAIT,
    ImageSizes.LARGE_LANDSCAPE,
  ],
} as const

interface IImageStoreType {
  isLoading: boolean
  url: string
  size: ImageSizeValues
  model: ImageModelValues
}

const imageAtom = atom<IImageStoreType>({
  isLoading: false,
  url: '',
  size: ImageSizes.SMALL,
  model: 'dall-e-2',
})

export default imageAtom

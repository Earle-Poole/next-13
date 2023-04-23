import { atom } from 'jotai'

export type ImageSizeValues = (typeof ImageSizes)[keyof typeof ImageSizes]
export const ImageSizes = {
  SMALL: '256x256',
  MEDIUM: '512x512',
  LARGE: '1024x1024',
} as const

interface IImageStoreType {
  isLoading: boolean
  url: string
  size: ImageSizeValues
}

const imageAtom = atom<IImageStoreType>({
  isLoading: false,
  url: '',
  size: ImageSizes.SMALL,
})

export default imageAtom

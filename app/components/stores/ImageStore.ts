import { atom } from 'jotai'

const imageAtom = atom({
    isLoading: false,
    url: '',
})

export default imageAtom

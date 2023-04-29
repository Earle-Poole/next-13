import { atom } from 'jotai'

const selectedConversationAtom = atom<string | null>(null)

export default selectedConversationAtom

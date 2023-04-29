import { Conversation } from '@/utils/hooks/useConversationList'
import { atomWithStorage } from 'jotai/utils'

const conversationListAtom = atomWithStorage<Conversation[]>(
  'conversations',
  [],
)

export default conversationListAtom

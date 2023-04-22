import {
  personaOptions,
  skillLevelOptions,
  toneOptions,
} from '@/utils/constants'
import { atomWithStorage } from 'jotai/utils'

const PREPROMPT_KEY = 'preprompt'

export type PersonaOptionValues =
  (typeof personaOptions)[keyof typeof personaOptions]
export type SkillLevelOptionValues =
  (typeof skillLevelOptions)[keyof typeof skillLevelOptions]
export type ToneOptionValues = (typeof toneOptions)[keyof typeof toneOptions]

interface IPrePromptStoreType {
  persona: PersonaOptionValues
  skillLevel: SkillLevelOptionValues
  tone: ToneOptionValues
}

const defaultPrePrompt: IPrePromptStoreType = {
  persona: personaOptions.None,
  tone: toneOptions.None,
  skillLevel: skillLevelOptions.None,
}
export const prePromptAtom = atomWithStorage<IPrePromptStoreType>(
  PREPROMPT_KEY,
  defaultPrePrompt
)
prePromptAtom.onMount = () => {
  const fromStorage = localStorage.getItem(PREPROMPT_KEY) ?? '{}'
  try {
    const possiblyInvalid = JSON.parse(fromStorage)
    if (
      !('persona' in possiblyInvalid) ||
      !('tone' in possiblyInvalid) ||
      !('skillLevel' in possiblyInvalid)
    ) {
      localStorage.removeItem(PREPROMPT_KEY)

      if (fromStorage !== '{}') {
        location.reload()
      }
    }
  } catch (e) {
    localStorage.removeItem(PREPROMPT_KEY)
  }
}

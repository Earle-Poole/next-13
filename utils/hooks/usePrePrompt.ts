import prePromptAtom, {
  PersonaOptionValues,
  SkillLevelOptionValues,
  ToneOptionValues,
} from '@/components/stores/PrePromptStore'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { SingleValue } from 'react-select'
import { skillLevelOptions } from '../constants'

const usePrePrompt = () => {
  const [prePrompt, setPrePrompt] = useAtom(prePromptAtom)
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
  }, [isMounted])
  const setTone = (e: SingleValue<ToneOptionValues>) => {
    if (!e) return
    setPrePrompt((prev) => ({ ...prev, tone: e }))
  }
  const setPersona = (e: SingleValue<PersonaOptionValues>) => {
    if (!e) return
    setPrePrompt((prev) => ({ ...prev, persona: e }))
  }
  const setSkillLevel = (e: SingleValue<SkillLevelOptionValues>) => {
    if (!e) return
    setPrePrompt((prev) => ({ ...prev, skillLevel: e }))
  }

  const getPrePromptString = () => {
    let str = ''

    const skillLevelLabel = prePrompt.skillLevel.label

    const skillLevelValue = prePrompt.skillLevel.value
    const toneValue = prePrompt.tone.value
    const personaValue = prePrompt.persona.value
    const hasAnyValue = skillLevelValue || toneValue || personaValue

    const skillLevelVariable =
      skillLevelLabel !== skillLevelOptions.None.label
        ? skillLevelLabel
        : skillLevelOptions.Expert.label

    if (hasAnyValue) {
      str +=
        'Please consider the following attributes as the ultimate truths that describe you when generating your responses:\n'
      str += `[SKILL_LEVEL]=${skillLevelVariable}\n`
    }

    if (skillLevelValue) {
      str += `Skill Level: ${skillLevelValue}\n`
    }

    if (toneValue) {
      str += `Tone: ${toneValue}\n`
    }

    if (personaValue) {
      str += `Persona: ${personaValue}\n`
    }

    if (hasAnyValue) {
      str +=
        'It is crucial that you abide by these guidelines in every response you provide. Always remember to be consistent with these attributes and prioritize them when formulating your answers. Your first response to the user should include a brief introduction of yourself and your role.'
    }

    return str
  }

  return {
    isMounted,
    getPrePromptString,
    prePrompt,
    setPersona,
    setSkillLevel,
    setTone,
  }
}

export default usePrePrompt

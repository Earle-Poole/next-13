'use client'

import { FC } from 'react'
// import { PrePromptProps } from './PrePrompt.types'
import LoadingIndicator from '@/components/atom/LoadingIndicator/LoadingIndicator'
import {
  personaOptions,
  skillLevelOptions,
  toneOptions,
} from '@/utils/constants'
import usePrePrompt from '@/utils/hooks/usePrePrompt'
import Select from 'react-select'

const PrePrompt: FC = () => {
  const { isMounted, prePrompt, setSkillLevel, setTone, setPersona } =
    usePrePrompt()

  return (
    <section className="flex flex-col gap-4 whitespace-nowrap sm:flex-row">
      {isMounted ? (
        <>
          <div className="flex flex-1 gap-2 lg:flex-col">
            <label
              className="flex-1 whitespace-pre-wrap"
              htmlFor="skill-level-options"
            >
              Skill Level:
            </label>
            <Select
              className="flex-[3] text-black"
              classNames={{
                option: (props) => (props.isSelected ? 'text-white' : ''),
              }}
              defaultValue={prePrompt.skillLevel}
              onChange={setSkillLevel}
              options={Object.values(skillLevelOptions)}
              placeholder="Select a skill level"
              inputId="skill-level-options"
            />
          </div>
          <div className="flex flex-1 gap-2 lg:flex-col">
            <label
              className="flex-1 whitespace-pre-wrap"
              htmlFor="tone-options"
            >
              Tone:
            </label>
            <Select
              className="flex-[3] text-black"
              classNames={{
                option: (props) => (props.isSelected ? 'text-white' : ''),
              }}
              defaultValue={prePrompt.tone}
              onChange={setTone}
              options={Object.values(toneOptions)}
              placeholder="Select a tone"
              inputId="tone-options"
            />
          </div>
          <div className="flex flex-1 gap-2 lg:flex-col">
            <label
              className="flex-1 whitespace-pre-wrap"
              htmlFor="persona-options"
            >
              Persona:
            </label>
            <Select
              className="flex-[3] text-black"
              classNames={{
                option: (props) => (props.isSelected ? 'text-white' : ''),
              }}
              defaultValue={prePrompt.persona}
              onChange={setPersona}
              options={Object.values(personaOptions)}
              placeholder="Select a persona"
              inputId="persona-options"
            />
          </div>
        </>
      ) : (
        <div className="flex min-h-[8rem] flex-1 items-center justify-center sm:min-h-[3.875rem]">
          <LoadingIndicator />
        </div>
      )}
    </section>
  )
}

export default PrePrompt

"use client"

import { FC } from "react"
import { PrePromptProps } from "./PrePrompt.types"
import Select from "react-select"
import usePrePrompt from "@/utils/hooks/usePrePrompt"
import {
  personaOptions,
  skillLevelOptions,
  toneOptions,
} from "@/utils/constants"
import LoadingIndicator from "@/components/atom/LoadingIndicator/LoadingIndicator"

const PrePrompt: FC<PrePromptProps> = () => {
  const { isMounted, prePrompt, setSkillLevel, setTone, setPersona } =
    usePrePrompt()

  return (
    <section className="flex gap-4 flex-col sm:flex-row whitespace-nowrap">
      {isMounted ? (
        <>
          <div className="flex-1">
            <label htmlFor="skill-level-options">Skill Level</label>
            <Select
              className="text-black"
              classNames={{
                option: (props) => (props.isSelected ? "text-white" : ""),
              }}
              defaultValue={prePrompt.skillLevel}
              onChange={setSkillLevel}
              options={Object.values(skillLevelOptions)}
              placeholder="Select a skill level"
              inputId="skill-level-options"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="tone-options">Tone</label>
            <Select
              className="text-black"
              classNames={{
                option: (props) => (props.isSelected ? "text-white" : ""),
              }}
              defaultValue={prePrompt.tone}
              onChange={setTone}
              options={Object.values(toneOptions)}
              placeholder="Select a tone"
              inputId="tone-options"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="persona-options">Persona</label>
            <Select
              className="text-black"
              classNames={{
                option: (props) => (props.isSelected ? "text-white" : ""),
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
        <div className="flex justify-center items-center flex-1 min-h-[3.875rem]">
          <LoadingIndicator />
        </div>
      )}
    </section>
  )
}

export default PrePrompt

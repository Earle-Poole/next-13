"use client"

import { FC } from "react"
import { PrePromptProps } from "./PrePrompt.types"
import Select, { SingleValue } from "react-select"
import prePromptAtom, {
  prePromptOptions,
} from "@/components/stores/PrePromptStore"
import { useAtom } from "jotai"

export type PrePromptOptionValues =
  typeof prePromptOptions[keyof typeof prePromptOptions]

const PrePrompt: FC<PrePromptProps> = (props) => {
  const {} = props
  const [_, setPrePrompt] = useAtom(prePromptAtom)
  const onChange = (e: SingleValue<PrePromptOptionValues>) => {
    if (!e) return
    setPrePrompt(e)
  }
  return (
    <section>
      <Select
        options={Object.values(prePromptOptions)}
        onChange={onChange}
        className="text-black"
        classNames={{
          option: (props) => (props.isSelected ? "text-white" : ""),
        }}
      />
    </section>
  )
}

export default PrePrompt

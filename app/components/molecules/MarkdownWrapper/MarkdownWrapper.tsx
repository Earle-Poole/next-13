import classNames from "classnames"
import { FC, PropsWithChildren, lazy } from "react"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import markdownWrapperComponents from "./MarkdownWrapper.Components"
const ReactMarkdown = lazy(() => import("react-markdown"))

const MarkdownWrapper: FC<PropsWithChildren<{ content: string }>> = ({
  content,
}) => {
  return (
    <ReactMarkdown components={markdownWrapperComponents}>
      {content}
    </ReactMarkdown>
  )
}

export default MarkdownWrapper

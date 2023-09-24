import classNames from 'classnames'
import {
  CodeComponent,
  HeadingComponent,
  LiComponent,
  OrderedListComponent,
  UnorderedListComponent,
} from 'react-markdown/lib/ast-to-react'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const H1: HeadingComponent = ({ children }) => (
  <h1 className="text-4xl font-normal leading-normal mt-0 mb-2">{children}</h1>
)

const H2: HeadingComponent = ({ children }) => (
  <h2 className="text-3xl font-normal leading-normal mt-0 mb-2">{children}</h2>
)

const H3: HeadingComponent = ({ children }) => (
  <h3 className="text-2xl font-normal leading-normal mt-0 mb-2">{children}</h3>
)

const H4: HeadingComponent = ({ children }) => (
  <h4 className="text-xl font-normal leading-normal mt-0 mb-2">{children}</h4>
)

const Li: LiComponent = ({ children }) => <li className="">{children}</li>

const Ul: UnorderedListComponent = ({ children }) => (
  <ul className="ml-4 mb-2 [&>li]:list-disc">{children}</ul>
)

const Ol: OrderedListComponent = ({ children }) => (
  <ol className="ml-4 mb-2 [&>li]:list-decimal">{children}</ol>
)

const Code: CodeComponent = ({
  inline,
  children,
  className,
  node,
  ...props
}) => {
  const hasPosition = node.children[0].position
  const match = /language-(\w+)/.exec(className || '')

  return (!inline && match) || !hasPosition ? (
    <SyntaxHighlighter
      {...props}
      style={oneDark}
      className={classNames(
        'w-auto rounded !m-4 whitespace-pre-wrap max-w-7xl',
        className,
      )}
      language={match?.[1]}
      PreTag="div"
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code {...props} className={'bg-[rgb(43,43,43)] py-1 px-2 rounded whitespace-pre-wrap max-w-7xl'}>
      {children}
    </code>
  )
}

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  li: Li,
  ul: Ul,
  ol: Ol,
  code: Code,
}

export default components

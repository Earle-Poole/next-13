import classNames from 'classnames';
import { FC, PropsWithChildren, lazy } from 'react';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ReactMarkdown = lazy(() => import('react-markdown'));
const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter/dist/esm/prism'));

const MarkdownWrapper: FC<PropsWithChildren<{ content: string }>> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        // This could use more components to fully support markdown
        h1: ({ children }) => (
          <h1 className='text-4xl font-normal leading-normal mt-0 mb-2'>{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className='text-3xl font-normal leading-normal mt-0 mb-2'>{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className='text-2xl font-normal leading-normal mt-0 mb-2'>{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className='text-xl font-normal leading-normal mt-0 mb-2'>{children}</h4>
        ),
        li: ({ children }) => <li className='list-inside'>{children}</li>,
        ul: ({ children }) => <ul className='ml-4 [&>li]:list-disc'>{children}</ul>,
        ol: ({ children }) => <ol className='ml-4 [&>li]:list-decimal'>{children}</ol>,

        code: ({ inline, children, className, node, ...props }) => {
          const hasPosition = node.children[0].position;
          const match = /language-(\w+)/.exec(className || '');

          return (!inline && match) || !hasPosition ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              style={oneDark}
              className={classNames('w-auto rounded !m-4 whitespace-pre-wrap', className)}
              language={match?.[1]}
              PreTag='div'
            />
          ) : (
            <code {...props} className={'bg-[rgb(43,43,43)] py-1 px-2 rounded'}>
              {children}
            </code>
          );
        },
      }}>
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownWrapper;

import { FC, SVGProps } from 'react'

const ConversationIcon: FC<SVGProps<SVGSVGElement>> = ({
  fill = '#000000',
  width = '1rem',
  height = '1rem',
}) => {
  return (
    <svg
      fill={fill}
      height={height}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export default ConversationIcon

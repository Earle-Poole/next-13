import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

interface ButtonProps {
  title: string
}

const Button: FC<
  React.PropsWithChildren<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
> = ({
  className = 'bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded',
  ...props
}) => {
  return <button className={className} {...props} />
}

export default Button

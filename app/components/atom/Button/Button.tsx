import { FC } from 'react'

interface ButtonProps {
  title: string
}

const Button: FC<React.PropsWithChildren<ButtonProps>> = ({
  title,
  children,
}) => {
  return (
    <button
      title={title}
      className='bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded'>
      {children}
    </button>
  )
}

export default Button

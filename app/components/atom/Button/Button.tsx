import classNames from 'classnames'
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
} from 'react'

const Button: FC<
  PropsWithChildren<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > & { extendedClassName?: string }
  >
> = ({
  className = 'bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded',
  extendedClassName = '',
  ...props
}) => {
  return (
    <button className={classNames(className, extendedClassName)} {...props} />
  )
}

export default Button

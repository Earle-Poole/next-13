import { LayoutPageProps } from "global"

const Layout = ({ children }: LayoutPageProps) => {
  return <div className='flex flex-1 relative'>{children}</div>
}

export default Layout
import { LayoutPageProps } from 'global'

export const metadata = {
  title: 'Chat - Next 13',
}

const Layout = ({ children }: LayoutPageProps) => {
  return <div className="flex flex-1 relative justify-center">{children}</div>
}

export default Layout

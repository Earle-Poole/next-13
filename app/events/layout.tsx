import { LayoutPageProps } from 'global'

export const metadata = {
    title: 'Events - Next 13',
}

const Layout = ({ children }: LayoutPageProps) => {
    return <div className="flex flex-1 relative">{children}</div>
}

export default Layout

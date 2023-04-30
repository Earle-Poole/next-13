import ConversationList from '@/components/organisms/ConversationList/ConversationList'
import { LayoutPageProps } from 'global'

export const metadata = {
  title: 'Chat - Next 13',
}

const Layout = ({ children }: LayoutPageProps) => {
  return (
    <div className="flex h-full max-w-[100vw] overflow-hidden">
      <ConversationList />
      {children}
    </div>
  )
}

export default Layout

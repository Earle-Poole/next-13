import ArticleRow from '@/components/molecules/ArticleRow/ArticleRow.server'
import Drawer from '@/components/organisms/Drawer'
import { getContent } from '@/utils/cache'
import { LayoutPageProps } from 'global'

export const metadata = {
  title: 'Axios - Next 13',
}

const Layout = async ({ children }: LayoutPageProps) => {
  const content = await getContent()

  return (
    <div className="relative flex flex-1">
      <Drawer>
        {content.results.map((id: string) => {
          return <ArticleRow key={id} id={id} />
        })}
      </Drawer>
      {children}
    </div>
  )
}
export default Layout

import ArticleRow from '@/components/molecules/ArticleRow/ArticleRow.server'
import Drawer from '@/components/organisms/Drawer'
import { LayoutPageProps } from 'global'
import React from 'react'
import { getContent } from '@/utils/cache'

export const metadata = {
  title: 'Axios - Next 13',
}

const Layout = async ({ children }: LayoutPageProps) => {
  const content = await getContent()

  return (
    <div className="flex flex-1 relative">
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

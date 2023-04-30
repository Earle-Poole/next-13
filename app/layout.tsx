import { getPokemonList } from '@/utils/cache'
import { LayoutPageProps } from 'global'
import '../styles/globals.css'
import Header from './components/organisms/Header'

export const metadata = {
  viewport: 'width=device-width, initial-scale=1.0',
  description: 'Nested layouts in Next 13',
  title: 'Next 13 Playground',
}

/**
 * The RootLayout is the main layout of the application.
 * It will wrap every page, including nested pages that have their own layout
 */
const RootLayout = async (props: LayoutPageProps) => {
  await getPokemonList()
  const { children } = props
  return (
    <html lang="en" className="h-full">
      <body className="bg-black text-gray-100 flex flex-col flex-1 w-full h-full">
        <Header />
        {children}
      </body>
    </html>
  )
}
export default RootLayout

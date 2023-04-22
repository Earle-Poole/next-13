import '../styles/globals.css'
import Header from './components/organisms/Header'
import { LayoutPageProps } from 'global'
import React from 'react'
import { getPokemonList } from '@/utils/cache'

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
    <html lang="en" className="min-h-screen flex flex-col">
      <body className="bg-black text-gray-100 flex flex-col flex-1 h-full">
        <Header />
        {children}
      </body>
    </html>
  )
}
export default RootLayout

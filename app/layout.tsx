import '../styles/globals.css'
import Header from './components/organisms/Header'
import { LayoutPageProps } from './types'
import React from 'react'
import { getPokemonList } from '@/utils/cache'

const RootLayout = async (props: LayoutPageProps) => {
  await getPokemonList()
  const { children } = props
  return (
    <html lang='en' className='max-h-screen'>
      <body className='bg-black text-gray-100 min-h-screen max-h-screen h-screen flex flex-col'>
        <Header />
        {children}
      </body>
    </html>
  )
}
export default RootLayout

import '../styles/globals.css'
import Header from './components/organisms/Header'
import { LayoutPageProps } from './types'
import React from 'react'
import { getPokemonList } from '@/utils/cache'

const RootLayout = async (props: LayoutPageProps) => {
  await getPokemonList()
  const { children } = props
  return (
    <html lang='en' className=''>
      <body className='bg-black text-gray-100 flex flex-col'>
        <Header />
        {children}
      </body>
    </html>
  )
}
export default RootLayout

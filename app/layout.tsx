import '../styles/globals.css'
import Header from './components/organisms/Header'
import { LayoutPageProps } from './types'
import React from 'react'

const RootLayout = async ({ children }: LayoutPageProps) => {
  return (
    <html lang='en'>
      <head key={'root-layout'}>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content='A test of new Next 13 paradigms.' />
        <title>Next 13 Practice</title>
      </head>
      <body className='bg-black text-gray-100 h-screen flex flex-col'>
        <Header />
        {children}
      </body>
    </html>
  )
}
export default RootLayout

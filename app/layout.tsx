import React from 'react'
import '../styles/globals.css'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <head key={'root-layout'}>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content='A test of new Next 13 paradigms.' />
        <title>Next 13 Practice</title>
      </head>
      <body className='bg-black text-gray-100 min-h-screen'>{children}</body>
    </html>
  )
}
export default RootLayout

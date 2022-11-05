import React from 'react'
import '../styles/globals.css'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head key={'root-layout'}>
        <title>Next 13 Practice</title>
      </head>
      <body className='bg-black text-gray-100 min-h-screen'>{children}</body>
    </html>
  )
}
export default RootLayout

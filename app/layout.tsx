import "../styles/globals.css"
import Header from "./components/organisms/Header"
import { LayoutPageProps } from "global"
import React from "react"
import { getPokemonList } from "@/utils/cache"

/**
 * The RootLayout is the main layout of the application.
 * It will wrap every page, including nested pages that have their own layout
 */
const RootLayout = async (props: LayoutPageProps) => {
  await getPokemonList()
  const { children } = props
  return (
    <html lang="en" className="">
      <body className="bg-black text-gray-100 flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  )
}
export default RootLayout

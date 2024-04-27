import dynamic from "next/dynamic"
const GravityGrid = dynamic(() => import('@/components/organisms/GravityGrid'), { ssr: false })

const Page = async () => {
  return <GravityGrid />
}

export default Page
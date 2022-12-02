import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Custom404 = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/')
  }, [router])
  return (
    <div className='bg-black'>
      <h1>Taking you back home.</h1>
    </div>
  )
}

export default Custom404

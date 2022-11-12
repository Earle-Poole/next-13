import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Custom404 = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/')
  }, [router])
  return (
    <div className='bg-black'>
      <h1>404 - Page Not Found</h1>
    </div>
  )
}

export default Custom404

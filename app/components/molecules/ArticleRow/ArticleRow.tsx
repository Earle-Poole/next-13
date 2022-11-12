'use client'

import Link from 'next/link'
import { Topic } from '@/utils/cache'

interface ArticleRowProps {
  topic: Topic
}

const ArticleRow = (props: ArticleRowProps) => {
  const { topic } = props

  const URL = `/axios/${topic.id}`
  return (
    <Link
      href={URL}
      className='bg-white/5 border-2 border-slate-800/50 p-4 hover:bg-white/10 hover:border-slate-800/75 cursor-pointer'>
      <div>{topic.headline}</div>
    </Link>
  )
}

export default ArticleRow

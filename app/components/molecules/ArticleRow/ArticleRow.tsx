'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Topic } from 'global'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import PLACEHOLDER from '@/public/assets/axios-placeholder.png'

interface ArticleRowProps {
  topic: Topic
}

const ArticleRow = (props: ArticleRowProps) => {
  const { topic } = props
  const URL = `/axios/${topic.id}`
  const parsedAuthors = topic.authors
    .map((author) => author.display_name)
    .join(', ')

  const pathname = usePathname()
  const urlMatchesPathname = URL === pathname

  return (
    <Link
      href={URL}
      className={classNames(
        'bg-white/5 border-2 border-slate-800/50 p-4 hover:bg-white/10 hover:border-slate-800/75 cursor-pointer flex rounded',
        {
          'border-2 border-slate-800 shadow-lg': urlMatchesPathname,
        }
      )}
    >
      <Image
        height={180}
        width={180}
        style={{ height: 'auto', width: 180 }}
        src={topic.primary_image?.base_image_url || PLACEHOLDER}
        alt={topic.headline}
      />
      <div className="pl-4 flex flex-col justify-between">
        <span className="font-bold">{topic.headline}</span>
        <div className="italic text-sm text-white/70">
          <span>{parsedAuthors}</span>
        </div>
      </div>
    </Link>
  )
}

export default ArticleRow

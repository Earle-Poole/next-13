'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Topic } from '@/utils/cache';

interface ArticleRowProps {
  topic: Topic;
}

const ArticleRow = (props: ArticleRowProps) => {
  const { topic } = props;

  const URL = `/axios/${topic.id}`;
  return (
    <Link
      href={URL}
      className='bg-white/5 border-2 border-slate-800/50 p-4 hover:bg-white/10 hover:border-slate-800/75 cursor-pointer'>
        {topic.primary_image ? (
          <Image
            height={180}
            width={180}
            src={topic.primary_image.base_image_url}
            alt={topic.headline}
          />
        ) : null}
      <div>{topic.headline}</div>
    </Link>
  );
};

export default ArticleRow;

import React, { FC } from 'react'
import { asyncComponent } from '@/utils/lib'
import { getNowAsLocalTimeString } from '@/utils/cache'

const Drawer: FC<React.PropsWithChildren<{}>> = asyncComponent(
  async ({ children }) => {
    return (
      <aside className='border-4 border-t-0 border-slate-800 bg-slate-700 p-4 flex relative flex-col gap-4 xl:min-w-[32rem] md:min-w-[24rem] min-w-[16rem] xl:max-w-[32rem] md:max-w-[24rem] max-w-[16rem] overflow-auto'>
        <span className='text-xs font-normal leading-none absolute top-0.5 left-0.5'>
          Built @ {getNowAsLocalTimeString()}
        </span>
        {children}
      </aside>
    )
  }
)

export default Drawer

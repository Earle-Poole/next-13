import React, { FC } from 'react'
import { asyncComponent } from '@/utils/lib'

const Drawer: FC<React.PropsWithChildren<{}>> = asyncComponent(
  async ({ children }) => {
    return (
      <div className='border-4 border-t-0 border-slate-800 bg-slate-700 p-4 flex flex-col gap-4 xl:min-w-[32rem] md:min-w-[24rem] min-w-[16rem] xl:max-w-[32rem] md:max-w-[24rem] max-w-[16rem]'>
        {children}
      </div>
    )
  }
)

export default Drawer

import type { ReactNode } from 'react'

import AppHeader from '@/components/layout/AppHeader'

export default function PosLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-svh w-full flex-col'>
      <AppHeader />
      <main className='flex-1'>{children}</main>
    </div>
  )
}

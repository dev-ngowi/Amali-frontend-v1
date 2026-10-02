import type { ReactNode } from 'react'

// Component Imports
import AppHeader from '@/components/layout/AppHeader'
import Footer from '@/components/layout/Footer'
import InventorySidebar from '@/components/layout/InventorySidebar'
import { Toaster } from '@/components/ui/sonner'

// Same shell shape as the Reports section: header on top, a floating
// sidebar card beside the content, both inside one max-width container.
const PagesLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className='flex min-h-svh w-full flex-col'>
      <AppHeader withSidebar />
      <div className='mx-auto flex w-full max-w-360 flex-1 gap-4 px-4 py-4 sm:px-6'>
        <InventorySidebar />
        <main className='min-w-0 flex-1'>{children}</main>
      </div>
      <Toaster />
      <Footer />
    </div>
  )
}

export default PagesLayout

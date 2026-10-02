import type { ReactNode } from 'react'

import ReportsSidebar from '@/components/layout/ReportsSidebar'

// Scoped shell for the Reports section — mirrors ReportView in the
// desktop app: a fixed left rail of report categories, content on the
// right. Only /reports/* gets this; Sales, Close Day, etc. stay as the
// plain top-bar-only (pos) shell.
export default function ReportsLayout({ children }: { children: ReactNode }) {
  return (
    <div className='mx-auto flex max-w-360 gap-4 px-4 py-4 sm:px-6'>
      <ReportsSidebar />
      <div className='min-w-0 flex-1'>{children}</div>
    </div>
  )
}

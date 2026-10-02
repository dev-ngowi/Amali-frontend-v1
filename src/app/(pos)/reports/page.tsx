import type { Metadata } from 'next'

// Third-party Imports
import { BarChart3Icon, ClipboardListIcon, CoinsIcon, PackageIcon, ScrollTextIcon, SettingsIcon, WalletIcon } from 'lucide-react'

// Config Imports
import { reportGroups } from '@/configs/reportsNav'

export const metadata: Metadata = { title: 'Reports' }

const GROUP_ICONS = {
  'Sales Reports': WalletIcon,
  'Inventory Reports': PackageIcon,
  'Financial Reports': CoinsIcon,
  'Accounting Reports': ScrollTextIcon,
  'Operational Reports': SettingsIcon
} as const

// Same layout idea as create_overview_widget() in the desktop app: a
// title, a stat-card grid (one card per report category, plus a total),
// then a "categories available" summary card.
export default function ReportsOverviewPage() {
  const totalReports = reportGroups.reduce((sum, g) => sum + g.items.length, 0)

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='flex items-center gap-2 text-2xl font-bold'>
          <BarChart3Icon className='text-muted-foreground size-6' />
          Reports & Analytics
        </h1>
        <p className='text-muted-foreground mt-1 text-sm'>
          Select a report category from the sidebar to view detailed analytics and insights.
        </p>
      </div>

      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6'>
        {reportGroups.map(group => {
          const Icon = GROUP_ICONS[group.label as keyof typeof GROUP_ICONS] ?? BarChart3Icon
          return (
            <div key={group.label} className='bg-card flex items-center gap-3 rounded-xl border p-4'>
              <div className='bg-muted flex size-11 shrink-0 items-center justify-center rounded-full'>
                <Icon className='text-primary size-5' />
              </div>
              <div className='min-w-0'>
                <p className='text-xl font-bold'>{group.items.length}</p>
                <p className='text-muted-foreground truncate text-xs font-medium'>{group.label}</p>
              </div>
            </div>
          )
        })}
        <div className='bg-card flex items-center gap-3 rounded-xl border p-4'>
          <div className='bg-muted flex size-11 shrink-0 items-center justify-center rounded-full'>
            <ClipboardListIcon className='text-primary size-5' />
          </div>
          <div className='min-w-0'>
            <p className='text-xl font-bold'>{totalReports}</p>
            <p className='text-muted-foreground truncate text-xs font-medium'>Total Reports</p>
          </div>
        </div>
      </div>

      <div className='bg-card rounded-xl border p-5'>
        <h2 className='mb-3 flex items-center gap-2 text-lg font-semibold'>
          <ClipboardListIcon className='text-muted-foreground size-4' />
          Report Categories Available
        </h2>
        <ul className='text-muted-foreground grid gap-1.5 text-sm sm:grid-cols-2'>
          <li>• Sales Analysis &amp; Performance</li>
          <li>• Inventory Levels &amp; Valuation</li>
          <li>• Financial Statements &amp; Health</li>
          <li>• Accounting &amp; Transaction Details</li>
          <li>• Operational Efficiency Metrics</li>
        </ul>
      </div>
    </div>
  )
}

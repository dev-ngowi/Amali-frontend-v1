import type { Metadata } from 'next'

// Third-party Imports
import {
  AlertTriangleIcon,
  BadgeDollarSignIcon,
  CalendarClockIcon,
  ShoppingBagIcon,
  TrendingUpIcon,
  TruckIcon
} from 'lucide-react'

export const metadata: Metadata = { title: 'Dashboard' }

// Same icon-chip + value + label pattern as the Reports overview page
// (and create_stat_card in the desktop app) so Inventory and Reports
// read as one consistent design language.
const STATS = [
  { icon: TruckIcon, label: 'Shipped Orders', value: '42', trend: '+18.2%', trendUp: true },
  { icon: AlertTriangleIcon, label: 'Damaged Returns', value: '8', trend: '-8.7%', trendUp: false },
  { icon: CalendarClockIcon, label: 'Missed Delivery Slots', value: '27', trend: '+4.3%', trendUp: true }
]

export default function InventoryDashboardPage() {
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p className='text-muted-foreground mt-1 text-sm'>Overview of shipments, stock and sales performance.</p>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {STATS.map(stat => (
          <div key={stat.label} className='bg-card rounded-xl border p-5'>
            <div className='flex items-center gap-3'>
              <div className='bg-muted flex size-11 shrink-0 items-center justify-center rounded-full'>
                <stat.icon className='text-primary size-5' />
              </div>
              <p className='text-2xl font-bold'>{stat.value}</p>
            </div>
            <p className='mt-3 text-sm font-semibold'>{stat.label}</p>
            <p className={`mt-1 text-xs font-medium ${stat.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
              {stat.trend} <span className='text-muted-foreground font-normal'>than last week</span>
            </p>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <div className='bg-card rounded-xl border p-5 lg:col-span-2'>
          <h2 className='flex items-center gap-2 text-lg font-semibold'>
            <TrendingUpIcon className='text-muted-foreground size-4' />
            Sales Metrics
          </h2>
          <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4'>
            {[
              { icon: TrendingUpIcon, label: 'Sales trend', value: '$11,548' },
              { icon: BadgeDollarSignIcon, label: 'Discount offers', value: '$1,326' },
              { icon: BadgeDollarSignIcon, label: 'Net profit', value: '$17,356' },
              { icon: ShoppingBagIcon, label: 'Total orders', value: '248' }
            ].map(metric => (
              <div key={metric.label} className='bg-muted/40 rounded-lg border p-3'>
                <metric.icon className='text-muted-foreground mb-2 size-4' />
                <p className='text-lg font-bold'>{metric.value}</p>
                <p className='text-muted-foreground text-xs'>{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='bg-card rounded-xl border p-5'>
          <h2 className='text-lg font-semibold'>Total Earning</h2>
          <p className='mt-3 text-3xl font-bold'>$24,650</p>
          <p className='mt-1 text-sm font-medium text-emerald-600'>
            +10% <span className='text-muted-foreground font-normal'>vs last year ($84,325)</span>
          </p>
        </div>
      </div>
    </div>
  )
}

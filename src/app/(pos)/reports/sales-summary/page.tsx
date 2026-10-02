import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Sales Summary' }

export default function SalesSummaryReportPage() {
  return (
    <div className='bg-card rounded-xl border p-6'>
      <h1 className='text-xl font-semibold'>Sales Summary</h1>
      <p className='text-muted-foreground mt-1 text-sm'>This report is not built yet.</p>
      {/* TODO: wire to the same data source as the desktop app's SalesSummaryReport */}
    </div>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Open Day' }

// Placeholder so the TopBar link does not 404 — replace with the real
// Open Day view (see MainApplicationWindow in the desktop app for the
// equivalent logic to port over).
export default function OpenDayPage() {
  return (
    <div className='mx-auto max-w-360 px-4 py-10 sm:px-6'>
      <h1 className='text-xl font-semibold'>Open Day</h1>
      <p className='text-muted-foreground mt-2 text-sm'>This page is not built yet.</p>
    </div>
  )
}

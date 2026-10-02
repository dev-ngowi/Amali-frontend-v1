// Next Imports
import Link from 'next/link'

// Component Imports
import { Button } from '@/components/ui/button'

const DownloadButton = () => {
  return (
    <Button
      render={<Link href='https://themewagon.com/themes/Amali-DS/' target='_blank' />}
      className='animate-heartbeat fixed right-15 bottom-8 z-50'
      nativeButton={false}
    >
      Download
    </Button>
  )
}

export default DownloadButton

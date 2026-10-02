'use client'

// Next Imports
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Third-party Imports
import { LanguagesIcon } from 'lucide-react'

// Component Imports
import LanguageDropdown from '@/components/shared/LanguageDropdown'
import ModeToggle from '@/components/layout/ModeToggle'
import PosNavLink from '@/components/layout/PosNavLink'
import ProfileDropdown from '@/components/shared/ProfileDropdown'
import { Button } from '@/components/ui/button'

// Config Imports
import { POS_NAV_LEFT, POS_NAV_RIGHT } from '@/configs/posNav'
import themeConfig from '@/configs/themeConfig'

type AppHeaderProps = {
  /** True for route groups with their own floating sidebar (Inventory, Reports). */
  withSidebar?: boolean
}

const AppHeader = ({ withSidebar = false }: AppHeaderProps) => {
  const pathname = usePathname()
  const isInventorySection = pathname === '/inventory' || pathname.startsWith('/inventory/')

  const rightLinks = withSidebar
    ? POS_NAV_RIGHT.filter(link => !(link.href === '/inventory' && isInventorySection))
    : POS_NAV_RIGHT

  const allLinks = [...POS_NAV_LEFT, ...rightLinks]

  return (
    <header className='bg-card sticky top-0 z-50 border-b'>
      <div className='mx-auto flex max-w-360 items-center justify-between gap-4 px-4 py-2 sm:px-6'>
        <nav className='flex items-center gap-1 max-xl:hidden'>
          {POS_NAV_LEFT.map(link => (
            <PosNavLink key={link.href} size='sm' {...link} />
          ))}
        </nav>

        <Link href='/' className='flex shrink-0 items-center gap-2'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src='/amali-logo.png' alt={themeConfig.templateName} className='h-8 w-auto object-contain' />
          <span className='font-bold text-gray-500'>AMALI DS</span>
        </Link>

        <div className='flex items-center gap-1.5'>
          <nav className='flex items-center gap-1 max-xl:hidden'>
            {rightLinks.map(link => (
              <PosNavLink key={link.href} size='sm' {...link} />
            ))}
          </nav>
          <ModeToggle />
          <LanguageDropdown
            trigger={
              <Button variant='ghost' size='icon-lg'>
                <LanguagesIcon />
              </Button>
            }
          />
          <ProfileDropdown />
        </div>
      </div>

      <nav className='flex flex-wrap items-center gap-1 border-t px-4 py-2 xl:hidden'>
        {allLinks.map(link => (
          <PosNavLink key={link.href} size='sm' {...link} />
        ))}
      </nav>
    </header>
  )
}

export default AppHeader

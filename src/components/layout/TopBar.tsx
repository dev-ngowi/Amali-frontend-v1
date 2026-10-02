'use client'

// Component Imports
import Link from 'next/link'
import ModeToggle from '@/components/layout/ModeToggle'
import PosNavLink from '@/components/layout/PosNavLink'
import ProfileDropdown from '@/components/shared/ProfileDropdown'

// Config Imports
import themeConfig from '@/configs/themeConfig'
import { POS_NAV_LEFT, POS_NAV_RIGHT } from '@/configs/posNav'

const TopBar = () => {
  return (
    <header className='bg-card sticky top-0 z-50 border-b'>
      <div className='mx-auto flex max-w-360 items-center justify-between gap-4 px-4 py-2 sm:px-6'>
        <nav className='flex items-center gap-1 max-lg:hidden'>
          {POS_NAV_LEFT.map(link => (
            <PosNavLink key={link.href} {...link} />
          ))}
        </nav>

        <Link href='/' className='flex shrink-0 items-center gap-2'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src='/amali-logo.png' alt={themeConfig.templateName} className='h-9 w-auto object-contain' />
        </Link>

        <div className='flex items-center gap-1'>
          <nav className='flex items-center gap-1 max-lg:hidden'>
            {POS_NAV_RIGHT.map(link => (
              <PosNavLink key={link.href} {...link} />
            ))}
          </nav>
          <ModeToggle />
          <ProfileDropdown />
        </div>
      </div>

      <nav className='flex flex-wrap items-center gap-1 border-t px-4 py-2 lg:hidden'>
        {[...POS_NAV_LEFT, ...POS_NAV_RIGHT].map(link => (
          <PosNavLink key={link.href} {...link} />
        ))}
      </nav>
    </header>
  )
}

export default TopBar

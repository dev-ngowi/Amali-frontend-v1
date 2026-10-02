'use client'

// Next Imports
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Config Imports
import type { PosNavLink as PosNavLinkType } from '@/configs/posNav'

// Util Imports
import { cn } from '@/lib/utils'

type PosNavLinkProps = PosNavLinkType & {
  size?: 'sm' | 'md'
}

// Single source of truth for how a top-bar link renders and how its
// active state is determined. Both TopBar ((pos) shell) and Header
// ((pages) shell) render POS_NAV_LEFT / POS_NAV_RIGHT through this
// component so the two bars can never drift out of sync.
export default function PosNavLink({ label, href, size = 'md' }: PosNavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      className={cn(
        'rounded-md text-sm font-medium transition-colors',
        size === 'sm' ? 'px-3 py-1.5' : 'px-3 py-2',
        isActive
          ? 'bg-primary text-primary-foreground font-semibold'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      )}
    >
      {label}
    </Link>
  )
}

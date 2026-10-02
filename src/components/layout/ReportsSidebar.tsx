'use client'

// React Imports
import { useState, type ComponentType } from 'react'

// Next Imports
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Third-party Imports
import {
  BarChart3Icon,
  ChevronRightIcon,
  CoinsIcon,
  HomeIcon,
  PackageIcon,
  ScrollTextIcon,
  SettingsIcon,
  WalletIcon
} from 'lucide-react'

// Component Imports
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

// Config Imports
import { reportGroups } from '@/configs/reportsNav'

// Util Imports
import { cn } from '@/lib/utils'

// Same icon-per-category mapping as the Python sidebar's icon_key set
// (wallet, box, coins, ledger, gear) — kept 1:1 so this reads as the
// same system, just rendered on the web.
const GROUP_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  'Sales Reports': WalletIcon,
  'Inventory Reports': PackageIcon,
  'Financial Reports': CoinsIcon,
  'Accounting Reports': ScrollTextIcon,
  'Operational Reports': SettingsIcon
}

export default function ReportsSidebar() {
  const pathname = usePathname()

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    reportGroups.forEach(group => {
      initial[group.label] = group.items.some(item => pathname === item.href)
    })
    return initial
  })

  return (
    <aside className='bg-card hidden h-fit w-64 shrink-0 rounded-xl border p-3 md:block'>
      <Link
        href='/reports'
        className={cn(
          'mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
          pathname === '/reports' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
        )}
      >
        <HomeIcon className='size-4' />
        Overview
      </Link>

      <div className='flex flex-col gap-1'>
        {reportGroups.map(group => {
          const GroupIcon = GROUP_ICONS[group.label] ?? BarChart3Icon
          const isOpen = openGroups[group.label] ?? false
          const hasActiveChild = group.items.some(item => pathname === item.href)

          return (
            <Collapsible
              key={group.label}
              open={isOpen}
              onOpenChange={open => setOpenGroups(prev => ({ ...prev, [group.label]: open }))}
            >
              <CollapsibleTrigger
                className={cn(
                  'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
                  hasActiveChild ? 'bg-primary/10 text-foreground' : 'text-muted-foreground hover:bg-accent'
                )}
              >
                <GroupIcon className='size-4 shrink-0' />
                <span className='min-w-0 flex-1 truncate'>{group.label}</span>
                <span className='text-muted-foreground text-xs'>{group.items.length}</span>
                <ChevronRightIcon className={cn('size-3.5 shrink-0 transition-transform', isOpen && 'rotate-90')} />
              </CollapsibleTrigger>

              <CollapsibleContent className='overflow-hidden'>
                <div className='mt-1 mb-1 ml-4 flex flex-col gap-0.5 border-l pl-3'>
                  {group.items.length === 0 ? (
                    <span className='text-muted-foreground px-2 py-1.5 text-xs italic'>Coming soon</span>
                  ) : (
                    group.items.map(item => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            'truncate rounded-md px-2 py-1.5 text-sm transition-colors',
                            isActive
                              ? 'bg-primary text-primary-foreground font-medium'
                              : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                          )}
                        >
                          {item.label}
                        </Link>
                      )
                    })
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </div>
    </aside>
  )
}

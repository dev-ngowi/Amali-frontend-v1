'use client'

// React Imports
import { useState, type ComponentType } from 'react'

// Next Imports
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Third-party Imports
import * as Icon from 'lucide-react'
import { ChevronRightIcon, HomeIcon } from 'lucide-react'

// Type Imports
import type { MenuGroupSubItem, MenuItem, MenuLeafSubItem, MenuSubItem } from '@/configs/navConfig'

// Component Imports
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

// Config Imports
import { navItems } from '@/configs/navConfig'
import themeConfig from '@/configs/themeConfig'

// Util Imports
import { cn } from '@/lib/utils'

const isSubGroup = (item: MenuSubItem): item is MenuGroupSubItem => 'childItems' in item

function isLinkActive(href: string, pathname: string) {
  return pathname === href || pathname.startsWith(href + '/')
}

function countLeaves(childItems: MenuSubItem[]): number {
  return childItems.reduce((sum, item) => (isSubGroup(item) ? sum + countLeaves(item.childItems) : sum + 1), 0)
}

function SidebarLeafLink({ item, pathname }: { item: MenuLeafSubItem; pathname: string }) {
  const isActive = isLinkActive(item.href, pathname)
  return (
    <Link
      href={item.href}
      target={item.target}
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
}

// A nested sub-group inside a module (e.g. a further accordion within
// "Business"). None of navItems currently uses this, but it's kept so
// the sidebar doesn't silently drop items if one is added later.
function SidebarSubGroup({ subItem, pathname }: { subItem: MenuGroupSubItem; pathname: string }) {
  const hasActiveChild = subItem.childItems.some(leaf => isLinkActive(leaf.href, pathname))
  const [open, setOpen] = useState(hasActiveChild)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors',
          hasActiveChild ? 'text-foreground font-medium' : 'text-muted-foreground hover:bg-accent'
        )}
      >
        <span className='min-w-0 flex-1 truncate'>{subItem.label}</span>
        <ChevronRightIcon className={cn('size-3.5 shrink-0 transition-transform', open && 'rotate-90')} />
      </CollapsibleTrigger>
      <CollapsibleContent className='overflow-hidden'>
        <div className='mt-0.5 mb-1 ml-3 flex flex-col gap-0.5 border-l pl-3'>
          {subItem.childItems.map(leaf => (
            <SidebarLeafLink key={leaf.label} item={leaf} pathname={pathname} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function SidebarModuleItem({ item, pathname }: { item: MenuItem; pathname: string }) {
  const Icon_ = item.icon ? (Icon[item.icon] as ComponentType<{ className?: string }>) : null

  if (!item.childItems) {
    const isActive = isLinkActive(item.href!, pathname)
    return (
      <Link
        href={item.href!}
        target={item.target}
        className={cn(
          'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'
        )}
      >
        {Icon_ && <Icon_ className='size-4 shrink-0' />}
        <span className='min-w-0 flex-1 truncate'>{item.label}</span>
      </Link>
    )
  }

  const hasActiveChild = item.childItems.some(subItem =>
    isSubGroup(subItem)
      ? subItem.childItems.some(leaf => isLinkActive(leaf.href, pathname))
      : isLinkActive(subItem.href, pathname)
  )
  const [open, setOpen] = useState(hasActiveChild)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className={cn(
          'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
          hasActiveChild ? 'bg-primary/10 text-foreground' : 'text-muted-foreground hover:bg-accent'
        )}
      >
        {Icon_ && <Icon_ className='size-4 shrink-0' />}
        <span className='min-w-0 flex-1 truncate'>{item.label}</span>
        <span className='text-muted-foreground text-xs'>{countLeaves(item.childItems)}</span>
        <ChevronRightIcon className={cn('size-3.5 shrink-0 transition-transform', open && 'rotate-90')} />
      </CollapsibleTrigger>
      <CollapsibleContent className='overflow-hidden'>
        <div className='mt-1 mb-1 ml-4 flex flex-col gap-0.5 border-l pl-3'>
          {item.childItems.map(subItem =>
            isSubGroup(subItem) ? (
              <SidebarSubGroup key={subItem.label} subItem={subItem} pathname={pathname} />
            ) : (
              <SidebarLeafLink key={subItem.label} item={subItem} pathname={pathname} />
            )
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// Floating-card sidebar, styled the same as ReportsSidebar: a white
// rounded box with an accordion list, hidden on mobile rather than
// collapsing to an icon rail. Driven by the same navItems config the
// old icon-rail sidebar used, so the data source didn't change — only
// how it's rendered.
export default function InventorySidebar() {
  const pathname = usePathname()

  return (
    <aside className='bg-card hidden h-fit w-64 shrink-0 rounded-xl border p-3 md:block'>
     

      {navItems.map(group => (
        <div key={group.groupLabel} className='mb-1'>
          {group.groupLabel && group.groupLabel !== 'Overview' && (
            <p className='text-muted-foreground mt-2 mb-1 px-3 text-xs font-semibold tracking-wider uppercase'>
              {group.groupLabel}
            </p>
          )}
          <div className='flex flex-col gap-1'>
            {group.items.map(item =>
              !item.childItems ? (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                    isLinkActive(item.href!, pathname)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  )}
                >
                  <HomeIcon className='size-4' />
                  {item.label}
                </Link>
              ) : (
                <SidebarModuleItem key={item.label} item={item} pathname={pathname} />
              )
            )}
          </div>
        </div>
      ))}
    </aside>
  )
}

export type PosNavLink = {
  label: string
  href: string
}


export const POS_NAV_LEFT: PosNavLink[] = [
  { label: 'Sales Transaction', href: '/' },
  { label: 'Sales Summary', href: '/sales/summary' },
  { label: 'Open Day', href: '/open-day' }
]

export const POS_NAV_RIGHT: PosNavLink[] = [
  { label: 'Close Day', href: '/close-day' },
  { label: 'Inventory', href: '/inventory' },
  { label: 'Reports', href: '/reports' },
  { label: 'Settings', href: '/settings' }
]

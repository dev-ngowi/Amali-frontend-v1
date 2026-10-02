// Third-party Imports
import type * as Icon from 'lucide-react'

type IconName = keyof typeof Icon

export type MenuLeafSubItem = {
  label: string
  href: string
  activePath?: string
  badge?: string
  badgeClassName?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
}

export type MenuGroupSubItem = {
  label: string
  childItems: MenuLeafSubItem[]
}

export type MenuSubItem = MenuLeafSubItem | MenuGroupSubItem

export type MenuItem = {
  icon: IconName
  label: string
} & (
  | {
      href: string
      badge?: string
      badgeClassName?: string
      childItems?: never
      target?: '_blank' | '_self' | '_parent' | '_top'
    }
  | {
      href?: never
      badge?: string
      badgeClassName?: string
      childItems: MenuSubItem[]
    }
)

export type NavItem = {
  groupLabel?: string
  items: MenuItem[]
}

// Mirrors the desktop app's sidebar one-to-one: the same Dashboard button
// plus the same eight accordion sections (Business, Inventory, HR,
// Transactions, Accounting, Business Status, Settings, Users), in the
// same order, so this dashboard and the desktop app read as the same
// system. See MainInventoryWindow.create_accordion_sections /
// connect_sidebar_menu_items in the desktop app for the source list.
export const navItems: NavItem[] = [
  {
    groupLabel: 'Overview',
    items: [
      {
        icon: 'LayoutDashboardIcon',
        label: 'Dashboard',
        href: '/inventory'
      }
    ]
  },
  {
    items: [
      {
        icon: 'BriefcaseIcon',
        label: 'Business',
        childItems: [
          { label: 'Stores', href: '/business/stores' },
          { label: 'Customers', href: '/business/customers' },
          { label: 'Suppliers', href: '/business/suppliers' },
          { label: 'Expenses', href: '/business/expenses' },
          { label: 'Owner Withdrawals', href: '/business/owner-withdrawals' },
          { label: 'Cash Reconciliation', href: '/business/cash-reconciliation' },
          { label: 'Shift Manager', href: '/business/shift-manager' }
        ]
      },
      {
        icon: 'PackageIcon',
        label: 'Inventory',
        childItems: [
          { label: 'Item Group', href: '/inventory/item-group' },
          { label: 'Item Category', href: '/inventory/item-category' },
          { label: 'Item Brand', href: '/inventory/item-brand' },
          { label: 'Item Type', href: '/inventory/item-type' },
          { label: 'Unit', href: '/inventory/unit' },
          { label: 'Items', href: '/inventory/items' },
          { label: 'Damage Stocks', href: '/inventory/damage-stocks' }
        ]
      },
      {
        icon: 'UsersRoundIcon',
        label: 'HR',
        childItems: [
          { label: 'Positions', href: '/hr/positions' },
          { label: 'Employees', href: '/hr/employees' },
          { label: 'Payroll', href: '/hr/payroll' },
          { label: 'Attendance', href: '/hr/attendance' }
        ]
      },
      {
        icon: 'ArrowLeftRightIcon',
        label: 'Transactions',
        childItems: [
          { label: 'Purchase Orders', href: '/transactions/purchase-orders' },
          { label: 'Debtors Manager', href: '/transactions/debtors-manager' },
          { label: 'Vendor Accounts', href: '/transactions/vendor-accounts' },
          { label: 'Petty Cash', href: '/transactions/petty-cash' }
        ]
      },
      {
        icon: 'CalculatorIcon',
        label: 'Accounting',
        childItems: [
          { label: 'Chart of Accounts', href: '/accounting/chart-of-accounts' },
          { label: 'General Ledger', href: '/accounting/general-ledger' },
          { label: 'Bank Transactions', href: '/accounting/bank-transactions' },
          { label: 'Mobile Transactions', href: '/accounting/mobile-transactions' },
          { label: 'Capital Allocation', href: '/accounting/capital-allocation' },
          { label: 'Sales Transactions', href: '/accounting/sales-transactions' },
          { label: 'Purchase Transactions', href: '/accounting/purchase-transactions' },
          { label: 'Expense Transactions', href: '/accounting/expense-transactions' },
          { label: 'Financial Tracking', href: '/accounting/financial-tracking' }
        ]
      },
      {
        icon: 'ActivityIcon',
        label: 'Business Status',
        childItems: [
          { label: 'My Capital Status', href: '/business-status/my-capital' },
          { label: 'Capital Allocations', href: '/business-status/capital-allocations' }
        ]
      },
      {
        icon: 'SettingsIcon',
        label: 'Settings',
        childItems: [
          { label: 'Payments', href: '/settings/payments' },
          { label: 'Virtual Devices', href: '/settings/virtual-devices' },
          { label: 'Void Reasons', href: '/settings/void-reasons' },
          { label: 'System Configuration', href: '/settings/system-configuration' },
          { label: 'Company Details', href: '/settings/company-details' },
          { label: 'Sync Settings', href: '/settings/sync-settings' },
          { label: 'Sync Manager', href: '/settings/sync-manager' }
        ]
      },
      {
        icon: 'ShieldCheckIcon',
        label: 'Users',
        childItems: [
          { label: 'Users', href: '/users/list' },
          { label: 'Roles', href: '/users/roles' },
          { label: 'Permissions', href: '/users/permissions' },
          { label: 'Assign User Roles', href: '/users/assign-roles' }
        ]
      }
    ]
  }
]

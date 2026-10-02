export type ReportLink = {
  label: string
  href: string
}

export type ReportGroup = {
  label: string
  items: ReportLink[]
}

// Mirrors ReportView.connect_sidebar_menu_items in the desktop app —
// same five accordion sections, same reports, same order. Operational
// Reports has an accordion section there but no reports wired to it
// yet, so it stays empty here too rather than inventing content that
// doesn't exist on the desktop side.
export const reportGroups: ReportGroup[] = [
  {
    label: 'Sales Reports',
    items: [
      { label: 'Sales Summary', href: '/reports/sales-summary' },
      { label: 'Sales Detailed', href: '/reports/sales-detailed' },
      { label: 'Payment Summary', href: '/reports/payment-summary' },
      { label: 'Top Selling Items', href: '/reports/top-selling-items' },
      { label: 'Voided Orders', href: '/reports/voided-orders' }
    ]
  },
  {
    label: 'Inventory Reports',
    items: [
      { label: 'Stock Ledger', href: '/reports/stock-ledger' },
      { label: 'Stock Levels', href: '/reports/stock-levels' },
      { label: 'Stock Valuation', href: '/reports/stock-valuation' },
      { label: 'Dead Stock', href: '/reports/dead-stock' }
    ]
  },
  {
    label: 'Financial Reports',
    items: [
      { label: 'Expenses Summary', href: '/reports/expenses-summary' },
      { label: 'Expenses Detailed', href: '/reports/expenses-detailed' },
      { label: 'Daily Financials', href: '/reports/daily-financials' },
      { label: 'Business Health', href: '/reports/business-health' },
      { label: 'PO Summary', href: '/reports/po-summary' },
      { label: 'PO Detailed', href: '/reports/po-detailed' }
    ]
  },
  {
    label: 'Accounting Reports',
    items: [
      { label: 'General Ledger', href: '/reports/general-ledger' },
      { label: 'Bank Transactions', href: '/reports/bank-transactions' },
      { label: 'Mobile Transactions', href: '/reports/mobile-transactions' },
      { label: 'Sales Transactions', href: '/reports/sales-transactions' },
      { label: 'Purchase Transactions', href: '/reports/purchase-transactions' },
      { label: 'Expense Transactions', href: '/reports/expense-transactions' },
      { label: 'Trial Balance', href: '/reports/trial-balance' }
    ]
  },
  {
    label: 'Operational Reports',
    items: [] 
  }
]

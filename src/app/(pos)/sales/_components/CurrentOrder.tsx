'use client'

// Third-party Imports
import { ShoppingCart } from 'lucide-react'

const CURRENCY = 'TZS'

function formatMoney(n: number) {
  return n.toLocaleString('en-US')
}

export type CartItem = {
  id: string
  name: string
  price: number
  unit: string
  qty: number
}

type CurrentOrderProps = {
  items: CartItem[]
  onAddItem?: () => void
  onCheckout?: () => void
}

// The right-hand checkout panel on the Sales screen — mirrors the
// desktop app's PaymentCard. Split into its own file so the cart/total
// logic isn't tangled up with the product grid.
export default function CurrentOrder({ items, onAddItem, onCheckout }: CurrentOrderProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className='bg-card flex h-[calc(100vh-8rem)] flex-col rounded-xl border'>
      <div className='flex items-start justify-between gap-4 p-6 pb-4'>
        <div>
          <h2 className='text-lg font-semibold'>Current Order</h2>
          <p className='text-muted-foreground mt-1 text-sm'>Review items before checkout.</p>
        </div>
        <ShoppingCart className='text-muted-foreground size-5 shrink-0' />
      </div>

      <div className='px-6 pb-4'>
        <span className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>Customer</span>
        <div className='mt-1 rounded-lg border px-3 py-2 text-sm font-medium'>Walk In</div>
      </div>

      <div className='flex-1 overflow-y-auto border-t'>
        <div className='bg-muted/40 text-muted-foreground grid grid-cols-[1fr_auto_auto_auto_auto] gap-2 px-6 py-2 text-xs font-semibold uppercase'>
          <span>Item</span>
          <span className='w-10 text-right'>Unit</span>
          <span className='w-8 text-right'>Qty</span>
          <span className='w-14 text-right'>Price</span>
          <span className='w-16 text-right'>Total</span>
        </div>

        {items.length === 0 ? (
          <p className='text-muted-foreground p-6 text-center text-sm'>No items yet — add a product to get started.</p>
        ) : (
          items.map(item => (
            <div
              key={item.id}
              className='grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-2 border-b px-6 py-2.5 text-sm last:border-b-0'
            >
              <span className='truncate font-medium'>{item.name}</span>
              <span className='text-muted-foreground w-10 text-right'>{item.unit}</span>
              <span className='w-8 text-right'>{item.qty}</span>
              <span className='w-14 text-right'>{formatMoney(item.price)}</span>
              <span className='w-16 text-right font-semibold'>{formatMoney(item.price * item.qty)}</span>
            </div>
          ))
        )}
      </div>

      <div className='flex items-center justify-between bg-slate-800 px-6 py-4 text-white'>
        <span className='text-xs font-semibold tracking-wide uppercase opacity-80'>
          Order Total
          <span className='ml-2 opacity-60'>{CURRENCY}</span>
        </span>
        <span className='text-2xl font-bold'>{formatMoney(total)}.00</span>
      </div>

      <div className='grid grid-cols-2 gap-2 p-4'>
        <button
          onClick={onAddItem}
          className='hover:bg-accent rounded-lg border py-2.5 text-sm font-semibold transition-colors'
        >
          Add Item
        </button>
        <button
          onClick={onCheckout}
          disabled={items.length === 0}
          className='flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50'
        >
          Checkout
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  )
}

'use client'

// React Imports
import { useMemo, useState } from 'react'

// Third-party Imports
import { Banknote, Plus, Search, ShoppingCart } from 'lucide-react'
import CurrentOrder from './sales/_components/CurrentOrder'



type Product = {
  id: string
  name: string
  price: number
  unit: string
  stock: number
}

// Sample data — swap for the real product list (same source as the
// desktop app's ProductListItem tiles) once that's wired up.
const SAMPLE_PRODUCTS: Product[] = [
  { id: '1', name: 'Test Item', price: 2000, unit: 'PC', stock: 46 },
  { id: '2', name: 'Coca Cola 500ml', price: 1500, unit: 'PC', stock: 120 },
  { id: '3', name: 'Rice 5kg', price: 18000, unit: 'BAG', stock: 8 },
  { id: '4', name: 'Cooking Oil 1L', price: 6500, unit: 'PC', stock: 32 }
]

const CURRENCY = 'TZS'

function formatMoney(n: number) {
  return n.toLocaleString('en-US')
}

// The default screen on app launch — mirrors setup_dashboard() in the
// desktop app: product grid on the left, current order/checkout panel
// on the right.
export default function SalesPage() {
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SAMPLE_PRODUCTS
    return SAMPLE_PRODUCTS.filter(p => p.name.toLowerCase().includes(q))
  }, [query])

  function addToCart(product: Product) {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item))
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const businessDate = new Date().toLocaleDateString('en-CA') // YYYY-MM-DD

  return (
    <div className='mx-auto grid max-w-360 grid-cols-1 gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[1fr_380px]'>
      {/* Products */}
      <div className='bg-card flex h-[calc(100vh-8rem)] flex-col rounded-xl border'>
        <div className='flex items-start justify-between gap-4 p-6 pb-4'>
          <div>
            <h1 className='text-xl font-semibold'>Products</h1>
            <p className='text-muted-foreground mt-1 text-sm'>Select an item to add it to the current order.</p>
          </div>
          <span className='bg-sky-100 text-sky-700 shrink-0 rounded-full px-3 py-1 text-xs font-semibold dark:bg-sky-950 dark:text-sky-300'>
            {filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className='px-6'>
          <div className='relative'>
            <Search className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder='Search by product name, barcode or code...'
              className='focus:border-sky-500 focus:ring-sky-500/20 w-full rounded-lg border py-2.5 pr-3 pl-10 text-sm outline-none focus:ring-2'
            />
          </div>
        </div>

        <div className='flex-1 overflow-y-auto p-6'>
          {filteredProducts.length === 0 ? (
            <p className='text-muted-foreground text-sm'>No products match your search.</p>
          ) : (
            <div className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6'>
              {filteredProducts.map(product => (
                <div key={product.id} className='rounded-lg border p-2'>
                  <div className='mb-2 flex h-14 items-center justify-center rounded-md bg-sky-50 dark:bg-sky-950/40'>
                    <ShoppingCart className='size-5 text-sky-400' />
                  </div>
                  <span className='mb-1 inline-block rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'>
                    {product.stock} {product.unit}
                  </span>
                  <p className='truncate text-xs font-semibold uppercase'>{product.name}</p>
                  <p className='mb-2 text-sm font-bold text-sky-600 dark:text-sky-400'>
                    {formatMoney(product.price)} <span className='text-muted-foreground text-[10px] font-medium'>{CURRENCY}</span>
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className='flex w-full items-center justify-center gap-1 rounded-md bg-sky-500 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-sky-600'
                  >
                    <Plus className='size-3.5' />
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='text-muted-foreground flex items-center justify-between border-t px-6 py-3 text-sm'>
          <span className='font-medium'>Business Date: {businessDate}</span>
          <button
            disabled
            className='bg-muted text-muted-foreground flex cursor-not-allowed items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium'
          >
            <Banknote className='size-4' />
            Open Cash Drawer
          </button>
        </div>
      </div>

      {/* Current Order */}
      <CurrentOrder items={cart} onAddItem={() => {}} onCheckout={() => {}} />
    </div>
  )
}

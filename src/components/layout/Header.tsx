import { Bell, Search } from 'lucide-react'
import { StatusBadge } from '@/components/ui/Badge'

export function Header() {
  return (
    <header
      className="flex items-center justify-between px-8 shrink-0"
      style={{
        height: 56,
        backgroundColor: '#fff',
        borderBottom: '1px solid #e9ebed',
      }}
    >
      {/* Left — breadcrumb */}
      <div className="flex items-center gap-2">
        <span style={{ color: '#798585', fontSize: 13, letterSpacing: '0.26px' }}>
          Trust Domains
        </span>
        <span style={{ color: '#e9ebed', fontSize: 13 }}>/</span>
        <span
          className="font-mono font-semibold"
          style={{ color: '#101212', fontSize: 12, letterSpacing: '0.24px' }}
        >
          production.example.com
        </span>
        <div className="ml-1">
          <StatusBadge status="good" />
        </div>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-2 border rounded-md px-3 py-1.5 bg-white transition-colors cursor-pointer"
          style={{
            borderColor: '#e9ebed',
            color: '#798585',
            fontSize: 12,
            letterSpacing: '0.24px',
          }}
        >
          <Search size={13} strokeWidth={1.8} />
          Search…
          <span
            className="ml-1 font-mono rounded px-1"
            style={{ backgroundColor: '#f5f7f7', fontSize: 10, color: '#798585' }}
          >
            ⌘K
          </span>
        </button>

        <button
          className="relative flex items-center justify-center rounded-md border cursor-pointer"
          style={{
            width: 32,
            height: 32,
            borderColor: '#e9ebed',
            backgroundColor: '#fff',
          }}
        >
          <Bell size={14} color="#798585" strokeWidth={1.8} />
          {/* Notification dot */}
          <span
            className="absolute rounded-full"
            style={{
              width: 7,
              height: 7,
              backgroundColor: '#ef4444',
              top: 5,
              right: 5,
              border: '1.5px solid #fff',
            }}
          />
        </button>

        <button
          className="flex items-center gap-2 cursor-pointer border-none bg-transparent p-0"
          style={{ color: '#101212', fontSize: 12, fontWeight: 500 }}
        >
          <div
            className="rounded-full flex items-center justify-center font-semibold"
            style={{
              width: 28,
              height: 28,
              backgroundColor: '#3e7c79',
              color: '#fff',
              fontSize: 11,
              letterSpacing: '0.22px',
            }}
          >
            KL
          </div>
        </button>
      </div>
    </header>
  )
}

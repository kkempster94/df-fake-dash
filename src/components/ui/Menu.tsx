import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { StatusDot } from '@/components/ui/Badge'
import type { StatusLevel } from '@/data/mockData'

// ─── MenuItem ──────────────────────────────────────────────────────────────────

interface MenuItemProps {
  children: ReactNode
  onClick?: () => void
  checked?: boolean
  healthDot?: StatusLevel
  disabled?: boolean
}

export function MenuItem({ children, onClick, checked, healthDot, disabled }: MenuItemProps) {
  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) onClick?.()
      }}
      className={cn(
        'flex items-center justify-between gap-3 px-3 h-8 text-[13px] rounded-sm cursor-pointer select-none',
        'hover:bg-[rgba(62,124,121,0.07)]',
        checked ? 'font-semibold' : 'font-normal',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      )}
      style={{ color: '#101212', letterSpacing: '0.26px' }}
    >
      <span className="flex items-center gap-2 flex-1 min-w-0">
        {healthDot && <StatusDot status={healthDot} />}
        {children}
      </span>
      {checked && <Check size={16} style={{ color: '#3e7c79', flexShrink: 0 }} />}
    </div>
  )
}

// ─── Menu ──────────────────────────────────────────────────────────────────────

interface MenuProps {
  children: ReactNode
  className?: string
}

export function Menu({ children, className }: MenuProps) {
  return (
    <div
      role="menu"
      className={cn(
        'bg-white border border-[#dde0e0] rounded shadow-sm py-1',
        className,
      )}
    >
      {children}
    </div>
  )
}

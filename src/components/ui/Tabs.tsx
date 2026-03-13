import { cn } from '@/lib/cn'

// ─── Single Tab ────────────────────────────────────────────────────────────────

interface TabProps {
  id: string
  label: string
  count?: number
  isActive: boolean
  onClick: () => void
}

export function Tab({ id, label, count, isActive, onClick }: TabProps) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${id}`}
      id={`tab-${id}`}
      onClick={onClick}
      className="inline-flex items-center gap-1 cursor-pointer border-none bg-transparent py-2.5 px-4 transition-colors relative whitespace-nowrap"
      style={{
        fontSize: 12,
        fontWeight: isActive ? 600 : 400,
        color: isActive ? '#3e7c79' : '#798585',
        letterSpacing: '0.24px',
        borderBottom: isActive ? '2px solid #3e7c79' : '2px solid transparent',
        marginBottom: -1,
      }}
    >
      {label}
      {count != null && (
        <span
          className="inline-flex items-center justify-center rounded-full font-semibold"
          style={{
            backgroundColor: 'rgba(62,124,121,0.1)',
            color: '#3e7c79',
            fontSize: 10,
            padding: '0 6px',
            minWidth: 18,
            height: 18,
            opacity: isActive ? 1 : 0.7,
          }}
        >
          {count}
        </span>
      )}
    </button>
  )
}

// ─── Tab List ─────────────────────────────────────────────────────────────────

export interface TabItem {
  id: string
  label: string
  count?: number
}

interface TabsProps {
  items: TabItem[]
  activeId: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ items, activeId, onChange, className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn('flex items-end', className)}
      style={{ borderBottom: '1px solid #e9ebed' }}
    >
      {items.map((item) => (
        <Tab
          key={item.id}
          id={item.id}
          label={item.label}
          count={item.count}
          isActive={item.id === activeId}
          onClick={() => onChange(item.id)}
        />
      ))}
    </div>
  )
}

import type { ReactNode, CSSProperties } from 'react'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'
import { cn } from '@/lib/cn'

// ─── Table root ────────────────────────────────────────────────────────────────

interface TableProps {
  children: ReactNode
  className?: string
}

export function Table({ children, className }: TableProps) {
  return (
    <div className={cn('bg-white w-full', className)}>
      {children}
    </div>
  )
}

// ─── Table.Header ──────────────────────────────────────────────────────────────

interface TableHeaderProps {
  children: ReactNode
}

export function TableHeader({ children }: TableHeaderProps) {
  return (
    <div
      className="flex h-[34px] items-center rounded-[4px]"
      style={{ backgroundColor: '#edf2f7' }}
      role="row"
    >
      {children}
    </div>
  )
}

// ─── Table.HeadCell ─────────────────────────────────────────────────────────────

type SortDirection = 'hidden' | 'up' | 'down' | 'none'

interface TableHeadCellProps {
  children?: ReactNode
  width?: number
  className?: string
  sortDirection?: SortDirection
  onSort?: () => void
}

export function TableHeadCell({
  children,
  width,
  className = 'pl-2',
  sortDirection,
  onSort,
}: TableHeadCellProps) {
  const style: CSSProperties = width ? { width } : {}

  const sortIcon = sortDirection === 'up'
    ? <ArrowUp size={12} style={{ color: '#3e7c79', flexShrink: 0 }} />
    : sortDirection === 'down'
      ? <ArrowDown size={12} style={{ color: '#3e7c79', flexShrink: 0 }} />
      : sortDirection === 'hidden' || sortDirection === 'none'
        ? <ArrowUpDown size={12} style={{ color: '#798585', opacity: 0.5, flexShrink: 0 }} />
        : null

  const inner = (
    <>
      {children != null && (
        <span
          className="uppercase font-medium whitespace-nowrap"
          style={{ fontSize: 10, letterSpacing: '0.8px', color: '#101212' }}
        >
          {children}
        </span>
      )}
      {sortIcon}
    </>
  )

  const sharedClass = cn(
    'flex items-center gap-1 h-full py-[6px]',
    width ? 'flex-none' : 'flex-1 min-w-0',
    className,
  )

  if (onSort) {
    return (
      <button
        role="columnheader"
        onClick={onSort}
        className={cn(sharedClass, 'cursor-pointer border-none bg-transparent')}
        style={style}
        aria-sort={sortDirection === 'up' ? 'ascending' : sortDirection === 'down' ? 'descending' : 'none'}
      >
        {inner}
      </button>
    )
  }

  return (
    <div className={sharedClass} style={style} role="columnheader">
      {inner}
    </div>
  )
}

// ─── Table.Row ────────────────────────────────────────────────────────────────

interface TableRowProps {
  children: ReactNode
  onClick?: () => void
}

export function TableRow({ children, onClick }: TableRowProps) {
  return (
    <div
      className={cn('flex h-[34px] items-center', onClick && 'cursor-pointer hover:bg-gray-50')}
      style={{ borderBottom: '1px solid #e9ebed' }}
      role="row"
      onClick={onClick}
    >
      {children}
    </div>
  )
}

// ─── Table.Cell ───────────────────────────────────────────────────────────────

type TableCellType = 'body' | 'bold' | 'link' | 'code' | 'badge' | 'healthDot' | 'urlTag' | 'alertBadge'

interface TableCellProps {
  children?: ReactNode
  width?: number
  className?: string
  cellType?: TableCellType
  href?: string
}

export function TableCell({ children, width, className = 'pl-2', cellType = 'body', href }: TableCellProps) {
  const style: CSSProperties = width ? { width } : {}

  function renderContent() {
    switch (cellType) {
      case 'bold':
        return (
          <span className="font-semibold truncate" style={{ color: '#101212', fontSize: 13 }}>
            {children}
          </span>
        )
      case 'link':
        return (
          <a
            href={href ?? '#'}
            className="underline truncate"
            style={{ color: '#101212', fontSize: 13 }}
          >
            {children}
          </a>
        )
      case 'code':
        return (
          <span className="font-mono truncate" style={{ color: '#3e7c79', fontSize: 12 }}>
            {children}
          </span>
        )
      case 'healthDot':
        return <span className="flex items-center justify-center">{children}</span>
      default:
        return <>{children}</>
    }
  }

  return (
    <div
      className={cn(
        'flex flex-col h-full justify-center overflow-hidden',
        cellType === 'healthDot' ? 'items-center' : '',
        width ? 'flex-none' : 'flex-1 min-w-0',
        className,
      )}
      style={style}
      role="cell"
    >
      {renderContent()}
    </div>
  )
}

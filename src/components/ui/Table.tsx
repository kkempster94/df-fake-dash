import type { ReactNode, CSSProperties } from 'react'
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

interface TableHeadCellProps {
  children?: ReactNode
  width?: number       // fixed pixel width; omit for flex-1
  className?: string   // padding override; default "pl-2"
}

export function TableHeadCell({
  children,
  width,
  className = 'pl-2',
}: TableHeadCellProps) {
  const style: CSSProperties = width ? { width } : {}
  return (
    <div
      className={cn(
        'flex flex-col h-full justify-center py-[6px]',
        width ? 'flex-none' : 'flex-1 min-w-0',
        className,
      )}
      style={style}
      role="columnheader"
    >
      {children != null && (
        <span
          className="uppercase font-medium whitespace-nowrap"
          style={{ fontSize: 10, letterSpacing: '0.8px', color: '#101212' }}
        >
          {children}
        </span>
      )}
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

interface TableCellProps {
  children?: ReactNode
  width?: number
  className?: string   // padding override; default "pl-2"
}

export function TableCell({ children, width, className = 'pl-2' }: TableCellProps) {
  const style: CSSProperties = width ? { width } : {}
  return (
    <div
      className={cn(
        'flex flex-col h-full justify-center overflow-hidden',
        width ? 'flex-none' : 'flex-1 min-w-0',
        className,
      )}
      style={style}
      role="cell"
    >
      {children}
    </div>
  )
}

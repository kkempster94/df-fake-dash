import { useState, useRef, useEffect } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'
import { cn } from '@/lib/cn'

// ─── useColumnWidths ────────────────────────────────────────────────────────────

export function useColumnWidths<T extends Record<string, number>>(
  storageKey: string,
  defaults: T,
): { widths: T; setWidth: (col: keyof T & string, width: number) => void } {
  const [widths, setWidths] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      return stored ? { ...defaults, ...JSON.parse(stored) } : defaults
    } catch {
      return defaults
    }
  })

  function setWidth(col: keyof T & string, width: number) {
    setWidths(prev => {
      const next = { ...prev, [col]: width } as T
      try { localStorage.setItem(storageKey, JSON.stringify(next)) } catch {}
      return next
    })
  }

  return { widths, setWidth }
}

// ─── ResizeHandle ───────────────────────────────────────────────────────────────

function ResizeHandle({ onResize }: { onResize: (delta: number) => void }) {
  const onResizeRef = useRef(onResize)
  useEffect(() => { onResizeRef.current = onResize })

  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    let lastX = e.clientX

    function handleMouseMove(ev: MouseEvent) {
      const delta = ev.clientX - lastX
      lastX = ev.clientX
      onResizeRef.current(delta)
    }

    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      aria-hidden="true"
      data-resize-handle="true"
      onMouseDown={handleMouseDown}
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 4,
        cursor: 'col-resize',
      }}
    />
  )
}

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
  onResize?: (delta: number) => void
}

export function TableHeadCell({
  children,
  width,
  className = 'pl-2',
  sortDirection,
  onSort,
  onResize,
}: TableHeadCellProps) {
  const style: CSSProperties = {
    ...(width ? { width } : {}),
    ...(onResize ? { position: 'relative' } : {}),
  }

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
      {onResize && <ResizeHandle onResize={onResize} />}
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

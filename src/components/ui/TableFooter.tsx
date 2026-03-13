import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

interface TableFooterProps {
  page: number
  pageSize: number
  total: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export function TableFooter({
  page,
  pageSize,
  total,
  pageSizeOptions = [10, 25, 50],
  onPageChange,
  onPageSizeChange,
}: TableFooterProps) {
  const [sizeMenuOpen, setSizeMenuOpen] = useState(false)
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = Math.min((page - 1) * pageSize + 1, total)
  const end = Math.min(page * pageSize, total)

  const textStyle = { fontSize: 11, letterSpacing: '0.22px', lineHeight: 1.5 }

  return (
    <div
      className="flex items-center gap-8 h-[34px] px-4 border-t border-[#edf2f7] relative"
      style={textStyle}
    >
      {/* Page size */}
      <div className="flex items-center gap-1.5 shrink-0 relative">
        <span style={{ color: '#798585' }}>Page rows:</span>
        <button
          type="button"
          onClick={() => onPageSizeChange && setSizeMenuOpen((v) => !v)}
          className={cn(
            'flex items-center gap-0.5 font-semibold border-none bg-transparent p-0',
            onPageSizeChange ? 'cursor-pointer' : 'cursor-default',
          )}
          style={{ color: '#101212', fontSize: 11 }}
          aria-label="Change page size"
          aria-expanded={sizeMenuOpen}
        >
          {pageSize}
          {onPageSizeChange && <ChevronDown size={12} style={{ color: '#798585' }} />}
        </button>
        {sizeMenuOpen && onPageSizeChange && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-[#dde0e0] rounded shadow-sm py-1 z-50 min-w-[60px]">
            {pageSizeOptions.map((size) => (
              <div
                key={size}
                onClick={() => { onPageSizeChange(size); setSizeMenuOpen(false) }}
                className={cn(
                  'px-3 h-8 flex items-center cursor-pointer hover:bg-[rgba(62,124,121,0.07)]',
                  size === pageSize && 'font-semibold',
                )}
                style={{ color: '#101212', fontSize: 11 }}
              >
                {size}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Range */}
      <div className="flex items-center shrink-0" style={{ color: '#101212' }}>
        <span className="font-semibold">{start} – {end}</span>
        <span style={{ color: '#798585' }}>&nbsp;of&nbsp;</span>
        <span>{total}</span>
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-2 shrink-0 ml-auto">
        <button
          type="button"
          onClick={() => page > 1 && onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="flex items-center justify-center border-none bg-transparent cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed p-0"
        >
          <ChevronLeft size={13} style={{ color: '#798585' }} />
        </button>
        <span style={{ color: '#798585' }}>
          Page{' '}
          <span className="font-semibold" style={{ color: '#101212' }}>{page} of {totalPages}</span>
        </span>
        <button
          type="button"
          onClick={() => page < totalPages && onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="flex items-center justify-center border-none bg-transparent cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed p-0"
        >
          <ChevronRight size={13} style={{ color: '#798585' }} />
        </button>
      </div>
    </div>
  )
}

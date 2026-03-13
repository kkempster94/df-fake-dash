import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'

// ─── DialogHeader ──────────────────────────────────────────────────────────────

interface DialogHeaderProps {
  title: string
  description?: string
  onClose?: () => void
  className?: string
}

export function DialogHeader({ title, description, onClose, className }: DialogHeaderProps) {
  return (
    <div
      className={cn('relative px-8 pt-8 pb-6 border-b border-[#e9ebed]', className)}
    >
      <h2
        className="font-semibold leading-tight"
        style={{ fontSize: 15, color: '#101212' }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-1 leading-relaxed"
          style={{ fontSize: 13, color: '#798585' }}
        >
          {description}
        </p>
      )}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-6 right-6 flex items-center justify-center border-none bg-transparent cursor-pointer p-1 rounded"
          style={{ color: '#798585' }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}

// ─── DialogFooter ──────────────────────────────────────────────────────────────

interface DialogFooterProps {
  children: ReactNode
  className?: string
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div
      className={cn(
        'px-8 py-6 flex items-center justify-end gap-3 border-t border-[#e9ebed]',
        className,
      )}
    >
      {children}
    </div>
  )
}

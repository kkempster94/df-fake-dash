import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'

interface FlyoverHeaderProps {
  title: string
  actions?: ReactNode
  onClose?: () => void
  className?: string
}

export function FlyoverHeader({ title, actions, onClose, className }: FlyoverHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between px-6 h-8', className)}>
      <span className="font-semibold" style={{ fontSize: 13, color: '#101212' }}>
        {title}
      </span>
      <div className="flex items-center gap-2">
        {actions}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="flex items-center justify-center border-none bg-transparent cursor-pointer p-0.5 rounded"
            style={{ color: '#798585' }}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

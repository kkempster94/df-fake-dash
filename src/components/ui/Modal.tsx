import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  width?: number
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = 480,
}: ModalProps) {
  const titleId = 'modal-title'

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 50 }}
      onClick={onClose}
      data-testid="modal-backdrop"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bg-white rounded-lg shadow-xl flex flex-col"
        style={{ width, maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b shrink-0"
          style={{ borderColor: '#e9ebed' }}
        >
          <h2
            id={titleId}
            className="font-semibold"
            style={{ fontSize: 15, color: '#101212', letterSpacing: '0.3px' }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center rounded cursor-pointer border-none bg-transparent p-1 transition-colors hover:bg-gray-50"
            style={{ color: '#798585' }}
          >
            <X size={16} strokeWidth={1.8} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className="flex items-center justify-end gap-3 px-6 py-4 border-t shrink-0"
            style={{ borderColor: '#e9ebed' }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

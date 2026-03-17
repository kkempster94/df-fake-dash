import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle, X } from 'lucide-react'

const AUTO_DISMISS_MS = 4000

interface ToastProps {
  message: string
  visible: boolean
  onDismiss: () => void
}

export function Toast({ message, visible, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!visible) return
    const id = setTimeout(onDismiss, AUTO_DISMISS_MS)
    return () => clearTimeout(id)
  }, [visible, onDismiss])

  if (!visible) return null

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#1a2424',
        color: '#fff',
        borderRadius: 8,
        padding: '12px 16px',
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: '0.26px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        minWidth: 260,
        maxWidth: 400,
      }}
    >
      <CheckCircle size={16} style={{ color: '#28a868', flexShrink: 0 }} />
      <span style={{ flex: 1 }}>{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <X size={14} />
      </button>
    </div>,
    document.body,
  )
}

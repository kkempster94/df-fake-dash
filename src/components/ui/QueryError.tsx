import { AlertCircle } from 'lucide-react'

interface QueryErrorProps {
  message?: string
  onRetry?: () => void
  className?: string
}

export function QueryError({
  message = 'Something went wrong loading this data.',
  onRetry,
  className = '',
}: QueryErrorProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 py-12 ${className}`}
      role="alert"
    >
      <AlertCircle size={20} style={{ color: '#cd3d61' }} />
      <p style={{ fontSize: 13, color: '#cd3d61', margin: 0 }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="cursor-pointer border-none rounded"
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#3e7c79',
            backgroundColor: 'rgba(62,124,121,0.07)',
            padding: '4px 12px',
            letterSpacing: '0.24px',
          }}
        >
          Try again
        </button>
      )}
    </div>
  )
}

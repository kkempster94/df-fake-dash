import type { ReactNode } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/cn'

type AlertSeverity = 'good' | 'bad' | 'warning' | 'neutral'

interface AlertProps {
  severity: AlertSeverity
  title?: string
  children: ReactNode
  onDismiss?: () => void
  className?: string
}

const SEVERITY_CONFIG: Record<AlertSeverity, {
  bg: string
  color: string
  Icon: typeof CheckCircle
}> = {
  good:    { bg: 'rgba(40,168,104,0.07)',  color: '#28a868', Icon: CheckCircle },
  bad:     { bg: 'rgba(205,61,97,0.07)',   color: '#cd3d61', Icon: XCircle     },
  warning: { bg: 'rgba(255,112,32,0.07)', color: '#ff7020', Icon: AlertCircle },
  neutral: { bg: 'rgba(95,105,105,0.1)',   color: '#5f6969', Icon: Info        },
}

export function Alert({ severity, title, children, onDismiss, className }: AlertProps) {
  const { bg, color, Icon } = SEVERITY_CONFIG[severity]

  return (
    <div
      role="alert"
      className={cn('flex items-start gap-3 p-4 rounded-lg', className)}
      style={{ backgroundColor: bg }}
    >
      <Icon size={16} style={{ color, flexShrink: 0, marginTop: 1 }} />
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold" style={{ fontSize: 13, color }}>
            {title}
          </p>
        )}
        <div className="mt-0.5" style={{ fontSize: 13, color, opacity: 0.85 }}>
          {children}
        </div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="flex items-center justify-center border-none bg-transparent cursor-pointer p-0 opacity-60 hover:opacity-100 ml-auto shrink-0"
          style={{ color }}
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

import type { ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'

type InlineMessageType = 'good' | 'bad' | 'concerning' | 'neutral'

interface InlineMessageProps {
  type: InlineMessageType
  children: ReactNode
  icon?: boolean
}

const TYPE_COLORS: Record<InlineMessageType, string> = {
  good:       '#28a868',
  bad:        '#cd3d61',
  concerning: '#ff7020',
  neutral:    '#9fa8a7',
}

export function InlineMessage({ type, children, icon = true }: InlineMessageProps) {
  const color = TYPE_COLORS[type]
  return (
    <div
      className="flex items-center gap-1 pt-1"
      style={{ color, fontSize: 11, letterSpacing: '0.22px' }}
    >
      {icon && type !== 'neutral' && (
        <AlertCircle size={16} style={{ color, flexShrink: 0 }} />
      )}
      <span style={{ fontWeight: 400, lineHeight: 1.5 }}>{children}</span>
    </div>
  )
}

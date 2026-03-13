import { ArrowLeftRight, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/cn'

type ProcessState = 'neutral' | 'success' | 'problem' | 'error'

interface WorkflowProcessStateProps {
  state: ProcessState
  message: string
  className?: string
}

const STATE_CONFIG: Record<ProcessState, {
  bg: string
  color: string
  Icon: typeof CheckCircle
}> = {
  neutral: { bg: 'rgba(95,105,105,0.1)',   color: '#5f6969', Icon: ArrowLeftRight },
  success: { bg: 'rgba(40,168,104,0.07)',  color: '#28a868', Icon: CheckCircle    },
  problem: { bg: 'rgba(255,112,32,0.07)', color: '#ff7020', Icon: AlertCircle    },
  error:   { bg: 'rgba(205,61,97,0.07)',   color: '#cd3d61', Icon: XCircle        },
}

export function WorkflowProcessState({ state, message, className }: WorkflowProcessStateProps) {
  const { bg, color, Icon } = STATE_CONFIG[state]

  return (
    <div
      className={cn('flex items-center justify-center gap-2 px-6 py-8 rounded-lg w-full', className)}
      style={{ backgroundColor: bg }}
    >
      <Icon size={16} style={{ color, flexShrink: 0 }} />
      <span style={{ color, fontSize: 13, letterSpacing: '0.26px' }}>{message}</span>
    </div>
  )
}

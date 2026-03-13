import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { InlineMessage } from '@/components/ui/InlineMessage'

type MessageType = 'good' | 'bad' | 'concerning' | 'neutral'

interface FormFieldProps {
  label?: string
  message?: string
  messageType?: MessageType
  children: ReactNode
  className?: string
}

export function FormField({
  label,
  message,
  messageType = 'bad',
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col', (label || message) ? 'gap-2' : 'gap-0', className)}>
      {label && (
        <span
          className="uppercase font-medium"
          style={{
            fontSize: 10,
            letterSpacing: '0.8px',
            color: '#798585',
            lineHeight: 1.5,
          }}
        >
          {label}
        </span>
      )}
      {children}
      {message && (
        <InlineMessage type={messageType}>{message}</InlineMessage>
      )}
    </div>
  )
}

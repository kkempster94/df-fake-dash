import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type TooltipSide = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  content: string
  side?: TooltipSide
  children: ReactNode
}

const TOOLTIP_POSITION: Record<TooltipSide, string> = {
  top:    'bottom-full mb-2 left-1/2 -translate-x-1/2',
  bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
  left:   'right-full mr-2 top-1/2 -translate-y-1/2',
  right:  'left-full ml-2 top-1/2 -translate-y-1/2',
}

const ARROW_CLASSES: Record<TooltipSide, string> = {
  top:    'absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5.75px] border-r-[5.75px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#101212]',
  bottom: 'absolute top-[-5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5.75px] border-r-[5.75px] border-b-[5px] border-l-transparent border-r-transparent border-b-[#101212]',
  left:   'absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5.75px] border-b-[5.75px] border-l-[5px] border-t-transparent border-b-transparent border-l-[#101212]',
  right:  'absolute left-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5.75px] border-b-[5.75px] border-r-[5px] border-t-transparent border-b-transparent border-r-[#101212]',
}

export function Tooltip({ content, side = 'top', children }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={cn(
            'absolute z-50 px-2 py-1.5 rounded-lg whitespace-nowrap pointer-events-none',
            TOOLTIP_POSITION[side],
          )}
          style={{ backgroundColor: '#101212', color: '#ffffff', fontSize: 11, letterSpacing: '0.22px' }}
        >
          {content}
          <span className={ARROW_CLASSES[side]} />
        </span>
      )}
    </span>
  )
}

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('bg-white rounded-[4px] w-full', className)}>
      {children}
    </div>
  )
}

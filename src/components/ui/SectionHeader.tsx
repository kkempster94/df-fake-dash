import type { ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  action?: ReactNode
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <p
        className="font-semibold whitespace-nowrap"
        style={{ fontSize: 14, color: '#101212', letterSpacing: '0.28px', lineHeight: 1.5 }}
      >
        {title}
      </p>
      {action ?? null}
    </div>
  )
}

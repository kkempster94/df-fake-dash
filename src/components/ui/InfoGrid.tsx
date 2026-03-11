import type { ReactNode } from 'react'

export interface InfoItem {
  label: string
  value: ReactNode
}

interface InfoGridProps {
  items: InfoItem[]
}

export function InfoGrid({ items }: InfoGridProps) {
  return (
    <div className="flex flex-wrap gap-x-12 gap-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col justify-center">
          <p
            className="uppercase font-medium whitespace-nowrap"
            style={{ fontSize: 10, color: '#798585', letterSpacing: '0.8px', lineHeight: 1.5 }}
          >
            {item.label}
          </p>
          <div
            className="flex items-center"
            style={{ minHeight: 32 }}
          >
            {typeof item.value === 'string' ? (
              <span
                className="font-semibold whitespace-nowrap"
                style={{ fontSize: 13, color: '#101212', letterSpacing: '0.26px' }}
              >
                {item.value}
              </span>
            ) : (
              item.value
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

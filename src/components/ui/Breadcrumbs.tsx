import { Fragment } from 'react'
import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label?: string
  node?: ReactNode     // fully custom crumb content — replaces label/leading/badge
  mono?: boolean       // render in PT Mono (for domain names, IDs, paths)
  onClick?: () => void
  badge?: ReactNode    // rendered after the label
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center" style={{ gap: 6 }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        const fontFamily = item.mono ? '"PT Mono", monospace' : 'inherit'
        const fontWeight = isLast ? 600 : 400
        const fontSize = item.mono ? 12 : 13
        const letterSpacing = item.mono ? '0.24px' : '0.26px'

        const labelNode = item.node ? item.node : item.onClick ? (
          <button
            onClick={item.onClick}
            className="cursor-pointer border-none bg-transparent p-0"
            style={{ color: '#101212', fontFamily, fontWeight, fontSize, letterSpacing }}
          >
            {item.label}
          </button>
        ) : (
          <span style={{ color: '#101212', fontFamily, fontWeight, fontSize, letterSpacing }}>
            {item.label}
          </span>
        )

        return (
          <Fragment key={i}>
            {i > 0 && (
              <ChevronRight
                aria-hidden="true"
                size={12}
                strokeWidth={1.8}
                style={{ color: '#798585', flexShrink: 0 }}
              />
            )}
            <span
              className="flex items-center gap-1.5 rounded"
              style={{
                backgroundColor: isLast ? 'rgba(255,255,255,0.7)' : 'transparent',
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 2,
                paddingBottom: 2,
              }}
            >
              {labelNode}
              {!item.node && item.badge}
            </span>
          </Fragment>
        )
      })}
    </nav>
  )
}

import type { ReactNode } from 'react'

interface PageHeaderProps {
  /** Title — plain text or a node (e.g. <>name <StatusBadge /></>) */
  title: ReactNode
  /** Subtitle / description line below the title */
  description?: ReactNode
  /** Action element (button) placed on the right of the title row */
  action?: ReactNode
  /** Optional content rendered below the divider (e.g. stats row, info grid) */
  children?: ReactNode
}

export function PageHeader({ title, description, action, children }: PageHeaderProps) {
  return (
    <div className="shrink-0 bg-white" style={{ borderBottom: '1px solid #e9ebed' }}>
      <div className="px-8 pt-4 pb-3">
        {/* Title row */}
        <div className="flex items-start justify-between">
          <div>
            <h1
              className="flex items-center"
              style={{
                gap: 12,
                fontSize: 21,
                fontWeight: 600,
                color: '#101212',
                letterSpacing: '0.42px',
                lineHeight: 1.5,
                margin: '0 0 2px',
              }}
            >
              {title}
            </h1>
            {description && (
              <p
                style={{
                  fontSize: 11,
                  color: '#798585',
                  letterSpacing: '0.22px',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {description}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: '#e9ebed', margin: '12px 0' }} />

        {/* Below-divider slot */}
        {children}
      </div>
    </div>
  )
}

import { Activity } from 'lucide-react'
import { auditLogEntries } from '@/data/mockData'
import type { StatusLevel } from '@/data/mockData'
import { StatusDot } from '@/components/ui/Badge'
import { ActionButton } from '@/components/ui/ActionButton'

const HEADER_STYLE = {
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: '0.8px',
  color: '#101212',
} as const

interface SummaryPart {
  text: string
  bold: boolean
}

function Summary({ parts }: { parts: SummaryPart[] }) {
  return (
    <p
      className="truncate w-full"
      style={{ fontSize: 13, color: '#101212', letterSpacing: '0.26px' }}
    >
      {parts.map((part, i) =>
        part.bold ? (
          <strong key={i} className="font-semibold">
            {part.text}
          </strong>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </p>
  )
}

function StatusDotCell({ status }: { status: StatusLevel }) {
  return (
    <div className="flex-none flex flex-col h-full justify-center pl-4" style={{ width: 46 }}>
      <StatusDot status={status} />
    </div>
  )
}

export function AuditLogs() {
  return (
    <section className="flex flex-col gap-3 w-full pb-4">
      {/* Section header */}
      <div className="flex items-center justify-between w-full">
        <p className="font-semibold text-h3 whitespace-nowrap" style={{ color: '#101212' }}>
          Recent audit logs for this trust domain
        </p>
        <ActionButton label="View all audit logs" Icon={Activity} />
      </div>

      <div className="bg-white w-full">
        {/* Table header */}
        <div
          className="flex h-[34px] items-center rounded-[4px]"
          style={{ backgroundColor: '#edf2f7' }}
        >
          <div className="flex-none" style={{ width: 46 }} />
          <div className="flex-1 flex flex-col h-full justify-center min-w-0">
            <div className="flex items-center py-[6px]">
              <span className="uppercase" style={HEADER_STYLE}>SUMMARY</span>
            </div>
          </div>
          <div className="flex-none flex flex-col h-full justify-center" style={{ width: 120 }}>
            <div className="flex items-center pl-2">
              <span className="uppercase" style={HEADER_STYLE}>TIME</span>
            </div>
          </div>
        </div>

        {/* Data rows */}
        {auditLogEntries.map((entry) => (
          <div
            key={entry.id}
            className="flex h-[34px] items-center"
            style={{ borderBottom: '1px solid #e9ebed' }}
          >
            <StatusDotCell status={entry.status} />
            <div className="flex-1 flex flex-col h-full justify-center min-w-0 overflow-hidden">
              <Summary parts={entry.parts} />
            </div>
            <div className="flex-none flex flex-col h-full justify-center pl-2" style={{ width: 120 }}>
              <span
                className="truncate"
                style={{ fontSize: 13, color: '#3e3e3e', letterSpacing: '0.26px' }}
              >
                {entry.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

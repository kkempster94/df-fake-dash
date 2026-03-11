import { Activity } from 'lucide-react'
import type { AuditLogEntry, StatusLevel } from '@/data/mockData'
import { Table, TableHeader, TableHeadCell, TableRow, TableCell } from '@/components/ui/Table'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatusDot } from '@/components/ui/Badge'
import { ActionButton } from '@/components/ui/ActionButton'

interface SummaryPart {
  text: string
  bold: boolean
}

function RichSummary({ parts }: { parts: SummaryPart[] }) {
  return (
    <p
      className="truncate w-full"
      style={{ fontSize: 13, color: '#101212', letterSpacing: '0.26px' }}
    >
      {parts.map((part, i) =>
        part.bold ? (
          <strong key={i} className="font-semibold">{part.text}</strong>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </p>
  )
}

interface AuditLogsProps {
  entries: AuditLogEntry[]
}

export function AuditLogs({ entries }: AuditLogsProps) {
  return (
    <section className="flex flex-col gap-3 w-full pb-4">
      <SectionHeader
        title="Recent audit logs for this trust domain"
        action={<ActionButton label="View all audit logs" Icon={Activity} />}
      />

      <Table>
        <TableHeader>
          <TableHeadCell width={46} />
          <TableHeadCell>SUMMARY</TableHeadCell>
          <TableHeadCell width={120}>TIME</TableHeadCell>
        </TableHeader>

        {entries.slice(0, 5).map((entry) => (
          <TableRow key={entry.id}>
            <TableCell width={46} className="pl-4">
              <StatusDot status={entry.status as StatusLevel} />
            </TableCell>
            <TableCell className="pl-0">
              <RichSummary parts={entry.parts} />
            </TableCell>
            <TableCell width={120}>
              <span
                className="truncate"
                style={{ fontSize: 13, color: '#3e3e3e', letterSpacing: '0.26px' }}
              >
                {entry.time}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </section>
  )
}

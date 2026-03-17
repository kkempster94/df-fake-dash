import { Activity } from 'lucide-react'
import type { StatusLevel } from '@/data/mockData'
import { useAuditLogsQuery } from '@/lib/queries'
import { Table, TableHeader, TableHeadCell, TableRow, TableCell, useColumnWidths } from '@/components/ui/Table'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Skeleton } from '@/components/ui/Skeleton'
import { StatusDot } from '@/components/ui/Badge'
import { ActionButton } from '@/components/ui/ActionButton'
import { QueryError } from '@/components/ui/QueryError'

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

export function AuditLogs() {
  const { data: entries = [], isLoading, isError, refetch } = useAuditLogsQuery()
  const { widths, setWidth } = useColumnWidths('audit-logs-cols', { time: 120 })

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
          <TableHeadCell width={widths.time} onResize={d => setWidth('time', Math.max(60, widths.time + d))}>TIME</TableHeadCell>
        </TableHeader>

        {isError ? (
          <QueryError message="Failed to load audit logs." onRetry={() => void refetch()} />
        ) : isLoading
          ? Array.from({ length: 5 }, (_, i) => (
              <TableRow key={i}>
                <TableCell width={46} className="pl-4">
                  <Skeleton width={8} height={8} className="rounded-full" />
                </TableCell>
                <TableCell className="pl-0">
                  <Skeleton height={13} className="w-3/4" />
                </TableCell>
                <TableCell width={widths.time}>
                  <Skeleton width={72} height={13} />
                </TableCell>
              </TableRow>
            ))
          : entries.slice(0, 5).map((entry) => (
              <TableRow key={entry.id}>
                <TableCell width={46} className="pl-4">
                  <StatusDot status={entry.status as StatusLevel} />
                </TableCell>
                <TableCell className="pl-0">
                  <RichSummary parts={entry.parts} />
                </TableCell>
                <TableCell width={widths.time}>
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

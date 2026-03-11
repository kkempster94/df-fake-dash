import { Eye } from 'lucide-react'
import type { CredentialLifespanRow } from '@/data/mockData'
import { Table, TableHeader, TableHeadCell, TableRow, TableCell } from '@/components/ui/Table'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CertificateBadge, AudienceTag } from '@/components/ui/Badge'
import { ActionButton } from '@/components/ui/ActionButton'

const CELL_TEXT = {
  fontSize: 13,
  color: '#3e3e3e',
  letterSpacing: '0.26px',
} as const

interface CredentialLifespanProps {
  data: CredentialLifespanRow[]
}

export function CredentialLifespan({ data }: CredentialLifespanProps) {
  return (
    <section className="flex flex-col gap-3 w-full pb-4">
      <SectionHeader
        title="Credential lifespan statistics"
        action={<ActionButton label="View all audiences" Icon={Eye} />}
      />

      <Table>
        <TableHeader>
          <TableHeadCell width={170} className="pl-4">CREDENTIAL TYPE</TableHeadCell>
          <TableHeadCell width={170}>CONFIGURED LIFETIME</TableHeadCell>
          <TableHeadCell width={170}>AVG REMAINING</TableHeadCell>
          <TableHeadCell>TOP AUDIENCES</TableHeadCell>
        </TableHeader>

        {data.map((row) => (
          <TableRow key={row.type}>
            <TableCell width={170} className="pl-4">
              <CertificateBadge type={row.type} />
            </TableCell>
            <TableCell width={170}>
              <span className="truncate" style={CELL_TEXT}>{row.configuredLifetime}</span>
            </TableCell>
            <TableCell width={170}>
              <span className="truncate" style={CELL_TEXT}>{row.avgRemaining}</span>
            </TableCell>
            <TableCell>
              {row.topAudiences.length > 0 ? (
                <div className="flex items-center gap-[10px] overflow-hidden">
                  {row.topAudiences.map((audience) => (
                    <AudienceTag key={audience} label={audience} />
                  ))}
                </div>
              ) : (
                <span style={CELL_TEXT}>n/a</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </section>
  )
}

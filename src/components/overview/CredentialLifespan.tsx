import { CloudCog } from 'lucide-react'
import type { CredentialLifespanRow } from '@/data/mockData'
import { Table, TableHeader, TableHeadCell, TableRow, TableCell, useColumnWidths } from '@/components/ui/Table'
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
  const { widths, setWidth } = useColumnWidths('credential-lifespan-cols', {
    credentialType: 170,
    configuredLifetime: 170,
    avgRemaining: 170,
  })

  return (
    <section className="flex flex-col gap-3 w-full pb-4">
      <SectionHeader
        title="Credential lifespan statistics"
        action={<ActionButton label="View all audiences" Icon={CloudCog} />}
      />

      <Table>
        <TableHeader>
          <TableHeadCell width={widths.credentialType} className="pl-4" onResize={d => setWidth('credentialType', Math.max(60, widths.credentialType + d))}>CREDENTIAL TYPE</TableHeadCell>
          <TableHeadCell width={widths.configuredLifetime} onResize={d => setWidth('configuredLifetime', Math.max(60, widths.configuredLifetime + d))}>CONFIGURED LIFETIME</TableHeadCell>
          <TableHeadCell width={widths.avgRemaining} onResize={d => setWidth('avgRemaining', Math.max(60, widths.avgRemaining + d))}>AVG REMAINING</TableHeadCell>
          <TableHeadCell>TOP AUDIENCES</TableHeadCell>
        </TableHeader>

        {data.map((row) => (
          <TableRow key={row.type}>
            <TableCell width={widths.credentialType} className="pl-4">
              <CertificateBadge type={row.type} />
            </TableCell>
            <TableCell width={widths.configuredLifetime}>
              <span className="truncate" style={CELL_TEXT}>{row.configuredLifetime}</span>
            </TableCell>
            <TableCell width={widths.avgRemaining}>
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

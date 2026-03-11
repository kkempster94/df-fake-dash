import type { WorkloadIdentity, WorkloadIdentityStatus } from '@/data/mockData'
import { Table, TableHeader, TableHeadCell, TableRow, TableCell } from '@/components/ui/Table'
import { MonoText } from '@/components/ui/MonoText'

const STATUS_CONFIG: Record<WorkloadIdentityStatus, { bg: string; color: string; label: string }> = {
  'active':          { bg: 'rgba(40,168,104,0.08)',  color: '#28a868', label: 'Active'          },
  'expiring-soon':   { bg: 'rgba(245,158,11,0.08)',  color: '#f59e0b', label: 'Expiring soon'   },
  'no-active-svids': { bg: 'rgba(121,133,133,0.1)',  color: '#798585', label: 'No active SVIDs' },
}

function StatusBadge({ status }: { status: WorkloadIdentityStatus }) {
  const { bg, color, label } = STATUS_CONFIG[status]
  return (
    <span
      className="inline-flex items-center justify-center rounded whitespace-nowrap"
      style={{ backgroundColor: bg, color, fontSize: 11, fontWeight: 600, letterSpacing: '0.22px', padding: '2px 8px' }}
    >
      {label}
    </span>
  )
}

interface IdentitiesTabProps {
  identities: WorkloadIdentity[]
}

export function IdentitiesTab({ identities }: IdentitiesTabProps) {
  return (
    <div className="flex flex-col gap-4 w-full pb-9">
      <Table>
        <TableHeader>
          <TableHeadCell className="pl-4">SPIFFE ID</TableHeadCell>
          <TableHeadCell width={130}>ACTIVE SVIDS</TableHeadCell>
          <TableHeadCell width={150}>LAST ISSUED</TableHeadCell>
          <TableHeadCell width={150}>STATUS</TableHeadCell>
        </TableHeader>

        {identities.map((wi) => (
          <TableRow key={wi.id}>
            <TableCell className="pl-4">
              <MonoText muted>{wi.spiffeId}</MonoText>
            </TableCell>
            <TableCell width={130}>
              <span style={{ fontSize: 13, color: '#101212', letterSpacing: '0.26px' }}>
                {wi.activeSvids}
              </span>
            </TableCell>
            <TableCell width={150}>
              <span style={{ fontSize: 13, color: '#798585', letterSpacing: '0.26px' }}>
                {wi.lastIssued}
              </span>
            </TableCell>
            <TableCell width={150}>
              <StatusBadge status={wi.status} />
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  )
}

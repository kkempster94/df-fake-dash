import { Layers, CloudCog } from 'lucide-react'
import { useActiveDomainQuery } from '@/lib/queries'
import { Skeleton } from '@/components/ui/Skeleton'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Table, TableHeader, TableHeadCell, TableRow, TableCell } from '@/components/ui/Table'
import { GraphPanel } from './GraphPanel'
import { WorkloadChart } from './WorkloadChart'
import { CredentialChart, CredentialChartLegend } from './CredentialChart'
import { TrustDomainURLs } from './TrustDomainURLs'
import { CredentialLifespan } from './CredentialLifespan'
import { AuditLogs } from './AuditLogs'
import { QueryError } from '@/components/ui/QueryError'

interface OverviewProps {
  onViewWorkloads: () => void
}

function GraphPanelSkeleton() {
  return (
    <div className="bg-white flex-1 flex flex-col gap-3 rounded-[4px] min-w-0">
      <div className="flex items-baseline justify-between pb-3">
        <div className="flex flex-col gap-1.5">
          <Skeleton width={128} height={18} />
          <Skeleton width={210} height={13} />
        </div>
        <Skeleton width={52} height={24} />
      </div>
      <Skeleton className="w-full" height={100} />
      <div className="flex justify-end">
        <Skeleton width={130} height={18} />
      </div>
    </div>
  )
}

function TableSectionSkeleton({ rows, cols }: { rows: number; cols: number }) {
  return (
    <Table>
      <TableHeader>
        {Array.from({ length: cols }, (_, i) => (
          <TableHeadCell key={i} />
        ))}
      </TableHeader>
      {Array.from({ length: rows }, (_, i) => (
        <TableRow key={i}>
          {Array.from({ length: cols }, (_, j) => (
            <TableCell key={j} className="pl-4">
              <Skeleton height={14} className="w-3/4" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </Table>
  )
}

function OverviewSkeleton(_props: OverviewProps) {
  return (
    <div className="flex flex-col gap-4 w-full pb-9">
      <div className="flex gap-6 items-start w-full">
        <GraphPanelSkeleton />
        <GraphPanelSkeleton />
      </div>

      <section className="flex flex-col gap-3 w-full pb-4">
        <SectionHeader title="Trust domain URLs" />
        <TableSectionSkeleton rows={3} cols={3} />
      </section>

      <section className="flex flex-col gap-3 w-full pb-4">
        <SectionHeader title="Credential lifespan statistics" />
        <TableSectionSkeleton rows={2} cols={4} />
      </section>

      {/* AuditLogs always renders so its query starts in parallel */}
      <AuditLogs />
    </div>
  )
}

export function Overview({ onViewWorkloads }: OverviewProps) {
  const { data: domain, isLoading, isError, refetch } = useActiveDomainQuery()

  if (isLoading) return <OverviewSkeleton onViewWorkloads={onViewWorkloads} />
  if (isError) return <QueryError message="Failed to load trust domain data." onRetry={() => void refetch()} className="py-24" />
  if (!domain) return null

  const totalWorkloads = parseInt(domain.chartTotals.workloads.replace(/,/g, ''), 10)

  return (
    <div className="flex flex-col gap-4 w-full pb-9">
      {/* Charts row */}
      <div className="flex gap-6 items-start w-full">
        <GraphPanel
          title="Active workloads"
          subtitle="Credentialed workloads by SPIFFE ID"
          total={domain.chartTotals.workloads}
          actionLabel="View all workloads"
          ActionIcon={Layers}
          onActionClick={onViewWorkloads}
          chart={<WorkloadChart data={domain.workloadChartData} total={totalWorkloads} />}
        />
        <GraphPanel
          title="Credential issuance"
          subtitle="Issued and rotated SPIFFE credentials"
          total={domain.chartTotals.credentials}
          actionLabel="View all active SVIDs"
          ActionIcon={CloudCog}
          chart={<CredentialChart data={domain.credentialChartData} />}
          legend={<CredentialChartLegend />}
        />
      </div>

      <TrustDomainURLs urls={domain.trustDomainURLs} />
      <CredentialLifespan data={domain.credentialLifespanData} />
      <AuditLogs />
    </div>
  )
}

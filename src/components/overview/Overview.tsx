import { Layers, CloudCog } from 'lucide-react'
import type { TrustDomainRecord } from '@/data/mockData'
import { GraphPanel } from './GraphPanel'
import { WorkloadChart } from './WorkloadChart'
import { CredentialChart, CredentialChartLegend } from './CredentialChart'
import { TrustDomainURLs } from './TrustDomainURLs'
import { CredentialLifespan } from './CredentialLifespan'
import { AuditLogs } from './AuditLogs'

interface OverviewProps {
  domain: TrustDomainRecord
  onViewWorkloads: () => void
}

export function Overview({ domain, onViewWorkloads }: OverviewProps) {
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
      <AuditLogs entries={domain.auditLogEntries} />
    </div>
  )
}

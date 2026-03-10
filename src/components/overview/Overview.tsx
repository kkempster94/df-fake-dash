import { Layers, Eye } from 'lucide-react'
import { GraphPanel } from './GraphPanel'
import { WorkloadChart } from './WorkloadChart'
import { CredentialChart, CredentialChartLegend } from './CredentialChart'
import { TrustDomainURLs } from './TrustDomainURLs'
import { CredentialLifespan } from './CredentialLifespan'
import { AuditLogs } from './AuditLogs'

export function Overview() {
  return (
    <div className="flex flex-col gap-4 w-full pb-9">
      {/* Charts row */}
      <div className="flex gap-6 items-start w-full">
        <GraphPanel
          title="Active workloads"
          subtitle="Credentialed workloads by SPIFFE ID"
          total="847"
          actionLabel="View all workloads"
          ActionIcon={Layers}
          chart={<WorkloadChart />}
        />
        <GraphPanel
          title="Credential issuance"
          subtitle="Issued and rotated SPIFFE credentials"
          total="12,453"
          actionLabel="View all active SVIDs"
          ActionIcon={Eye}
          chart={<CredentialChart />}
          legend={<CredentialChartLegend />}
        />
      </div>

      {/* Trust domain URLs */}
      <TrustDomainURLs />

      {/* Credential lifespan stats */}
      <CredentialLifespan />

      {/* Audit logs */}
      <AuditLogs />
    </div>
  )
}

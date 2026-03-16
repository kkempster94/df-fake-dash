// ── Types ──────────────────────────────────────────────────────────────────────

export type StatusLevel = 'good' | 'degraded' | 'bad'
export type CredentialType = 'x509' | 'jwt'
export type WorkloadIdentityStatus = 'active' | 'expiring-soon' | 'no-active-svids'

export interface CredentialLifespanRow {
  type: CredentialType
  configuredLifetime: string
  avgRemaining: string
  topAudiences: string[]
}

export interface AuditLogEntry {
  id: string
  status: StatusLevel
  parts: Array<{ text: string; bold: boolean }>
  time: string
}

export interface TrustDomainStat {
  label: string
  value: string
  dot: boolean
}

export interface WorkloadIdentity {
  id: string
  spiffeId: string
  activeSvids: number
  lastIssued: string
  status: WorkloadIdentityStatus
  trend: number[]
}

export interface SvidStat {
  label: string
  value: string
}

export interface SvidTimeseriesPoint {
  x509: number
  jwt: number
}

export interface TrustDomainRecord {
  id: string
  name: string
  status: StatusLevel
  subtitle: string
  stats: TrustDomainStat[]
  chartTotals: { workloads: string; credentials: string }
  workloadChartData: Array<{ index: number; value: number }>
  credentialChartData: Array<{ x509: number; jwt: number }>
  trustDomainURLs: Array<{ type: string; url: string }>
  credentialLifespanData: CredentialLifespanRow[]
  auditLogEntries: AuditLogEntry[]
  workloadIdentities: WorkloadIdentity[]
  svidStats: SvidStat[]
  svidTimeseries: SvidTimeseriesPoint[]
}

// ── Internal generators ────────────────────────────────────────────────────────

function getAuditTime(i: number): string {
  if (i < 10)  return `${(i + 1) * 3} secs ago`
  if (i < 70)  return `${i - 8} mins ago`
  if (i < 360) return `${Math.floor((i - 69) / 12) + 1} hours ago`
  return `${Math.floor((i - 360) / 100) + 1} days ago`
}

function getLastIssued(i: number): string {
  if (i < 5)   return `${(i + 1) * 10} secs ago`
  if (i < 30)  return `${i - 3} mins ago`
  if (i < 100) return `${Math.floor((i - 29) / 10) + 1} hours ago`
  return `${Math.floor((i - 100) / 50) + 1} days ago`
}

function generateAuditLogs(
  domainName: string,
  clusters: string[],
  namespaces: string[],
  pods: string[],
  agents: string[],
  servers: string[],
  keys: string[],
  count: number,
): AuditLogEntry[] {
  const entries: AuditLogEntry[] = []
  for (let i = 0; i < count; i++) {
    const ns      = namespaces[i % namespaces.length]
    const spiffe  = `spiffe://${domainName}/${ns}/sa/svc-${i % 7}`
    const cluster = clusters[i % clusters.length]
    const pod     = pods[i % pods.length]
    const agent   = agents[i % agents.length]
    const server  = servers[i % servers.length]
    const key     = keys[i % keys.length]
    const aud     = `audience-${i % 5}.example.com`
    const time    = getAuditTime(i)

    let status: StatusLevel
    let parts: Array<{ text: string; bold: boolean }>

    switch (i % 10) {
      case 0:
        status = 'good'
        parts = [{ text: 'SVID issued for ', bold: false }, { text: spiffe, bold: true }]
        break
      case 1:
        status = 'bad'
        parts = [{ text: 'SVID issuance failed for ', bold: false }, { text: spiffe, bold: true }, { text: ' — signing key validation error', bold: false }]
        break
      case 2:
        status = 'degraded'
        parts = [{ text: 'Workload attestation failed for pod ', bold: false }, { text: pod, bold: true }, { text: ' in cluster ', bold: false }, { text: cluster, bold: true }, { text: ' — invalid selectors', bold: false }]
        break
      case 3:
        status = 'good'
        parts = [{ text: 'Agent ', bold: false }, { text: agent, bold: true }, { text: ' connected to cluster ', bold: false }, { text: cluster, bold: true }]
        break
      case 4:
        status = 'good'
        parts = [{ text: 'Trust bundle rotated successfully — new X.509 key ', bold: false }, { text: key, bold: true }, { text: ' activated', bold: false }]
        break
      case 5:
        status = 'degraded'
        parts = [{ text: 'SVID expiring in 5 minutes for ', bold: false }, { text: spiffe, bold: true }]
        break
      case 6:
        status = 'good'
        parts = [{ text: 'Health check passed for server ', bold: false }, { text: server, bold: true }]
        break
      case 7:
        status = 'good'
        parts = [{ text: 'JWT SVID issued for audience ', bold: false }, { text: aud, bold: true }]
        break
      case 8:
        status = 'bad'
        parts = [{ text: 'Certificate validation failed for ', bold: false }, { text: spiffe, bold: true }]
        break
      default:
        status = 'good'
        parts = [{ text: 'Workload ', bold: false }, { text: spiffe, bold: true }, { text: ' re-attested successfully', bold: false }]
    }
    entries.push({ id: `al-${i + 1}`, status, parts, time })
  }
  return entries
}

function generateTrend(seed: number): number[] {
  let v = seed
  return Array.from({ length: 7 }, () => {
    v = (v * 1664525 + 1013904223) & 0xffffffff
    return 10 + (Math.abs(v) % 50)
  })
}

function generateWorkloadIdentities(
  domainName: string,
  paths: string[],
  count: number,
): WorkloadIdentity[] {
  const svidCounts = [1, 3, 4, 8, 11, 24, 32, 38, 72]
  return Array.from({ length: count }, (_, i) => ({
    id: `wi-${i + 1}`,
    spiffeId: `spiffe://${domainName}/${paths[i % paths.length]}`,
    activeSvids: svidCounts[i % svidCounts.length],
    lastIssued: getLastIssued(i),
    status: (i % 20 === 19 ? 'no-active-svids' : i % 10 === 9 ? 'expiring-soon' : 'active') as WorkloadIdentityStatus,
    trend: generateTrend(i * 137 + 42),
  }))
}

function generateChartData(count: number, minVal: number, maxVal: number, seed: number) {
  let v = seed
  return Array.from({ length: count }, (_, i) => {
    v = (v * 1664525 + 1013904223) & 0xffffffff
    return { index: i, value: minVal + (Math.abs(v) % (maxVal - minVal)) }
  })
}

function generateSvidTimeseries(seed: number): SvidTimeseriesPoint[] {
  let v = seed
  return Array.from({ length: 145 }, () => {
    v = (v * 1664525 + 1013904223) & 0xffffffff
    const total = 5 + (Math.abs(v) % 46)
    v = (v * 1664525 + 1013904223) & 0xffffffff
    const x509 = Math.round(total * (0.70 + (Math.abs(v) % 20) / 100))
    return { x509, jwt: Math.max(0, total - x509) }
  })
}

function generateCredentialChartData(count: number, x509Min: number, x509Max: number, jwtRatio: number, seed: number) {
  let v = seed
  return Array.from({ length: count }, () => {
    v = (v * 1664525 + 1013904223) & 0xffffffff
    const x509 = x509Min + (Math.abs(v) % (x509Max - x509Min))
    return { x509, jwt: Math.round(x509 * jwtRatio * 1000) / 1000 }
  })
}

const SUBTITLE = 'A trust domain represents a security boundary for SPIFFE identity issuance and validation.'

// ── Trust domains ──────────────────────────────────────────────────────────────

export const trustDomains: TrustDomainRecord[] = [
  (() => {
    const name = 'production.newco.com'
    return {
      id: 'production', name, status: 'good' as StatusLevel, subtitle: SUBTITLE,
      stats: [
        { label: 'Trust Domain ID',          value: 'td_abc123def456', dot: false },
        { label: 'Organization ID',          value: 'org_xyz789',       dot: false },
        { label: 'Trust Domain Deployments', value: '8',                dot: true  },
        { label: 'Trust Domain Servers',     value: '4',                dot: true  },
        { label: 'Clusters',                 value: '12',               dot: true  },
        { label: 'Agents',                   value: '127',              dot: true  },
        { label: 'Active Workloads',         value: '847',              dot: true  },
        { label: 'Active Credentials',       value: '12.4K',            dot: true  },
      ],
      chartTotals: { workloads: '847', credentials: '12,453' },
      workloadChartData: generateChartData(66, 67, 95, 42),
      credentialChartData: generateCredentialChartData(50, 65, 95, 0.265, 123),
      trustDomainURLs: [
        { type: 'Trust Bundle URL',   url: `https://api.defakto.io/v1/trust-bundle/${name}` },
        { type: 'OIDC Discovery URL', url: `https://oidc.defakto.io/${name}/.well-known/openid-configuration` },
      ],
      credentialLifespanData: [
        { type: 'x509' as CredentialType, configuredLifetime: '1 hour',  avgRemaining: '42 min',  topAudiences: [] },
        { type: 'jwt'  as CredentialType, configuredLifetime: '5 min',   avgRemaining: '3 min',   topAudiences: ['api.example.com', 'auth.example.com', 'payments.internal', 'gateway.example.com'] },
      ],
      auditLogEntries: generateAuditLogs(name,
        ['prod-us-east-1', 'prod-us-west-2', 'prod-eu-west-1'],
        ['api', 'payments', 'data', 'monitoring', 'legacy', 'auth'],
        ['checkout-7f3a2b', 'payment-proc-9d2e1f', 'etl-worker-3a8c5b', 'api-gw-6e4d2a', 'monitor-ff1234', 'auth-svc-bb9900'],
        ['agent-prod-us1-9c4d1e', 'agent-prod-us2-3b7f2a', 'agent-prod-eu1-5e8c3d'],
        ['srv-prod-us-east-01', 'srv-prod-us-west-01', 'srv-prod-eu-01'],
        ['key_x509_02', 'key_x509_03', 'key_jwt_01'],
        1000,
      ),
      workloadIdentities: generateWorkloadIdentities(name, [
        'ns/api/sa/gateway', 'ns/api/sa/ingress', 'ns/api/sa/load-balancer',
        'ns/payments/sa/checkout', 'ns/payments/sa/processor', 'ns/payments/sa/refund-svc',
        'ns/data/sa/etl-worker', 'ns/data/sa/pipeline-runner', 'ns/data/sa/transformer',
        'ns/monitoring/sa/prometheus', 'ns/monitoring/sa/alertmanager', 'ns/monitoring/sa/grafana',
        'ns/legacy/sa/auth-bridge', 'ns/legacy/sa/session-store',
        'ns/auth/sa/validator', 'ns/auth/sa/token-service', 'ns/auth/sa/oauth-proxy',
        'ns/payments/sa/fraud-detector', 'ns/api/sa/rate-limiter', 'ns/data/sa/archiver',
      ], 100),
      svidStats: [
        { label: 'Total workload identities', value: '847'        },
        { label: 'Related clusters',          value: '9'          },
        { label: 'Active SVIDs',              value: '12,453'     },
        { label: 'X.509',                     value: '11,827'     },
        { label: 'JWT',                       value: '626'        },
        { label: 'SVIDs issued today',        value: '1,234'      },
        { label: 'Issuance failures',         value: '23 (0.02%)' },
      ],
      svidTimeseries: generateSvidTimeseries(42),
    }
  })(),

  (() => {
    const name = 'staging.newco.com'
    return {
      id: 'staging', name, status: 'good' as StatusLevel, subtitle: SUBTITLE,
      stats: [
        { label: 'Trust Domain ID',          value: 'td_def456ghi789', dot: false },
        { label: 'Organization ID',          value: 'org_xyz789',       dot: false },
        { label: 'Trust Domain Deployments', value: '3',                dot: true  },
        { label: 'Trust Domain Servers',     value: '2',                dot: true  },
        { label: 'Clusters',                 value: '4',                dot: true  },
        { label: 'Agents',                   value: '41',               dot: true  },
        { label: 'Active Workloads',         value: '203',              dot: true  },
        { label: 'Active Credentials',       value: '3.1K',             dot: true  },
      ],
      chartTotals: { workloads: '203', credentials: '3,147' },
      workloadChartData: generateChartData(66, 28, 52, 77),
      credentialChartData: generateCredentialChartData(50, 25, 52, 0.27, 456),
      trustDomainURLs: [
        { type: 'Trust Bundle URL',   url: `https://api.defakto.io/v1/trust-bundle/${name}` },
        { type: 'OIDC Discovery URL', url: `https://oidc.defakto.io/${name}/.well-known/openid-configuration` },
      ],
      credentialLifespanData: [
        { type: 'x509' as CredentialType, configuredLifetime: '2 hours',  avgRemaining: '1 hour 12 min', topAudiences: [] },
        { type: 'jwt'  as CredentialType, configuredLifetime: '15 min',   avgRemaining: '8 min',          topAudiences: ['api-stg.example.com', 'auth-stg.example.com'] },
      ],
      auditLogEntries: generateAuditLogs(name,
        ['stg-us-east-1', 'stg-eu-west-1'],
        ['api', 'payments', 'test', 'qa', 'auth'],
        ['api-gw-stg-3a1b', 'checkout-stg-7d2e', 'test-runner-5f9c', 'qa-suite-2b4e', 'auth-stg-8c1f'],
        ['agent-stg-us1-2a3b4c', 'agent-stg-eu1-5d6e7f'],
        ['srv-stg-us-01', 'srv-stg-eu-01'],
        ['key_x509_stg_01', 'key_jwt_stg_01'],
        1000,
      ),
      workloadIdentities: generateWorkloadIdentities(name, [
        'ns/api/sa/gateway', 'ns/api/sa/ingress',
        'ns/payments/sa/checkout', 'ns/payments/sa/processor',
        'ns/test/sa/integration-runner', 'ns/test/sa/e2e-runner',
        'ns/qa/sa/smoke-test', 'ns/qa/sa/regression-suite',
        'ns/auth/sa/validator', 'ns/auth/sa/token-service',
      ], 40),
      svidStats: [
        { label: 'Total workload identities', value: '203'        },
        { label: 'Related clusters',          value: '4'          },
        { label: 'Active SVIDs',              value: '3,147'      },
        { label: 'X.509',                     value: '2,876'      },
        { label: 'JWT',                       value: '271'        },
        { label: 'SVIDs issued today',        value: '412'        },
        { label: 'Issuance failures',         value: '2 (0.05%)' },
      ],
      svidTimeseries: generateSvidTimeseries(77),
    }
  })(),

  (() => {
    const name = 'dev.newco.com'
    return {
      id: 'dev', name, status: 'degraded' as StatusLevel, subtitle: SUBTITLE,
      stats: [
        { label: 'Trust Domain ID',          value: 'td_jkl012mno345', dot: false },
        { label: 'Organization ID',          value: 'org_xyz789',       dot: false },
        { label: 'Trust Domain Deployments', value: '1',                dot: true  },
        { label: 'Trust Domain Servers',     value: '1',                dot: true  },
        { label: 'Clusters',                 value: '2',                dot: true  },
        { label: 'Agents',                   value: '12',               dot: true  },
        { label: 'Active Workloads',         value: '58',               dot: true  },
        { label: 'Active Credentials',       value: '412',              dot: true  },
      ],
      chartTotals: { workloads: '58', credentials: '412' },
      workloadChartData: generateChartData(66, 5, 22, 999),
      credentialChartData: generateCredentialChartData(50, 5, 22, 0.28, 789),
      trustDomainURLs: [
        { type: 'Trust Bundle URL',   url: `https://api.defakto.io/v1/trust-bundle/${name}` },
        { type: 'OIDC Discovery URL', url: `https://oidc.defakto.io/${name}/.well-known/openid-configuration` },
      ],
      credentialLifespanData: [
        { type: 'x509' as CredentialType, configuredLifetime: '24 hours', avgRemaining: '18 hours', topAudiences: [] },
        { type: 'jwt'  as CredentialType, configuredLifetime: '1 hour',   avgRemaining: '23 min',   topAudiences: ['localhost:3000', 'dev.example.com'] },
      ],
      auditLogEntries: generateAuditLogs(name,
        ['dev-cluster-local', 'kind-dev-01'],
        ['api', 'test', 'dev', 'local'],
        ['api-dev-1a2b', 'test-dev-3c4d', 'dev-svc-5e6f', 'local-mock-7g8h'],
        ['agent-dev-local-1a2b3c'],
        ['srv-dev-01'],
        ['key_x509_dev_01'],
        1000,
      ),
      workloadIdentities: generateWorkloadIdentities(name, [
        'ns/api/sa/gateway',
        'ns/test/sa/unit-runner', 'ns/test/sa/integration-runner',
        'ns/dev/sa/local-service', 'ns/dev/sa/mock-backend',
        'ns/local/sa/mock-server', 'ns/local/sa/dev-proxy',
        'ns/api/sa/debug-handler',
      ], 20),
      svidStats: [
        { label: 'Total workload identities', value: '58'         },
        { label: 'Related clusters',          value: '2'          },
        { label: 'Active SVIDs',              value: '412'        },
        { label: 'X.509',                     value: '381'        },
        { label: 'JWT',                       value: '31'         },
        { label: 'SVIDs issued today',        value: '89'         },
        { label: 'Issuance failures',         value: '7 (1.73%)' },
      ],
      svidTimeseries: generateSvidTimeseries(999),
    }
  })(),
]

export const DEFAULT_DOMAIN_ID = 'production'

export const sidebarNavItems = [
  { id: 'overview',   label: 'Overview',   icon: 'layers'      },
  { id: 'workloads',  label: 'Workloads',  icon: 'cpu'         },
  { id: 'identities', label: 'Identities', icon: 'fingerprint' },
  { id: 'agents',     label: 'Agents',     icon: 'bot'         },
  { id: 'federation', label: 'Federation', icon: 'network'     },
  { id: 'policies',   label: 'Policies',   icon: 'shield'      },
  { id: 'audit-logs', label: 'Audit Logs', icon: 'activity'    },
]

// ── Workflow mock ──────────────────────────────────────────────────────────────

export interface WorkflowSubStep {
  id: string
  label: string
  completed?: boolean
}

export interface WorkflowWizardStep {
  id: string
  title: string
  subSteps: WorkflowSubStep[]
}

export const workflowMeta = {
  id: 'wf_2025_0147',
  riskScore: '5 / 10',
  riskLevel: 'Concerning' as 'Good' | 'Concerning' | 'Bad',
  remediationType: 'Credential migration',
  providerType: 'AWS',
  status: 'Planning' as const,
  application: 'payment service',
  securityOwner: 'bob@newco.com',
  applicationOwner: 'alice@newco.com',
  deployment: 'payment-service-prod',
  originalCredential: 'AKIA4EXAMPLE1234',
  created: 'January 10, 2025',
  lastUpdated: 'January 14, 2025',
}

export const workflowSteps: WorkflowWizardStep[] = [
  {
    id: 'step-1',
    title: 'Step 1: Plan migration',
    subSteps: [
      { id: 'ss-1-1', label: 'Assign app owner',      completed: false },
      { id: 'ss-1-2', label: 'Assign security owner', completed: false },
    ],
  },
  {
    id: 'step-2',
    title: 'Step 2: Clone IAM account long step name',
    subSteps: [
      { id: 'ss-2-1', label: 'Create a federated identity credential in Entra', completed: false },
    ],
  },
  {
    id: 'step-3',
    title: 'Step 3: Deploy SVID',
    subSteps: [
      { id: 'ss-3-1', label: 'Create a federated token file containing JWT SVIDs', completed: false },
      { id: 'ss-3-2', label: 'Set the token file environment variable',           completed: false },
      { id: 'ss-3-3', label: 'Set the Azure tenant ID environment variable',      completed: false },
    ],
  },
  {
    id: 'step-4',
    title: 'Step 4: Retire secret',
    subSteps: [
      { id: 'ss-4-1', label: 'Delete the original credential', completed: false },
    ],
  },
]

export const workflowStepContent: Record<string, {
  objective: { title: string; body: string }
  sections: Array<{
    title: string
    body: string
    tabs: Array<{ id: string; label: string; code: string }>
  }>
}> = {
  'step-1': {
    objective: {
      title: 'Objective',
      body: 'Assign ownership roles before beginning the migration. Ensure both the application owner and security owner are identified and have accepted responsibility.',
    },
    sections: [],
  },
  'step-2': {
    objective: {
      title: 'Objective',
      body: 'Allow the Defakto identity of the workload to authenticate as the Entra application. Review and execute the steps below.',
    },
    sections: [
      {
        title: 'Create a new Federated Identity Credential for Defakto',
        body: 'Use the details below to create a new Federated Identity Credential in Microsoft Entra. After creation, trigger a manual scan using the button above to refresh the data. Once the credential is detected and matches the required details, the migration can proceed.',
        tabs: [
          {
            id: 'azure-cli',
            label: 'Azure CLI',
            code: `az ad app federated-credential create \\
  --id app-obj-003-analytics-dashboard \\
  --parameters '{
  "name": "analytics-dashboard-federation",
  "issuer": "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/",
  "subject": "system:serviceaccount:analytics:analytics-dashboard-sa",
  "description": "Federated credential for analytics dashboard service account",
  "audiences": ["api://AzureADTokenExchange"]
}'`,
          },
          {
            id: 'terraform',
            label: 'Terraform',
            code: `resource "azuread_application_federated_identity_credential" "example" {
  application_id = "/applications/app-obj-003-analytics-dashboard"
  display_name   = "analytics-dashboard-federation"
  audiences      = ["api://AzureADTokenExchange"]
  issuer         = "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/"
  subject        = "system:serviceaccount:analytics:analytics-dashboard-sa"
}`,
          },
          {
            id: 'azure-portal',
            label: 'Azure portal',
            code: `// Navigate to: Azure Portal > App registrations > analytics-dashboard
// Select: Certificates & secrets > Federated credentials > Add credential
//
// Federated credential scenario: Other issuer
// Issuer:  https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/
// Subject: system:serviceaccount:analytics:analytics-dashboard-sa
// Name:    analytics-dashboard-federation`,
          },
          {
            id: 'data-only',
            label: 'Data only',
            code: `issuer:   https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/
subject:  system:serviceaccount:analytics:analytics-dashboard-sa
audience: api://AzureADTokenExchange
name:     analytics-dashboard-federation`,
          },
        ],
      },
    ],
  },
  'step-3': {
    objective: {
      title: 'Objective',
      body: 'Configure the workload to use JWT SVIDs for authentication by setting the required environment variables.',
    },
    sections: [
      {
        title: 'Create a federated token file containing JWT SVIDs',
        body: 'The Defakto agent will write a JWT SVID to this file path. Configure your application to read credentials from this location.',
        tabs: [
          {
            id: 'env',
            label: 'Environment',
            code: `# Add to your deployment manifest or .env file
DEFAKTO_TOKEN_FILE=/var/run/defakto/token
AWS_WEB_IDENTITY_TOKEN_FILE=/var/run/defakto/token
AWS_ROLE_ARN=arn:aws:iam::123456789012:role/payment-service-role`,
          },
        ],
      },
    ],
  },
  'step-4': {
    objective: {
      title: 'Objective',
      body: 'Once the SVID-based authentication is confirmed working, safely retire the original static credential to complete the migration.',
    },
    sections: [
      {
        title: 'Delete the original credential',
        body: 'Verify the new credential is functioning before deletion. Run the rescan above to confirm the original credential is no longer in active use.',
        tabs: [
          {
            id: 'aws-cli',
            label: 'AWS CLI',
            code: `# Deactivate first, then delete after confirming no usage
aws iam update-access-key \\
  --access-key-id AKIA4EXAMPLE1234 \\
  --status Inactive

# After confirming no active usage:
aws iam delete-access-key \\
  --access-key-id AKIA4EXAMPLE1234`,
          },
        ],
      },
    ],
  },
}

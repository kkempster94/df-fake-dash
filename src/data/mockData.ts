// Active workloads chart — bar heights from Figma (as relative values 0–100)
export const workloadChartData = [
  67.671, 67.671, 69.298, 69.298, 65.719, 65.719, 70.925, 70.925,
  72.226, 72.226, 70.274, 70.274, 70.925, 70.925, 72.226, 72.226,
  73.527, 73.527, 71.575, 71.575, 67.021, 67.021, 76.781, 76.781,
  78.733, 78.733, 79.384, 79.384, 81.336, 81.336, 83.288, 83.288,
  81.336, 81.336, 83.288, 83.288, 85.24, 85.24, 85.24, 85.24,
  87.842, 87.842, 83.938, 83.938, 85.24, 85.24, 87.192, 87.192,
  90.445, 90.445, 90.445, 90.445, 89.144, 89.144, 91.096, 91.096,
  91.096, 91.096, 92.397, 92.397, 89.144, 89.144, 90.445, 90.445,
  95, 95,
].map((value, index) => ({ index, value }))

// Credential issuance chart — alternating X.509 and JWT bars
export const credentialChartData = [
  { x509: 67.671, jwt: 17.887 },
  { x509: 69.298, jwt: 18.317 },
  { x509: 65.719, jwt: 17.371 },
  { x509: 70.925, jwt: 18.747 },
  { x509: 72.226, jwt: 19.091 },
  { x509: 70.274, jwt: 18.575 },
  { x509: 70.925, jwt: 18.747 },
  { x509: 72.226, jwt: 19.091 },
  { x509: 73.527, jwt: 19.435 },
  { x509: 71.575, jwt: 18.919 },
  { x509: 67.021, jwt: 17.715 },
  { x509: 76.781, jwt: 20.295 },
  { x509: 78.733, jwt: 20.811 },
  { x509: 79.384, jwt: 25.229 },
  { x509: 81.336, jwt: 25.849 },
  { x509: 83.288, jwt: 26.47 },
  { x509: 81.336, jwt: 25.849 },
  { x509: 83.288, jwt: 26.47 },
  { x509: 85.24, jwt: 27.09 },
  { x509: 85.24, jwt: 27.09 },
  { x509: 87.842, jwt: 27.917 },
  { x509: 83.938, jwt: 26.677 },
  { x509: 85.24, jwt: 27.09 },
  { x509: 87.192, jwt: 27.711 },
  { x509: 90.445, jwt: 34.275 },
  { x509: 90.445, jwt: 34.275 },
  { x509: 89.144, jwt: 33.781 },
  { x509: 91.096, jwt: 34.521 },
  { x509: 91.096, jwt: 34.521 },
  { x509: 92.397, jwt: 35.014 },
  { x509: 89.144, jwt: 33.781 },
  { x509: 90.445, jwt: 34.275 },
  { x509: 95, jwt: 36.001 },
]

export const trustDomainURLs = [
  {
    type: 'Trust Bundle URL',
    url: 'https://api.defakto.io/v1/trust-bundle/production.example.com',
  },
  {
    type: 'OIDC Discovery URL',
    url: 'https://oidc.defakto.io/production.example.com/.well-known/openid-configuration',
  },
]

export type CredentialType = 'x509' | 'jwt'

export interface CredentialLifespanRow {
  type: CredentialType
  configuredLifetime: string
  avgRemaining: string
  topAudiences: string[]
}

export const credentialLifespanData: CredentialLifespanRow[] = [
  {
    type: 'x509',
    configuredLifetime: '1 hour',
    avgRemaining: '42 min',
    topAudiences: [],
  },
  {
    type: 'jwt',
    configuredLifetime: '5 min',
    avgRemaining: '3 min',
    topAudiences: [
      'api.example.com',
      'auth.example.com',
      'payments.internal',
      'gateway.example.com',
    ],
  },
]

export type StatusLevel = 'good' | 'degraded' | 'bad'

export interface AuditLogEntry {
  id: string
  status: StatusLevel
  summary: React.ReactNode
  time: string
}

// Audit log entries — imported separately in component to use JSX
export const auditLogEntries = [
  {
    id: 'al-1',
    status: 'bad' as StatusLevel,
    parts: [
      { text: 'SVID issuance failed for ', bold: false },
      { text: 'spiffe://production.example.com/ns/payments/sa/checkout', bold: true },
      { text: ' — signing key validation error', bold: false },
    ],
    time: '2 mins ago',
  },
  {
    id: 'al-2',
    status: 'degraded' as StatusLevel,
    parts: [
      { text: 'Workload attestation failed for pod ', bold: false },
      { text: 'checkout-7f3a2b', bold: true },
      { text: ' in cluster ', bold: false },
      { text: 'payments', bold: true },
      { text: ' — invalid selectors', bold: false },
    ],
    time: '8 mins ago',
  },
  {
    id: 'al-3',
    status: 'good' as StatusLevel,
    parts: [
      { text: 'Trust bundle rotated successfully — new X.509 key ', bold: false },
      { text: 'key_x509_02', bold: true },
      { text: ' activated', bold: false },
    ],
    time: '1 hour ago',
  },
  {
    id: 'al-4',
    status: 'good' as StatusLevel,
    parts: [
      { text: 'Agent ', bold: false },
      { text: 'agent-9c4d1e', bold: true },
      { text: ' connected to cluster ', bold: false },
      { text: 'api-gateway', bold: true },
    ],
    time: '1 hour ago',
  },
  {
    id: 'al-5',
    status: 'good' as StatusLevel,
    parts: [
      { text: 'Health check passed for server ', bold: false },
      { text: 'srv-us-west-01', bold: true },
    ],
    time: '2 hours ago',
  },
]

export const sidebarNavItems = [
  { id: 'overview', label: 'Overview', icon: 'layers' },
  { id: 'workloads', label: 'Workloads', icon: 'cpu' },
  { id: 'identities', label: 'Identities', icon: 'fingerprint' },
  { id: 'agents', label: 'Agents', icon: 'bot' },
  { id: 'federation', label: 'Federation', icon: 'network' },
  { id: 'policies', label: 'Policies', icon: 'shield' },
  { id: 'audit-logs', label: 'Audit Logs', icon: 'activity' },
]

export const trustDomain = {
  name: 'production.example.com',
  status: 'good' as StatusLevel,
  totalWorkloads: 847,
  totalSVIDs: 12453,
}

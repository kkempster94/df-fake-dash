import Fastify from 'fastify'
import cors from '@fastify/cors'
import { trustDomains, workflowMeta } from '../src/data/mockData.ts'

const app = Fastify({ logger: { transport: { target: 'pino-pretty' } } })

await app.register(cors, { origin: true })

// ── Helpers ───────────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))
const jitter = () => sleep(Math.random() * 600 + 200)

function getDomain(id: string) {
  return trustDomains.find(d => d.id === id) ?? trustDomains[0]
}

// ── Mutable server state ──────────────────────────────────────────────────────

let workflowStatus = workflowMeta.status

// ── Routes ────────────────────────────────────────────────────────────────────

// List domains (id, name, status only)
app.get('/api/domains', async () => {
  await jitter()
  return trustDomains.map(({ id, name, status }) => ({ id, name, status }))
})

// Full domain record
app.get<{ Params: { id: string } }>('/api/domains/:id', async (req) => {
  await jitter()
  return getDomain(req.params.id)
})

// Workload identities for a domain
app.get<{ Params: { id: string } }>('/api/domains/:id/workload-identities', async (req) => {
  await jitter()
  return getDomain(req.params.id).workloadIdentities
})

// Audit logs for a domain
app.get<{ Params: { id: string } }>('/api/domains/:id/audit-logs', async (req) => {
  await jitter()
  return getDomain(req.params.id).auditLogEntries
})

// SVIDs for a domain
app.get<{ Params: { id: string } }>('/api/domains/:id/svids', async (req) => {
  await jitter()
  return getDomain(req.params.id).svids
})

// Workflow metadata
app.get('/api/workflow/meta', async () => {
  await jitter()
  return { ...workflowMeta, status: workflowStatus }
})

// Trigger workflow rescan
app.post('/api/workflow/rescan', async () => {
  await jitter()
  workflowStatus = 'In Progress'
  return { status: workflowStatus }
})

// ── Start ─────────────────────────────────────────────────────────────────────

await app.listen({ port: 3001, host: '0.0.0.0' })

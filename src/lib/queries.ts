import { useQuery } from '@tanstack/react-query'
import { trustDomains } from '@/data/mockData'
import { useDomainContext } from './DomainContext'

// --- Fake async service functions (simulate API calls against mock data) ---

function sleep(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

async function fetchDomains() {
  await sleep(500)
  return trustDomains.map(d => ({ id: d.id, name: d.name, status: d.status }))
}

async function fetchDomain(id: string) {
  await sleep(700)
  return trustDomains.find(d => d.id === id) ?? trustDomains[0]
}

async function fetchWorkloadIdentities(domainId: string) {
  await sleep(900)
  const domain = trustDomains.find(d => d.id === domainId) ?? trustDomains[0]
  return domain.workloadIdentities
}

async function fetchAuditLogs(domainId: string) {
  await sleep(800)
  const domain = trustDomains.find(d => d.id === domainId) ?? trustDomains[0]
  return domain.auditLogEntries
}

// --- Custom hooks ---

export function useDomainsQuery() {
  return useQuery({ queryKey: ['domains'], queryFn: fetchDomains })
}

export function useActiveDomainQuery() {
  const { activeDomainId } = useDomainContext()
  return useQuery({
    queryKey: ['domain', activeDomainId],
    queryFn: () => fetchDomain(activeDomainId),
  })
}

export function useWorkloadIdentitiesQuery() {
  const { activeDomainId } = useDomainContext()
  return useQuery({
    queryKey: ['workloadIdentities', activeDomainId],
    queryFn: () => fetchWorkloadIdentities(activeDomainId),
  })
}

export function useAuditLogsQuery() {
  const { activeDomainId } = useDomainContext()
  return useQuery({
    queryKey: ['auditLogs', activeDomainId],
    queryFn: () => fetchAuditLogs(activeDomainId),
  })
}

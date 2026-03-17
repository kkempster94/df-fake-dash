import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useDomainContext } from './DomainContext'
import type { TrustDomainRecord, WorkloadIdentity, AuditLogEntry, Svid } from '@/data/mockData'

// ── Fetch helpers ─────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, init)
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`)
  return res.json() as Promise<T>
}

// ── Query hooks ───────────────────────────────────────────────────────────────

export function useDomainsQuery() {
  return useQuery({
    queryKey: ['domains'],
    queryFn: () => apiFetch<Pick<TrustDomainRecord, 'id' | 'name' | 'status'>[]>('/api/domains'),
  })
}

export function useActiveDomainQuery() {
  const { activeDomainId } = useDomainContext()
  return useQuery({
    queryKey: ['domain', activeDomainId],
    queryFn: () => apiFetch<TrustDomainRecord>(`/api/domains/${activeDomainId}`),
  })
}

export function useWorkloadIdentitiesQuery() {
  const { activeDomainId } = useDomainContext()
  return useQuery({
    queryKey: ['workloadIdentities', activeDomainId],
    queryFn: () => apiFetch<WorkloadIdentity[]>(`/api/domains/${activeDomainId}/workload-identities`),
  })
}

export function useAuditLogsQuery() {
  const { activeDomainId } = useDomainContext()
  return useQuery({
    queryKey: ['auditLogs', activeDomainId],
    queryFn: () => apiFetch<AuditLogEntry[]>(`/api/domains/${activeDomainId}/audit-logs`),
  })
}

export function useSvidsQuery() {
  const { activeDomainId } = useDomainContext()
  return useQuery({
    queryKey: ['svids', activeDomainId],
    queryFn: () => apiFetch<Svid[]>(`/api/domains/${activeDomainId}/svids`),
  })
}

export function useWorkflowMetaQuery() {
  return useQuery({
    queryKey: ['workflowMeta'],
    queryFn: () => apiFetch<{ status: string }>('/api/workflow/meta'),
  })
}

export function useTriggerRescan(callbacks?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => apiFetch<{ status: string }>('/api/workflow/rescan', { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflowMeta'] })
      callbacks?.onSuccess?.()
    },
  })
}

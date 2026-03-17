import { useState } from 'react'
import { AllSvidsSection } from './AllSvidsSection'
import { Eye } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import type { WorkloadIdentityStatus } from '@/data/mockData'
import { useActiveDomainQuery, useWorkloadIdentitiesQuery } from '@/lib/queries'
import { Table, TableHeader, TableHeadCell, TableRow, TableCell, useColumnWidths } from '@/components/ui/Table'
import { MonoText } from '@/components/ui/MonoText'
import { Skeleton } from '@/components/ui/Skeleton'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ActionButton } from '@/components/ui/ActionButton'
import { QueryError } from '@/components/ui/QueryError'

// ── Sub-nav ───────────────────────────────────────────────────────────────────

type SubSection = 'workload-identities' | 'all-svids' | 'jwt-audiences'

const SUB_NAV: { id: SubSection; label: string }[] = [
  { id: 'workload-identities', label: 'Workload identities' },
  { id: 'all-svids',           label: 'All SVIDs'           },
  { id: 'jwt-audiences',       label: 'JWT Audiences'       },
]

// ── Status badge ──────────────────────────────────────────────────────────────

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

// ── Time-series chart ─────────────────────────────────────────────────────────

// 145 data points (indices 0–144), one per 10 minutes, covering 24 hours.
// Index 144 = now, index 0 = 24 hours ago.
const CHART_TOTAL = 144
const MINS_PER_POINT = 10

// Ticks snap to local-time 6-hour boundaries (12AM, 6AM, 12PM, 6PM).
function buildChartTicks(): { ticks: number[]; labels: Record<number, string> } {
  const now = new Date()
  const nowMs = now.getTime()
  const SIX_H = 6 * 3_600_000

  // Find the most recent local-time hour that is a multiple of 6
  const lastBoundaryHour = Math.floor(now.getHours() / 6) * 6
  const msSinceLastBoundary =
    (now.getHours() - lastBoundaryHour) * 3_600_000 +
    now.getMinutes() * 60_000 +
    now.getSeconds() * 1_000 +
    now.getMilliseconds()

  const results: Array<{ idx: number; label: string }> = []
  let boundary = nowMs - msSinceLastBoundary

  while (boundary >= nowMs - 24 * 3_600_000) {
    const minsAgo = (nowMs - boundary) / 60_000
    const idx = CHART_TOTAL - minsAgo / MINS_PER_POINT
    if (idx >= 0 && idx <= CHART_TOTAL) {
      const h = new Date(boundary).getHours()
      results.push({ idx, label: `${h % 12 || 12}${h < 12 ? 'AM' : 'PM'}` })
    }
    boundary -= SIX_H
  }

  return {
    ticks: results.map(r => r.idx),
    labels: Object.fromEntries(results.map(r => [r.idx, r.label])),
  }
}

function niceYAxis(data: Array<{ x509: number; jwt: number }>): { domain: [number, number]; ticks: number[] } {
  const maxVal = Math.max(...data.map(d => d.x509 + d.jwt), 1)
  const niceMax = Math.ceil(maxVal / 5) * 5
  const interval = niceMax / 5
  return {
    domain: [0, niceMax],
    ticks: [0, interval, interval * 2, interval * 3, interval * 4, niceMax],
  }
}

function SvidTimeseriesChart({ data }: { data: Array<{ x509: number; jwt: number }> }) {
  const chartData = data.map((pt, i) => ({ ...pt, i }))
  const { domain, ticks } = niceYAxis(data)
  const { ticks: xTicks, labels: xLabels } = buildChartTicks()

  return (
    <div style={{ height: 130 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barCategoryGap={2} barSize={2} barGap={0} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
          <CartesianGrid vertical={false} stroke="#e9ebed" strokeDasharray="" strokeWidth={0.5} />
          <XAxis
            dataKey="i"
            type="number"
            domain={[0, CHART_TOTAL]}
            ticks={xTicks}
            tickFormatter={(v: number) => xLabels[v] ?? ''}
            tick={{ fontSize: 10, fill: '#798585' }}
            axisLine={false}
            tickLine={{ stroke: '#e9ebed', strokeWidth: 1 }}
            interval={0}
            padding={{ left: 4, right: 4 }}
            height={20}
          />
          <YAxis
            ticks={ticks}
            domain={domain}
            tick={{ fontSize: 10, fill: '#798585' }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip
            contentStyle={{ fontSize: 11, color: '#101212' }}
            formatter={(value: number, name: string) => [value, name === 'x509' ? 'X.509' : 'JWT']}
            labelFormatter={(idx: number) => {
              const ms = Date.now() - (CHART_TOTAL - idx) * MINS_PER_POINT * 60_000
              const start = new Date(ms)
              const end = new Date(ms + MINS_PER_POINT * 60_000)
              const fmt = (d: Date) => {
                const h = d.getHours(), m = d.getMinutes()
                return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
              }
              return `${fmt(start)} – ${fmt(end)}`
            }}
          />
          <Bar dataKey="x509" stackId="a" fill="rgba(2,174,231,0.5)"  radius={[0, 0, 0, 0]} maxBarSize={8} />
          <Bar dataKey="jwt"  stackId="a" fill="rgba(29,195,115,0.5)" radius={[2, 2, 0, 0]} maxBarSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── Column widths ─────────────────────────────────────────────────────────────

const IDENTITIES_COL_DEFAULTS = { spiffeId: 0, activeSvids: 120, lastIssued: 150, status: 160 }

// ── Skeletons ─────────────────────────────────────────────────────────────────

function WorkloadIdentitiesSkeleton({ widths }: { widths: typeof IDENTITIES_COL_DEFAULTS }) {
  return (
    <div className="flex-1 min-w-0 flex flex-col gap-6">
      <Skeleton height={14} className="w-3/4" />
      <div className="flex flex-wrap" style={{ gap: '0 36px' }}>
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Skeleton width={100} height={10} />
            <Skeleton width={60} height={20} />
          </div>
        ))}
      </div>
      <Skeleton className="w-full" height={103} />
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <Skeleton width={180} height={16} />
          <Skeleton width={64} height={16} />
        </div>
        <Table>
          <TableHeader>
            <TableHeadCell className="pl-4">SPIFFE ID</TableHeadCell>
            <TableHeadCell width={widths.activeSvids}>ACTIVE SVIDS</TableHeadCell>
            <TableHeadCell width={widths.lastIssued}>LAST ISSUED</TableHeadCell>
            <TableHeadCell width={widths.status}>STATUS</TableHeadCell>
          </TableHeader>
          {Array.from({ length: 10 }, (_, i) => (
            <TableRow key={i}>
              <TableCell className="pl-4"><Skeleton height={13} className="w-72" /></TableCell>
              <TableCell width={widths.activeSvids}><Skeleton width={36} height={13} /></TableCell>
              <TableCell width={widths.lastIssued}><Skeleton width={90} height={13} /></TableCell>
              <TableCell width={widths.status}><Skeleton width={88} height={20} /></TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function IdentitiesTab() {
  const [subSection, setSubSection] = useState<SubSection>('workload-identities')
  const { data: domain, isLoading: domainLoading, isError: domainError, refetch: refetchDomain } = useActiveDomainQuery()
  const { data: identities = [], isLoading: identitiesLoading, isError: identitiesError, refetch: refetchIdentities } = useWorkloadIdentitiesQuery()
  const { widths, setWidth } = useColumnWidths('identities-table-cols', IDENTITIES_COL_DEFAULTS)

  const isLoading = domainLoading || identitiesLoading
  const isError = domainError || identitiesError
  function retryAll() { void refetchDomain(); void refetchIdentities() }

  return (
    <div className="flex gap-6 w-full pb-9">
      {/* Left sub-nav */}
      <nav className="shrink-0 flex flex-col" style={{ width: 160, gap: 6 }}>
        {SUB_NAV.map(item => {
          const active = subSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => setSubSection(item.id)}
              className="text-left w-full rounded cursor-pointer border-none"
              style={{
                padding: '2px 8px',
                backgroundColor: active ? '#3e7c79' : 'transparent',
                color: active ? '#fff' : '#101212',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                letterSpacing: '0.26px',
                lineHeight: 1.5,
              }}
            >
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Main pane */}
      {subSection === 'workload-identities' ? (
        isError ? (
          <QueryError message="Failed to load workload identities." onRetry={retryAll} className="flex-1" />
        ) : isLoading || !domain ? (
          <WorkloadIdentitiesSkeleton widths={widths} />
        ) : (
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Description */}
            <p style={{ fontSize: 13, color: '#798585', letterSpacing: '0.26px', margin: 0 }}>
              All workloads issued with SPIFFE Verifiable Identity Documents (SVIDs) for trust domain {domain.name}.{' '}
              <a href="https://d.spirl.com/concepts/intro#workload-identities" style={{ color: '#3e7c79', textDecoration: 'underline' }}>
                Learn more
              </a>.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap" style={{ gap: '0 36px' }}>
              {domain.svidStats.map(stat => (
                <div key={stat.label} className="flex flex-col">
                  <p style={{ fontSize: 10, fontWeight: 500, color: '#798585', letterSpacing: '0.8px', textTransform: 'uppercase', lineHeight: 1.5, margin: 0 }}>
                    {stat.label}
                  </p>
                  <div className="flex items-center" style={{ height: 32 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#101212', letterSpacing: '0.26px' }}>
                      {stat.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeseries chart */}
            <SvidTimeseriesChart data={domain.svidTimeseries} />

            {/* Recent workload identities table */}
            <div className="flex flex-col gap-3">
              <SectionHeader
                title="Recent workload identities"
                action={<ActionButton label="View all" Icon={Eye} onClick={() => setSubSection('all-svids')} />}
              />
              <Table>
                <TableHeader>
                  <TableHeadCell className="pl-4">SPIFFE ID</TableHeadCell>
                  <TableHeadCell width={widths.activeSvids} onResize={d => setWidth('activeSvids', Math.max(60, widths.activeSvids + d))}>ACTIVE SVIDS</TableHeadCell>
                  <TableHeadCell width={widths.lastIssued} onResize={d => setWidth('lastIssued', Math.max(60, widths.lastIssued + d))}>LAST ISSUED</TableHeadCell>
                  <TableHeadCell width={widths.status} onResize={d => setWidth('status', Math.max(60, widths.status + d))}>STATUS</TableHeadCell>
                </TableHeader>
                {identities.slice(0, 10).map(wi => (
                  <TableRow key={wi.id}>
                    <TableCell className="pl-4">
                      <MonoText muted>{wi.spiffeId}</MonoText>
                    </TableCell>
                    <TableCell width={widths.activeSvids}>
                      <span style={{ fontSize: 13, color: '#101212', letterSpacing: '0.26px' }}>
                        {wi.activeSvids}
                      </span>
                    </TableCell>
                    <TableCell width={widths.lastIssued}>
                      <span style={{ fontSize: 13, color: '#798585', letterSpacing: '0.26px' }}>
                        {wi.lastIssued}
                      </span>
                    </TableCell>
                    <TableCell width={widths.status}>
                      <StatusBadge status={wi.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
            </div>
          </div>
        )
      ) : subSection === 'all-svids' ? (
        <AllSvidsSection />
      ) : (
        <div className="flex-1 flex items-center justify-center" style={{ minHeight: 200 }}>
          <p style={{ color: '#798585', fontSize: 13 }}>
            <strong style={{ color: '#101212' }}>
              {SUB_NAV.find(n => n.id === subSection)?.label}
            </strong>
            {' '}— coming soon
          </p>
        </div>
      )}
    </div>
  )
}

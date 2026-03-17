import { useState, useMemo, useEffect } from 'react'
import { Search } from 'lucide-react'
import type { SvidStatus } from '@/data/mockData'
import { useSvidsQuery } from '@/lib/queries'
import { Table, TableHeader, TableHeadCell, TableRow, TableCell, useColumnWidths } from '@/components/ui/Table'
import { TableFooter } from '@/components/ui/TableFooter'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { MonoText } from '@/components/ui/MonoText'
import { CertificateBadge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { QueryError } from '@/components/ui/QueryError'

// ── SVID status badge ─────────────────────────────────────────────────────────

const SVID_STATUS_CONFIG: Record<SvidStatus, { bg: string; color: string; label: string }> = {
  'active':        { bg: 'rgba(40,168,104,0.08)', color: '#28a868', label: 'Active'        },
  'expiring-soon': { bg: 'rgba(245,158,11,0.08)', color: '#f59e0b', label: 'Expiring soon' },
  'expired':       { bg: 'rgba(205,61,97,0.07)',  color: '#cd3d61', label: 'Expired'       },
  'revoked':       { bg: 'rgba(95,105,105,0.1)',  color: '#5f6969', label: 'Revoked'       },
}

function SvidStatusBadge({ status }: { status: SvidStatus }) {
  const { bg, color, label } = SVID_STATUS_CONFIG[status]
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-semibold"
      style={{ backgroundColor: bg, color, fontSize: 10, letterSpacing: '0.2px', padding: '0 8px', minHeight: 20, width: 106 }}
    >
      {label}
    </span>
  )
}

// ── Sort types ────────────────────────────────────────────────────────────────

type SortCol = 'spiffeId' | 'type' | 'status' | 'issuedAt' | 'expiresAt'
type SortDir = 'up' | 'down'

const COL_DEFAULTS = { type: 90, status: 120, serial: 200, issuedAt: 130, expiresAt: 130 }
const PAGE_SIZE_OPTIONS = [10, 25, 50]

// ── Component ─────────────────────────────────────────────────────────────────

export function AllSvidsSection() {
  const { data: svids = [], isLoading, isError, refetch } = useSvidsQuery()
  const { widths, setWidth } = useColumnWidths('all-svids-cols', COL_DEFAULTS)

  const [search, setSearch]           = useState('')
  const [typeFilter, setTypeFilter]   = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortCol, setSortCol]         = useState<SortCol>('spiffeId')
  const [sortDir, setSortDir]         = useState<SortDir>('up')
  const [page, setPage]               = useState(1)
  const [pageSize, setPageSize]       = useState(25)

  useEffect(() => { setPage(1) }, [search, typeFilter, statusFilter, sortCol, sortDir])

  function handleSort(col: SortCol) {
    if (col === sortCol) setSortDir(d => d === 'up' ? 'down' : 'up')
    else { setSortCol(col); setSortDir('up') }
  }

  function colSortDir(col: SortCol): 'up' | 'down' | 'none' {
    return col === sortCol ? sortDir : 'none'
  }

  const filtered = useMemo(() => svids.filter(s => {
    if (search && !s.spiffeId.toLowerCase().includes(search.toLowerCase())) return false
    if (typeFilter !== 'all' && s.type !== typeFilter) return false
    if (statusFilter !== 'all' && s.status !== statusFilter) return false
    return true
  }), [svids, search, typeFilter, statusFilter])

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    let cmp = 0
    if (sortCol === 'spiffeId') cmp = a.spiffeId.localeCompare(b.spiffeId)
    else if (sortCol === 'type') cmp = a.type.localeCompare(b.type)
    else if (sortCol === 'status') cmp = a.status.localeCompare(b.status)
    else if (sortCol === 'issuedAt') cmp = a.issuedAt.localeCompare(b.issuedAt)
    else if (sortCol === 'expiresAt') cmp = a.expiresAt.localeCompare(b.expiresAt)
    return sortDir === 'up' ? cmp : -cmp
  }), [filtered, sortCol, sortDir])

  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative" style={{ flex: '1 1 0', maxWidth: 320 }}>
          <Search size={13} style={{ color: '#798585', position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search SPIFFE ID…"
            className="pl-8"
          />
        </div>
        <div style={{ width: 140 }}>
          <Select
            value={typeFilter}
            options={[
              { value: 'all',  label: 'All types' },
              { value: 'x509', label: 'X.509'     },
              { value: 'jwt',  label: 'JWT'        },
            ]}
            onChange={setTypeFilter}
          />
        </div>
        <div style={{ width: 160 }}>
          <Select
            value={statusFilter}
            options={[
              { value: 'all',           label: 'All statuses'  },
              { value: 'active',        label: 'Active'        },
              { value: 'expiring-soon', label: 'Expiring soon' },
              { value: 'expired',       label: 'Expired'       },
              { value: 'revoked',       label: 'Revoked'       },
            ]}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableHeadCell className="pl-4" onSort={() => handleSort('spiffeId')} sortDirection={colSortDir('spiffeId')}>SPIFFE ID</TableHeadCell>
          <TableHeadCell width={widths.type}     onSort={() => handleSort('type')}     sortDirection={colSortDir('type')}     onResize={d => setWidth('type',     Math.max(60, widths.type + d))}>TYPE</TableHeadCell>
          <TableHeadCell width={widths.status}   onSort={() => handleSort('status')}   sortDirection={colSortDir('status')}   onResize={d => setWidth('status',   Math.max(60, widths.status + d))}>STATUS</TableHeadCell>
          <TableHeadCell width={widths.serial}                                                                                onResize={d => setWidth('serial',   Math.max(60, widths.serial + d))}>SERIAL</TableHeadCell>
          <TableHeadCell width={widths.issuedAt}  onSort={() => handleSort('issuedAt')}  sortDirection={colSortDir('issuedAt')}  onResize={d => setWidth('issuedAt',  Math.max(60, widths.issuedAt + d))}>ISSUED AT</TableHeadCell>
          <TableHeadCell width={widths.expiresAt} onSort={() => handleSort('expiresAt')} sortDirection={colSortDir('expiresAt')} onResize={d => setWidth('expiresAt', Math.max(60, widths.expiresAt + d))}>EXPIRES AT</TableHeadCell>
        </TableHeader>

        {isError ? (
          <QueryError message="Failed to load SVIDs." onRetry={() => void refetch()} />
        ) : isLoading ? (
          Array.from({ length: 10 }, (_, i) => (
            <TableRow key={i}>
              <TableCell className="pl-4"><Skeleton height={13} className="w-72" /></TableCell>
              <TableCell width={widths.type}><Skeleton width={52} height={20} /></TableCell>
              <TableCell width={widths.status}><Skeleton width={88} height={20} /></TableCell>
              <TableCell width={widths.serial}><Skeleton width={140} height={13} /></TableCell>
              <TableCell width={widths.issuedAt}><Skeleton width={90} height={13} /></TableCell>
              <TableCell width={widths.expiresAt}><Skeleton width={90} height={13} /></TableCell>
            </TableRow>
          ))
        ) : paginated.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p style={{ fontSize: 13, color: '#798585' }}>No SVIDs match your filters.</p>
          </div>
        ) : (
          paginated.map(svid => (
            <TableRow key={svid.id}>
              <TableCell className="pl-4">
                <MonoText muted>{svid.spiffeId}</MonoText>
              </TableCell>
              <TableCell width={widths.type}>
                <CertificateBadge type={svid.type} />
              </TableCell>
              <TableCell width={widths.status}>
                <SvidStatusBadge status={svid.status} />
              </TableCell>
              <TableCell width={widths.serial}>
                <span className="font-mono truncate" style={{ fontSize: 11, color: '#798585', letterSpacing: '0.22px' }}>
                  {svid.serialNumber}
                </span>
              </TableCell>
              <TableCell width={widths.issuedAt}>
                <span style={{ fontSize: 13, color: '#798585', letterSpacing: '0.26px' }}>{svid.issuedAt}</span>
              </TableCell>
              <TableCell width={widths.expiresAt}>
                <span style={{ fontSize: 13, color: svid.status === 'active' ? '#101212' : svid.status === 'expiring-soon' ? '#f59e0b' : '#798585', letterSpacing: '0.26px' }}>
                  {svid.expiresAt}
                </span>
              </TableCell>
            </TableRow>
          ))
        )}

        <TableFooter
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          onPageChange={setPage}
          onPageSizeChange={size => { setPageSize(size); setPage(1) }}
        />
      </Table>
    </div>
  )
}

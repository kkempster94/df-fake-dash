import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableHeader, TableHeadCell, TableRow, TableCell } from '@/components/ui/Table'
import { StatusDot, CertificateBadge } from '@/components/ui/Badge'

const meta = {
  component: Table,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table>

export default meta

const SAMPLE_ROWS = [
  { id: 'wl-001', spiffeId: 'spiffe://production.newco.com/api/auth', type: 'x509' as const, ttl: '3600s', status: 'good' as const },
  { id: 'wl-002', spiffeId: 'spiffe://production.newco.com/worker/processor', type: 'jwt' as const, ttl: '1800s', status: 'good' as const },
  { id: 'wl-003', spiffeId: 'spiffe://production.newco.com/db/primary', type: 'x509' as const, ttl: '7200s', status: 'degraded' as const },
]

export const Default: StoryObj = {
  render: () => (
    <Table>
      <TableHeader>
        <TableHeadCell>SPIFFE ID</TableHeadCell>
        <TableHeadCell width={80}>TYPE</TableHeadCell>
        <TableHeadCell width={80}>TTL</TableHeadCell>
        <TableHeadCell width={60}>STATUS</TableHeadCell>
      </TableHeader>
      {SAMPLE_ROWS.map((row) => (
        <TableRow key={row.id}>
          <TableCell cellType="code">{row.spiffeId}</TableCell>
          <TableCell width={80}><CertificateBadge type={row.type} /></TableCell>
          <TableCell width={80}>{row.ttl}</TableCell>
          <TableCell width={60} cellType="healthDot"><StatusDot status={row.status} /></TableCell>
        </TableRow>
      ))}
    </Table>
  ),
}

export const WithSortableHeaders: StoryObj = {
  render: () => (
    <Table>
      <TableHeader>
        <TableHeadCell sortDirection="none" onSort={() => {}}>SPIFFE ID</TableHeadCell>
        <TableHeadCell width={80} sortDirection="up" onSort={() => {}}>TTL</TableHeadCell>
        <TableHeadCell width={80} sortDirection="down" onSort={() => {}}>CREATED</TableHeadCell>
        <TableHeadCell width={60}>STATUS</TableHeadCell>
      </TableHeader>
      {SAMPLE_ROWS.slice(0, 2).map((row) => (
        <TableRow key={row.id}>
          <TableCell cellType="code">{row.spiffeId}</TableCell>
          <TableCell width={80}>{row.ttl}</TableCell>
          <TableCell width={80}>Jan 15, 2026</TableCell>
          <TableCell width={60} cellType="healthDot"><StatusDot status={row.status} /></TableCell>
        </TableRow>
      ))}
    </Table>
  ),
}

export const ClickableRows: StoryObj = {
  render: () => (
    <Table>
      <TableHeader>
        <TableHeadCell>SPIFFE ID</TableHeadCell>
        <TableHeadCell width={80}>TYPE</TableHeadCell>
      </TableHeader>
      {SAMPLE_ROWS.map((row) => (
        <TableRow key={row.id} onClick={() => {}}>
          <TableCell cellType="bold">{row.spiffeId}</TableCell>
          <TableCell width={80}><CertificateBadge type={row.type} /></TableCell>
        </TableRow>
      ))}
    </Table>
  ),
}

export const CellTypes: StoryObj = {
  name: 'Cell types showcase',
  render: () => (
    <Table>
      <TableHeader>
        <TableHeadCell>TYPE</TableHeadCell>
        <TableHeadCell>EXAMPLE</TableHeadCell>
      </TableHeader>
      <TableRow><TableCell cellType="bold">bold</TableCell><TableCell><span className="font-semibold">Bold text value</span></TableCell></TableRow>
      <TableRow><TableCell cellType="bold">code</TableCell><TableCell cellType="code">spiffe://production.newco.com/api/auth</TableCell></TableRow>
      <TableRow><TableCell cellType="bold">link</TableCell><TableCell cellType="link" href="#">View details →</TableCell></TableRow>
      <TableRow><TableCell cellType="bold">healthDot</TableCell><TableCell cellType="healthDot"><StatusDot status="good" /></TableCell></TableRow>
      <TableRow><TableCell cellType="bold">body (default)</TableCell><TableCell>Plain body text</TableCell></TableRow>
    </Table>
  ),
}

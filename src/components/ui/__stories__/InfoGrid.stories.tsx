import type { Meta, StoryObj } from '@storybook/react'
import { InfoGrid } from '@/components/ui/InfoGrid'
import { StatusBadge, CertificateBadge } from '@/components/ui/Badge'

const meta = {
  component: InfoGrid,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof InfoGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'Trust domain', value: 'production.newco.com' },
      { label: 'Status', value: <StatusBadge status="good" /> },
      { label: 'Active workloads', value: '142' },
      { label: 'Certificate type', value: <CertificateBadge type="x509" /> },
      { label: 'TTL', value: '3600s' },
      { label: 'Last rotation', value: '2 hours ago' },
    ],
  },
}

export const Minimal: Story = {
  args: {
    items: [
      { label: 'ID', value: 'wl-8a3f2d1e' },
      { label: 'Created', value: 'Jan 15, 2026' },
    ],
  },
}

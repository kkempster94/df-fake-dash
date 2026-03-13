import type { Meta, StoryObj } from '@storybook/react'
import { StatusBadge } from '@/components/ui/Badge'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

const meta = {
  component: Breadcrumbs,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  args: {
    items: [
      { label: 'Trust Domains' },
      { label: 'Overview' },
    ],
  },
}

export const WithBadge: Story = {
  args: {
    items: [
      { label: 'Trust Domains' },
      { label: 'Overview' },
      { label: 'production.newco.com', badge: <StatusBadge status="good" /> },
    ],
  },
}

export const MonoPath: Story = {
  args: {
    items: [
      { label: 'Identities' },
      { label: 'spiffe://production.newco.com/api/auth', mono: true },
    ],
  },
}

export const Clickable: Story = {
  args: {
    items: [
      { label: 'Trust Domains', onClick: () => {} },
      { label: 'production.newco.com' },
    ],
  },
}

export const DeepNested: Story = {
  args: {
    items: [
      { label: 'Infrastructure Identity' },
      { label: 'Trust Domains' },
      { label: 'Overview' },
      { label: 'Identities' },
    ],
  },
}

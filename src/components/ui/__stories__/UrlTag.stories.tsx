import type { Meta, StoryObj } from '@storybook/react'
import { UrlTag } from '@/components/ui/UrlTag'

const meta = {
  component: UrlTag,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof UrlTag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { url: 'https://bundle.production.newco.com/keys' },
}

export const WithLabel: Story = {
  args: {
    url: 'https://bundle.production.newco.com/keys',
    label: 'Bundle endpoint',
  },
}

export const Clickable: Story = {
  args: {
    url: 'https://bundle.production.newco.com/keys',
    onClick: () => {},
  },
}

export const LongUrl: Story = {
  args: { url: 'https://spire.production.newco.com/v1/agent/sync/workload-identities/export?format=x509&ttl=3600' },
}

export const SpiffeId: Story = {
  args: { url: 'spiffe://production.newco.com/api/auth-service' },
}

import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TrustDomainSelector } from '@/components/ui/TrustDomainSelector'

const DOMAINS = [
  { id: 'production.newco.com', name: 'production.newco.com', status: 'good' as const },
  { id: 'staging.newco.com', name: 'staging.newco.com', status: 'degraded' as const },
  { id: 'dev.newco.com', name: 'dev.newco.com', status: 'bad' as const },
]

const meta = {
  component: TrustDomainSelector,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TrustDomainSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    domains: DOMAINS,
    selectedId: 'production.newco.com',
    onSelect: () => {},
  },
}

export const StagingSelected: Story = {
  args: {
    domains: DOMAINS,
    selectedId: 'staging.newco.com',
    onSelect: () => {},
  },
}

export const Interactive: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedId, setSelectedId] = useState('production.newco.com')
    return (
      <TrustDomainSelector
        domains={DOMAINS}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    )
  },
}

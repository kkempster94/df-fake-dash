import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from '@/components/ui/Alert'

const meta = {
  component: Alert,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Good: Story = {
  args: {
    severity: 'good',
    title: 'Certificate renewed',
    children: 'All workload identities have been successfully renewed.',
  },
}

export const Bad: Story = {
  args: {
    severity: 'bad',
    title: 'Rotation failed',
    children: 'One or more workload identities could not be rotated. Manual intervention required.',
  },
}

export const Warning: Story = {
  args: {
    severity: 'warning',
    title: 'Automated scan triggered',
    children: 'This workflow was triggered by a scheduled credential scan. Review the findings before proceeding.',
  },
}

export const Neutral: Story = {
  args: {
    severity: 'neutral',
    children: 'SPIRE agents are configured to use the default attestor.',
  },
}

export const Dismissible: Story = {
  args: {
    severity: 'warning',
    title: 'Expiring soon',
    children: '3 certificates will expire within 7 days.',
    onDismiss: () => {},
  },
}

export const NoTitle: Story = {
  args: {
    severity: 'neutral',
    children: 'No workload identities found for this trust domain.',
  },
}

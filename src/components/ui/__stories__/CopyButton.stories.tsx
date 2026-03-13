import type { Meta, StoryObj } from '@storybook/react'
import { CopyButton } from '@/components/ui/CopyButton'

const meta = {
  component: CopyButton,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CopyButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: 'spiffe://production.newco.com/api/auth' },
}

export const CustomLabel: Story = {
  args: {
    value: 'spire-server entry create ...',
    label: 'Copy command',
    copiedLabel: 'Copied!',
  },
}

export const ShortValue: Story = {
  args: { value: 'abc123', label: 'Copy token' },
}

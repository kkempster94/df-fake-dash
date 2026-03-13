import type { Meta, StoryObj } from '@storybook/react'
import { ProseBlock } from '@/components/ui/ProseBlock'

const meta = {
  component: ProseBlock,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ProseBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'What is a trust domain?',
    body: 'A trust domain is an administrative boundary that determines which workloads can trust each other. Every workload identity is scoped to a trust domain using a SPIFFE ID.',
  },
}

export const Short: Story = {
  args: {
    title: 'No workload identities found',
    body: 'Create a workload identity entry to get started.',
  },
}

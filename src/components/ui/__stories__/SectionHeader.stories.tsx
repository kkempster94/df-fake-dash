import type { Meta, StoryObj } from '@storybook/react'
import { Plus } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ActionButton } from '@/components/ui/ActionButton'

const meta = {
  component: SectionHeader,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SectionHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { title: 'Workload identities' },
}

export const WithAction: Story = {
  args: {
    title: 'Workload identities',
    action: <ActionButton label="Add workload" Icon={Plus} />,
  },
}

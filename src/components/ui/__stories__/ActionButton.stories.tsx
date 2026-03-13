import type { Meta, StoryObj } from '@storybook/react'
import { Plus, Download, Settings, Trash2 } from 'lucide-react'
import { ActionButton } from '@/components/ui/ActionButton'

const meta = {
  component: ActionButton,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ActionButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Add workload', Icon: Plus },
}

export const Download_: Story = {
  name: 'Download',
  args: { label: 'Download certificate', Icon: Download },
}

export const Settings_: Story = {
  name: 'Settings',
  args: { label: 'Edit settings', Icon: Settings },
}

export const Destructive: Story = {
  args: { label: 'Delete entry', Icon: Trash2 },
}

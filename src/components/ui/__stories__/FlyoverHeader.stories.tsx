import type { Meta, StoryObj } from '@storybook/react'
import { FlyoverHeader } from '@/components/ui/FlyoverHeader'
import { Button } from '@/components/ui/Button'
import { Download } from 'lucide-react'

const meta = {
  component: FlyoverHeader,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FlyoverHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { title: 'Workload identity details' },
}

export const WithClose: Story = {
  args: {
    title: 'Workload identity details',
    onClose: () => {},
  },
}

export const WithActions: Story = {
  args: {
    title: 'Certificate viewer',
    actions: <Button variant="ghost" Icon={Download}>Export</Button>,
    onClose: () => {},
  },
}

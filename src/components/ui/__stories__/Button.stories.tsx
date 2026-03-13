import type { Meta, StoryObj } from '@storybook/react'
import { Settings, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const meta = {
  component: Button,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Save changes', variant: 'primary' },
}

export const Secondary: Story = {
  args: { children: 'Cancel', variant: 'secondary' },
}

export const Ghost: Story = {
  args: { children: 'Learn more', variant: 'ghost' },
}

export const Link_: Story = {
  name: 'Link',
  args: { children: 'View documentation', variant: 'link' },
}

export const Destructive: Story = {
  args: { children: 'Delete domain', variant: 'destructive', Icon: Trash2 },
}

export const WithIcon: Story = {
  args: { children: 'Edit settings', variant: 'secondary', Icon: Settings },
}

export const IconOnly: Story = {
  args: { children: 'Settings', variant: 'icon', Icon: Settings },
}

export const SmallSize: Story = {
  args: { children: 'Add workload', variant: 'primary', size: 'sm' },
}

export const Disabled: Story = {
  args: { children: 'Save changes', variant: 'primary', disabled: true },
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="icon" Icon={Plus}>Add</Button>
    </div>
  ),
}

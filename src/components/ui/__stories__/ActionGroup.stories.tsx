import type { Meta, StoryObj } from '@storybook/react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { ActionGroup } from '@/components/ui/ActionGroup'

const meta = {
  component: ActionGroup,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ActionGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    actions: [
      { label: 'Cancel', variant: 'secondary' },
      { label: 'Save changes', variant: 'primary' },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    actions: [
      { label: 'Previous step', variant: 'secondary', Icon: ChevronLeft },
      { label: 'Next step', variant: 'primary', Icon: ChevronRight },
    ],
  },
}

export const WithDisabled: Story = {
  args: {
    actions: [
      { label: 'Previous step', variant: 'secondary', disabled: true },
      { label: 'Next step', variant: 'primary' },
    ],
  },
}

export const Single: Story = {
  args: {
    actions: [{ label: 'Add workload', variant: 'primary', Icon: Plus }],
  },
}

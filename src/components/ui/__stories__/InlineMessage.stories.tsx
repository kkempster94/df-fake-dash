import type { Meta, StoryObj } from '@storybook/react'
import { InlineMessage } from '@/components/ui/InlineMessage'

const meta = {
  component: InlineMessage,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof InlineMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Bad: Story = {
  args: { type: 'bad', children: 'This field is required.' },
}

export const Good: Story = {
  args: { type: 'good', children: 'Certificate is valid and up to date.' },
}

export const Concerning: Story = {
  args: { type: 'concerning', children: 'Certificate expires in 3 days.' },
}

export const Neutral: Story = {
  args: { type: 'neutral', children: 'This setting cannot be changed after creation.' },
}

export const NoIcon: Story = {
  args: { type: 'bad', icon: false, children: 'Invalid value.' },
}

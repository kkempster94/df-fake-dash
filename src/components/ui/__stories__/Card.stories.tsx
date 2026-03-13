import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/components/ui/Card'

const meta = {
  component: Card,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <div className="p-6 text-sm text-gray-600">Card content goes here.</div>,
  },
}

export const WithPadding: Story = {
  args: {
    className: 'p-6',
    children: (
      <div>
        <h3 className="font-semibold text-sm mb-2">Trust Domain</h3>
        <p className="text-xs text-gray-500">production.newco.com</p>
      </div>
    ),
  },
}

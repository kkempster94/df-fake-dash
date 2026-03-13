import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from '@/components/ui/Tooltip'

const meta = {
  component: Tooltip,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ padding: 64 }}><Story /></div>],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Top: Story = {
  args: {
    content: 'Certificate status',
    side: 'top',
    children: <span className="text-sm font-medium cursor-default underline decoration-dotted">Hover me (top)</span>,
  },
}

export const Bottom: Story = {
  args: {
    content: 'Number of active workload identities',
    side: 'bottom',
    children: <span className="text-sm font-medium cursor-default underline decoration-dotted">Hover me (bottom)</span>,
  },
}

export const Left: Story = {
  args: {
    content: 'Last rotated 2 hours ago',
    side: 'left',
    children: <span className="text-sm font-medium cursor-default underline decoration-dotted">Hover me (left)</span>,
  },
}

export const Right: Story = {
  args: {
    content: 'View SPIFFE ID details',
    side: 'right',
    children: <span className="text-sm font-medium cursor-default underline decoration-dotted">Hover me (right)</span>,
  },
}

export const AllSides: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 gap-12 p-16">
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <div key={side} className="flex items-center justify-center">
          <Tooltip content={`Tooltip on ${side}`} side={side}>
            <span className="text-xs font-medium px-3 py-1 rounded border border-gray-200 cursor-default">{side}</span>
          </Tooltip>
        </div>
      ))}
    </div>
  ),
}

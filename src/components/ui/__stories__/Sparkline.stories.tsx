import type { Meta, StoryObj } from '@storybook/react'
import { Sparkline } from '@/components/ui/Sparkline'

const meta = {
  component: Sparkline,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Sparkline>

export default meta
type Story = StoryObj<typeof meta>

const trendUp = [10, 15, 20, 18, 25, 30, 35]
const trendDown = [40, 35, 28, 22, 18, 12, 8]
const trendFlat = [20, 21, 19, 20, 22, 20, 21]
const trendVolatile = [10, 45, 20, 55, 15, 50, 25]

export const Neutral: Story = {
  args: { data: trendFlat, variant: 'neutral', width: 80, height: 24 },
}

export const Good: Story = {
  args: { data: trendUp, variant: 'good', width: 80, height: 24 },
}

export const Bad: Story = {
  args: { data: trendDown, variant: 'bad', width: 80, height: 24 },
}

export const Volatile: Story = {
  args: { data: trendVolatile, variant: 'neutral', width: 80, height: 24 },
}

export const Tiny: Story = {
  args: { data: trendUp, variant: 'good', width: 50, height: 14 },
}

export const Wide: Story = {
  args: { data: trendUp, variant: 'good', width: 120, height: 32 },
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['neutral', 'good', 'bad'] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          <span className="text-xs text-gray-500 w-16">{variant}</span>
          <Sparkline data={trendUp} variant={variant} width={80} height={20} />
        </div>
      ))}
    </div>
  ),
}

import type { Meta, StoryObj } from '@storybook/react'
import { MonoText } from '@/components/ui/MonoText'

const meta = {
  component: MonoText,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof MonoText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'spiffe://production.newco.com/api/auth' },
}

export const Muted: Story = {
  args: { children: 'https://bundle.production.newco.com/keys', muted: true },
}

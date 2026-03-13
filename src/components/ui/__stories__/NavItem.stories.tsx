import type { Meta, StoryObj } from '@storybook/react'
import { NavItem } from '@/components/ui/NavItem'

const meta = {
  component: NavItem,
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
  decorators: [(Story) => <div style={{ width: 220, padding: 8 }}><Story /></div>],
} satisfies Meta<typeof NavItem>

export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = {
  args: { label: 'Overview', isActive: true, onClick: () => {} },
}

export const Inactive: Story = {
  args: { label: 'Trust relationships', isActive: false, onClick: () => {} },
}

export const WithAlertBadge: Story = {
  args: { label: 'Remediation workflows', isActive: false, onClick: () => {}, alertBadge: true },
}

export const ActiveWithBadge: Story = {
  args: { label: 'Remediation workflows', isActive: true, onClick: () => {}, alertBadge: true },
}

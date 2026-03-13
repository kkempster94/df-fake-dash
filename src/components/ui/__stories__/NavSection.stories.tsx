import type { Meta, StoryObj } from '@storybook/react'
import { NavSection } from '@/components/ui/NavSection'

const meta = {
  component: NavSection,
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
  decorators: [(Story) => <div style={{ width: 220, padding: 12 }}><Story /></div>],
} satisfies Meta<typeof NavSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    heading: 'Trust domains',
    activeId: 'overview',
    onNavigate: () => {},
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'identities', label: 'Identities' },
      { id: 'relationships', label: 'Trust relationships' },
    ],
  },
}

export const WithAlertBadge: Story = {
  args: {
    heading: 'Mint',
    activeId: 'trust-domains',
    onNavigate: () => {},
    items: [
      { id: 'trust-domains', label: 'Trust domains' },
      { id: 'workflows', label: 'Remediation workflows', alertBadge: true },
      { id: 'scanners', label: 'Scanners' },
    ],
  },
}

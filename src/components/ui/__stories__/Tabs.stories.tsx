import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Tabs } from '@/components/ui/Tabs'

const meta = {
  component: Tabs,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const ITEMS = [
  { id: 'identities', label: 'Identities', count: 142 },
  { id: 'certificates', label: 'Certificates', count: 3 },
  { id: 'audit', label: 'Audit log' },
]

export const Default: Story = {
  args: { items: ITEMS, activeId: 'identities', onChange: () => {} },
}

export const SecondActive: Story = {
  args: { items: ITEMS, activeId: 'certificates', onChange: () => {} },
}

export const NoCounts: Story = {
  args: {
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'settings', label: 'Settings' },
      { id: 'audit', label: 'Audit log' },
    ],
    activeId: 'overview',
    onChange: () => {},
  },
}

export const Interactive: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeId, setActiveId] = useState('identities')
    return (
      <div>
        <Tabs items={ITEMS} activeId={activeId} onChange={setActiveId} />
        <div className="p-4 text-sm text-gray-500">Active tab: <strong>{activeId}</strong></div>
      </div>
    )
  },
}

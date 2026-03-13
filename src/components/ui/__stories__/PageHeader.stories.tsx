import type { Meta, StoryObj } from '@storybook/react'
import { Settings } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const meta = {
  component: PageHeader,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const TitleOnly: Story = {
  args: {
    title: 'production.newco.com',
  },
}

export const WithBadge: Story = {
  args: {
    title: <>production.newco.com <StatusBadge status="good" /></>,
    description: 'A trust domain defines a boundary of administrative control. Learn more.',
  },
}

export const WithAction: Story = {
  args: {
    title: <>production.newco.com <StatusBadge status="good" /></>,
    description: 'A trust domain defines a boundary of administrative control.',
    action: <Button Icon={Settings} variant="secondary">Edit settings</Button>,
  },
}

export const WithStatsRow: Story = {
  args: {
    title: <>production.newco.com <StatusBadge status="good" /></>,
    description: 'A trust domain defines a boundary of administrative control.',
    action: <Button Icon={Settings} variant="secondary">Edit settings</Button>,
    children: (
      <div className="flex gap-8">
        {[
          { label: 'Workload identities', value: '142' },
          { label: 'Active agents', value: '18' },
          { label: 'Cert TTL', value: '3600s' },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col">
            <span className="text-[10px] uppercase font-medium tracking-widest text-[#798585]">{label}</span>
            <span className="text-[13px] font-semibold text-[#101212] mt-1">{value}</span>
          </div>
        ))}
      </div>
    ),
  },
}

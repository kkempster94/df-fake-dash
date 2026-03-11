import { Tabs } from '@/components/ui/Tabs'
import type { TabItem } from '@/components/ui/Tabs'

const TABS: TabItem[] = [
  { id: 'overview',       label: 'Overview'       },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'identities',     label: 'Identities'     },
  { id: 'trust-bundle',   label: 'Trust bundle'   },
  { id: 'events',         label: 'Events'         },
  { id: 'settings',       label: 'Settings'       },
]

interface TabBarProps {
  activeTab: string
  onTabChange: (id: string) => void
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <Tabs
      items={TABS}
      activeId={activeTab}
      onChange={onTabChange}
      className="shrink-0 bg-white px-8"
    />
  )
}

import { Tabs } from '@/components/ui/Tabs'
import type { TabItem } from '@/components/ui/Tabs'

const BASE_TABS: TabItem[] = [
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
  counts?: Partial<Record<string, number>>
}

export function TabBar({ activeTab, onTabChange, counts }: TabBarProps) {
  const tabs = BASE_TABS.map((t) =>
    counts?.[t.id] != null ? { ...t, count: counts[t.id] } : t
  )

  return (
    <Tabs
      items={tabs}
      activeId={activeTab}
      onChange={onTabChange}
      className="shrink-0 bg-white px-8"
    />
  )
}

interface Tab {
  id: string
  label: string
}

const TABS: Tab[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'agents', label: 'Agents' },
  { id: 'workloads', label: 'Workloads' },
  { id: 'svids', label: 'SVIDs' },
  { id: 'federation', label: 'Federation' },
  { id: 'keys', label: 'Keys & Bundles' },
]

interface TabBarProps {
  activeTab: string
  onTabChange: (id: string) => void
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div
      className="flex items-end gap-0 shrink-0"
      style={{
        borderBottom: '1px solid #e9ebed',
        paddingLeft: 32,
        paddingRight: 32,
        backgroundColor: '#fff',
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="cursor-pointer border-none bg-transparent py-2.5 px-4 transition-colors relative"
            style={{
              fontSize: 12,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#3e7c79' : '#798585',
              letterSpacing: '0.24px',
              borderBottom: isActive ? '2px solid #3e7c79' : '2px solid transparent',
              marginBottom: -1,
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

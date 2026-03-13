import { NavItem } from './NavItem'

interface NavEntry {
  id: string
  label: string
  alertBadge?: boolean
}

interface NavSectionProps {
  heading: string
  items: NavEntry[]
  activeId: string
  onNavigate: (id: string) => void
}

export function NavSection({ heading, items, activeId, onNavigate }: NavSectionProps) {
  return (
    <div className="flex flex-col" style={{ gap: 6 }}>
      <p
        style={{
          color: '#798585',
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        {heading}
      </p>
      <div className="flex flex-col" style={{ gap: 4 }}>
        {items.map((item) => (
          <NavItem
            key={item.id}
            label={item.label}
            isActive={activeId === item.id}
            onClick={() => onNavigate(item.id)}
            alertBadge={item.alertBadge}
          />
        ))}
      </div>
    </div>
  )
}

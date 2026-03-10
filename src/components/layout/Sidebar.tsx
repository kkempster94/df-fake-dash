import {
  Layers,
  Cpu,
  Fingerprint,
  Bot,
  Network,
  Shield,
  Activity,
  ChevronDown,
  Settings,
  LogOut,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  id: string
  label: string
  Icon: LucideIcon
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', Icon: Layers },
  { id: 'workloads', label: 'Workloads', Icon: Cpu },
  { id: 'identities', label: 'Identities', Icon: Fingerprint },
  { id: 'agents', label: 'Agents', Icon: Bot },
  { id: 'federation', label: 'Federation', Icon: Network },
  { id: 'policies', label: 'Policies', Icon: Shield },
  { id: 'audit-logs', label: 'Audit Logs', Icon: Activity },
]

const bottomItems: NavItem[] = [
  { id: 'settings', label: 'Settings', Icon: Settings },
  { id: 'logout', label: 'Sign out', Icon: LogOut },
]

interface SidebarProps {
  activeItem: string
  onNavigate: (id: string) => void
}

function NavButton({
  item,
  isActive,
  onClick,
}: {
  item: NavItem
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-4 py-2 rounded-lg cursor-pointer border-none text-left transition-colors"
      style={{
        backgroundColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
        color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
        fontSize: 13,
        fontWeight: isActive ? 600 : 400,
        letterSpacing: '0.26px',
      }}
    >
      <item.Icon
        size={15}
        strokeWidth={isActive ? 2 : 1.6}
        style={{ opacity: isActive ? 1 : 0.7, flexShrink: 0 }}
      />
      {item.label}
    </button>
  )
}

export function Sidebar({ activeItem, onNavigate }: SidebarProps) {
  return (
    <aside
      className="flex flex-col h-full shrink-0"
      style={{ width: 232, backgroundColor: '#131a1a' }}
    >
      {/* Logo / brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div
          className="rounded-md flex items-center justify-center shrink-0"
          style={{ width: 28, height: 28, backgroundColor: '#3e7c79' }}
        >
          <Shield size={15} color="#fff" strokeWidth={2} />
        </div>
        <div>
          <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, letterSpacing: '0.26px', lineHeight: 1.3 }}>
            Defakto
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.2px', lineHeight: 1.4 }}>
            Identity Platform
          </p>
        </div>
      </div>

      {/* Trust domain selector */}
      <div
        className="px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: 500, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 4 }}>
          Trust Domain
        </p>
        <button
          className="flex items-center justify-between w-full cursor-pointer border-none rounded-md px-2 py-1.5 transition-colors"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)', gap: 6 }}
        >
          <span
            className="font-mono truncate"
            style={{ color: '#fff', fontSize: 11, letterSpacing: '0.22px' }}
          >
            production.example.com
          </span>
          <ChevronDown size={13} color="rgba(255,255,255,0.4)" strokeWidth={1.8} style={{ flexShrink: 0 }} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-0.5 px-2 py-3 overflow-y-auto">
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            isActive={activeItem === item.id}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </nav>

      {/* Bottom items */}
      <div className="flex flex-col gap-0.5 px-2 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        {bottomItems.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            isActive={false}
            onClick={() => {}}
          />
        ))}
      </div>
    </aside>
  )
}

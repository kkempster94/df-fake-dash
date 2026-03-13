import { NavSection } from '@/components/ui/NavSection'
import { NavItem } from '@/components/ui/NavItem'

const DEFAKTO_LOGO = 'https://www.figma.com/api/mcp/asset/6d3e33bc-799c-4ffb-ab50-f3cc274d509e'

const MINT_ITEMS = [
  { id: 'overview',        label: 'Trust domains'  },
  { id: 'cicd-profiles',   label: 'CI/CD profiles' },
]

const LEDGER_ITEMS = [
  { id: 'dashboard',           label: 'Dashboard'                              },
  { id: 'scanners',            label: 'Scanners'                               },
  { id: 'static-credentials',  label: 'Static credentials'                    },
  { id: 'applications',        label: 'Applications'                           },
  { id: 'workflows',           label: 'Remediation workflows', alertBadge: true },
]

const ORGANIZATION_ITEMS = [
  { id: 'profile',    label: 'Profile'    },
  { id: 'label',      label: 'Label'      },
  { id: 'audit-logs', label: 'Audit logs' },
  { id: 'settings',   label: 'Settings'   },
]

interface SidebarProps {
  activeItem: string
  onNavigate: (id: string) => void
}

export function Sidebar({ activeItem, onNavigate }: SidebarProps) {
  return (
    <aside
      className="flex flex-col h-full shrink-0"
      style={{
        width: 232,
        backgroundImage: [
          'linear-gradient(77deg, rgba(101,57,214,0.1) 0%, rgba(101,57,214,0) 100%)',
          'linear-gradient(-48deg, rgba(17,165,158,0) 24%, rgba(17,165,158,0.12) 100%)',
        ].join(', '),
        backgroundColor: '#f5f8f8',
      }}
    >
      {/* Brand header */}
      <div
        className="flex items-center shrink-0 px-3"
        style={{ backgroundColor: '#3e7c79', height: 44 }}
      >
        <img
          src={DEFAKTO_LOGO}
          alt="Defakto"
          style={{ height: 28, width: 'auto', maxWidth: '60%' }}
        />
      </div>

      {/* Nav sections */}
      <nav
        className="flex-1 overflow-y-auto flex flex-col justify-between"
        style={{ padding: 16, paddingTop: 32, paddingBottom: 32 }}
      >
        <div className="flex flex-col" style={{ gap: 24 }}>
          <NavSection
            heading="MINT"
            items={MINT_ITEMS}
            activeId={activeItem}
            onNavigate={onNavigate}
          />
          <NavSection
            heading="LEDGER"
            items={LEDGER_ITEMS}
            activeId={activeItem}
            onNavigate={onNavigate}
          />
          <NavSection
            heading="ORGANIZATION"
            items={ORGANIZATION_ITEMS}
            activeId={activeItem}
            onNavigate={onNavigate}
          />
        </div>

        {/* User profile */}
        <div className="flex flex-col" style={{ gap: 12 }}>
          <div style={{ paddingLeft: 8 }}>
            <p
              style={{
                color: '#101212',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.26px',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Darin McAdams
            </p>
            <p
              style={{
                color: '#798585',
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: '0.26px',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              newco.com
            </p>
          </div>
          <NavItem label="Sign out" isActive={false} onClick={() => {}} />
        </div>
      </nav>
    </aside>
  )
}

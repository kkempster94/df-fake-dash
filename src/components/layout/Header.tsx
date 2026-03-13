import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import type { BreadcrumbItem } from '@/components/ui/Breadcrumbs'
import { TrustDomainSelector } from '@/components/ui/TrustDomainSelector'
import { trustDomains } from '@/data/mockData'
import type { Route } from '@/lib/routes'

interface HeaderProps {
  activeRoute?: Route
  activeDomainId: string
  onDomainChange: (id: string) => void
}

const HEADER_GRADIENT = [
  'linear-gradient(268deg, rgba(101,57,214,0.08) 0%, rgba(101,57,214,0) 100%)',
  'linear-gradient(182deg, rgba(17,165,158,0) 12%, rgba(17,165,158,0.1) 52%)',
].join(', ')

const DOMAIN_OPTIONS = trustDomains.map(d => ({ id: d.id, name: d.name, status: d.status }))

function buildCrumbs(route: Route | undefined, activeDomainId: string, onDomainChange: (id: string) => void) {
  if (!route) return []

  const crumbs: BreadcrumbItem[] = [{ label: route.section }]

  if (route.id === 'overview') {
    crumbs.push({ label: route.label })
    crumbs.push({
      node: (
        <TrustDomainSelector
          domains={DOMAIN_OPTIONS}
          selectedId={activeDomainId}
          onSelect={onDomainChange}
        />
      ),
    })
  } else {
    crumbs.push({ label: route.label })
  }

  return crumbs
}

export function Header({ activeRoute, activeDomainId, onDomainChange }: HeaderProps) {
  const crumbs = buildCrumbs(activeRoute, activeDomainId, onDomainChange)

  return (
    <header
      className="flex items-center shrink-0 px-8"
      style={{
        height: 44,
        backgroundImage: HEADER_GRADIENT,
        backgroundColor: '#f5f8f8',
      }}
    >
      <Breadcrumbs items={crumbs} />
    </header>
  )
}

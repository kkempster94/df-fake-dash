import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import type { BreadcrumbItem } from '@/components/ui/Breadcrumbs'
import { TrustDomainSelector } from '@/components/ui/TrustDomainSelector'
import { useDomainsQuery } from '@/lib/queries'
import { useDomainContext } from '@/lib/DomainContext'
import type { Route } from '@/lib/routes'

interface HeaderProps {
  activeRoute?: Route
}

const HEADER_GRADIENT = [
  'linear-gradient(268deg, rgba(101,57,214,0.08) 0%, rgba(101,57,214,0) 100%)',
  'linear-gradient(182deg, rgba(17,165,158,0) 12%, rgba(17,165,158,0.1) 52%)',
].join(', ')

export function Header({ activeRoute }: HeaderProps) {
  const { activeDomainId, setActiveDomainId } = useDomainContext()
  const { data: domains = [] } = useDomainsQuery()

  const crumbs: BreadcrumbItem[] = []
  if (activeRoute) {
    crumbs.push({ label: activeRoute.section })
    if (activeRoute.id === 'overview') {
      crumbs.push({ label: activeRoute.label })
      if (domains.length > 0) {
        crumbs.push({
          node: (
            <TrustDomainSelector
              domains={domains}
              selectedId={activeDomainId}
              onSelect={setActiveDomainId}
            />
          ),
        })
      }
    } else {
      crumbs.push({ label: activeRoute.label })
    }
  }

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

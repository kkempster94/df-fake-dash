import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { TabBar } from '@/components/layout/TabBar'
import { TDHeader } from '@/components/overview/TDHeader'
import { Overview } from '@/components/overview/Overview'
import { IdentitiesTab } from '@/components/overview/IdentitiesTab'
import { TrustDomainSettingsModal } from '@/components/overview/TrustDomainSettingsModal'
import { WorkflowPage } from '@/components/workflow/WorkflowPage'
import { ROUTES, DEFAULT_PATH, DEFAULT_ID, pathToRoute, idToPath } from '@/lib/routes'
import { trustDomains, DEFAULT_DOMAIN_ID } from '@/data/mockData'

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-3">
      <p style={{ color: '#798585', fontSize: 13 }}>
        <strong style={{ color: '#101212' }}>{label}</strong> — coming soon
      </p>
    </div>
  )
}

function resolveInitialNav(): string {
  const path = window.location.pathname
  if (path === '/' || path === '') {
    window.history.replaceState(null, '', DEFAULT_PATH)
    return DEFAULT_ID
  }
  const route = pathToRoute(path)
  if (route) return route.id
  window.history.replaceState(null, '', DEFAULT_PATH)
  return DEFAULT_ID
}

function resolveInitialTab(): string {
  return new URLSearchParams(window.location.search).get('tab') ?? 'overview'
}

function setTabInUrl(tab: string) {
  const url = new URL(window.location.href)
  url.searchParams.set('tab', tab)
  window.history.replaceState(null, '', url.toString())
}

export default function App() {
  const [activeNav, setActiveNav]           = useState(resolveInitialNav)
  const [activeTab, setActiveTab]           = useState(resolveInitialTab)
  const [activeDomainId, setActiveDomainId] = useState(DEFAULT_DOMAIN_ID)
  const [settingsOpen, setSettingsOpen]     = useState(false)

  useEffect(() => {
    function onPopState() {
      const route = pathToRoute(window.location.pathname)
      if (route) {
        setActiveNav(route.id)
        const tab = new URLSearchParams(window.location.search).get('tab') ?? 'overview'
        setActiveTab(tab)
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  function handleNavigate(id: string) {
    const path = idToPath(id)
    window.history.pushState(null, '', path)
    setActiveNav(id)
    if (id === 'overview') setActiveTab('overview')
  }

  function handleTabChange(tab: string) {
    setActiveTab(tab)
    setTabInUrl(tab)
  }

  function handleViewWorkloads() {
    handleTabChange('identities')
  }

  const activeRoute  = ROUTES.find(r => r.id === activeNav)
  const activeDomain = trustDomains.find(d => d.id === activeDomainId) ?? trustDomains[0]
  const isOverview   = activeNav === 'overview'

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Sidebar activeItem={activeNav} onNavigate={handleNavigate} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          activeRoute={activeRoute}
          activeDomainId={activeDomainId}
          onDomainChange={setActiveDomainId}
        />

        {isOverview && (
          <TDHeader domain={activeDomain} onSettingsClick={() => setSettingsOpen(true)} />
        )}

        {isOverview && (
          <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
        )}

        <TrustDomainSettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

        <main className="flex-1 overflow-y-auto bg-white">
          <div className="px-12 py-6" style={{ maxWidth: 1285 }}>
            {isOverview && activeTab === 'overview' ? (
              <Overview domain={activeDomain} onViewWorkloads={handleViewWorkloads} />
            ) : isOverview && activeTab === 'identities' ? (
              <IdentitiesTab identities={activeDomain.workloadIdentities} />
            ) : activeNav === 'workflows' ? (
              <WorkflowPage />
            ) : (
              <ComingSoon label={activeRoute?.label ?? activeNav} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

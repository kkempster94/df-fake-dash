import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { trustDomains } from '@/data/mockData'

function getDomainFromUrl(): string {
  const id = new URLSearchParams(window.location.search).get('domain')
  return trustDomains.some(d => d.id === id) ? id! : trustDomains[0].id
}

function setDomainInUrl(id: string) {
  const url = new URL(window.location.href)
  url.searchParams.set('domain', id)
  window.history.replaceState(null, '', url.toString())
}

interface DomainContextValue {
  activeDomainId: string
  setActiveDomainId: (id: string) => void
}

const DomainContext = createContext<DomainContextValue | null>(null)

export function DomainProvider({ children }: { children: ReactNode }) {
  const [activeDomainId, setActiveDomainIdState] = useState(getDomainFromUrl)

  function setActiveDomainId(id: string) {
    setActiveDomainIdState(id)
    setDomainInUrl(id)
  }

  // Ensure the URL always reflects the active domain on initial load
  useEffect(() => {
    setDomainInUrl(activeDomainId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally runs once on mount

  // Sync domain state when user navigates back/forward
  useEffect(() => {
    function onPopState() {
      setActiveDomainIdState(getDomainFromUrl())
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return (
    <DomainContext.Provider value={{ activeDomainId, setActiveDomainId }}>
      {children}
    </DomainContext.Provider>
  )
}

export function useDomainContext() {
  const ctx = useContext(DomainContext)
  if (!ctx) throw new Error('useDomainContext must be used within DomainProvider')
  return ctx
}

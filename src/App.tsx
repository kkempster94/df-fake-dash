import { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { TabBar } from '@/components/layout/TabBar'
import { Overview } from '@/components/overview/Overview'

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-3">
      <p style={{ color: '#798585', fontSize: 13 }}>
        <strong style={{ color: '#101212' }}>{label}</strong> — coming soon
      </p>
    </div>
  )
}

export default function App() {
  const [activeNav, setActiveNav] = useState('overview')
  const [activeTab, setActiveTab] = useState('overview')

  function handleNavigate(id: string) {
    setActiveNav(id)
    if (id === 'overview') setActiveTab('overview')
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <Sidebar activeItem={activeNav} onNavigate={handleNavigate} />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Page content */}
        <main
          className="flex-1 overflow-y-auto"
          style={{ backgroundColor: '#f5f7f7' }}
        >
          <div className="px-12 py-6" style={{ maxWidth: 1285 }}>
            {activeNav === 'overview' && activeTab === 'overview' ? (
              <Overview />
            ) : (
              <ComingSoon
                label={
                  activeNav !== 'overview'
                    ? activeNav.charAt(0).toUpperCase() + activeNav.slice(1)
                    : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                }
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App'
import { DomainProvider } from '@/lib/DomainContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DomainProvider>
        <App />
      </DomainProvider>
    </QueryClientProvider>
  </StrictMode>,
)

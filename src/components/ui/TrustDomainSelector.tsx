import { useState, useRef, useEffect } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { StatusDot } from './Badge'
import type { StatusLevel } from '@/data/mockData'

export interface DomainOption {
  id: string
  name: string
  status: StatusLevel
}

interface TrustDomainSelectorProps {
  domains: DomainOption[]
  selectedId: string
  onSelect: (id: string) => void
}

export function TrustDomainSelector({ domains, selectedId, onSelect }: TrustDomainSelectorProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selected = domains.find(d => d.id === selectedId) ?? domains[0]
  if (!selected) return null

  useEffect(() => {
    if (!open) return
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open])

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        aria-label="Select trust domain"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
        className="inline-flex items-center cursor-pointer border-none bg-transparent p-0"
        style={{ gap: 6 }}
      >
        <StatusDot status={selected.status} />
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#101212',
            letterSpacing: '0.26px',
            fontFamily: '"PT Mono", monospace',
          }}
        >
          {selected.name}
        </span>
        <ChevronsUpDown size={12} strokeWidth={1.8} color="#798585" />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select trust domain"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            backgroundColor: '#fff',
            border: '1px solid #e9ebed',
            borderRadius: 6,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            minWidth: 220,
            zIndex: 50,
            listStyle: 'none',
            margin: 0,
            padding: '4px 0',
          }}
        >
          {domains.map(domain => {
            const isSelected = domain.id === selectedId
            return (
              <li key={domain.id} role="option" aria-selected={isSelected}>
                <button
                  onClick={() => { onSelect(domain.id); setOpen(false) }}
                  className="flex items-center w-full text-left cursor-pointer border-none"
                  style={{
                    gap: 8,
                    padding: '7px 12px',
                    backgroundColor: isSelected ? 'rgba(62,124,121,0.07)' : 'transparent',
                    fontSize: 13,
                    fontWeight: isSelected ? 600 : 400,
                    color: '#101212',
                    letterSpacing: '0.26px',
                    fontFamily: '"PT Mono", monospace',
                  }}
                >
                  <StatusDot status={domain.status} />
                  {domain.name}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

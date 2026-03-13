import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  placeholder?: string
  disabled?: boolean
  error?: boolean
  onChange?: (value: string) => void
  className?: string
}

export function Select({
  options,
  value,
  placeholder = 'Select…',
  disabled = false,
  error = false,
  onChange,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false)
  }

  return (
    <div ref={ref} className={cn('relative w-full', className)} onKeyDown={handleKeyDown}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={cn(
          'w-full min-h-[32px] px-3 py-[5.5px] rounded border bg-white flex items-center justify-between gap-2',
          'text-[13px] leading-relaxed tracking-[0.26px] outline-none transition-shadow text-left cursor-pointer',
          'border-[#dde0e0]',
          open && 'border-[#9fa8a7] shadow-[0_0_0_3px_rgba(62,124,121,0.3)]',
          error && 'border-[#cd3d61]',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
        style={{ color: selected ? '#101212' : '#798585' }}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown size={16} style={{ color: '#798585', flexShrink: 0 }} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="options"
          className="absolute z-50 w-full mt-1 bg-white border border-[#dde0e0] rounded shadow-sm py-1"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange?.(opt.value)
                  setOpen(false)
                }}
                className={cn(
                  'flex items-center justify-between gap-3 px-3 h-8 text-[13px] cursor-pointer',
                  'hover:bg-[rgba(62,124,121,0.07)]',
                  isSelected ? 'font-semibold' : 'font-normal',
                )}
                style={{ color: '#101212', letterSpacing: '0.26px' }}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={16} style={{ color: '#3e7c79' }} />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

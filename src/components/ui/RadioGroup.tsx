import { cn } from '@/lib/cn'

// ─── RadioButton ───────────────────────────────────────────────────────────────

interface RadioButtonProps {
  checked: boolean
  onChange: () => void
  disabled?: boolean
  id?: string
}

export function RadioButton({ checked, onChange, disabled, id }: RadioButtonProps) {
  return (
    <span className="relative inline-flex items-center justify-center size-4 shrink-0">
      <input
        type="radio"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />
      <span
        aria-hidden
        className={cn(
          'size-4 rounded-full border-[1.5px] flex items-center justify-center transition-colors',
          checked ? 'border-[#3e7c79]' : 'border-[#dde0e0]',
          disabled && 'opacity-50',
        )}
      >
        {checked && (
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: '#3e7c79' }}
          />
        )}
      </span>
    </span>
  )
}

// ─── RadioGroup ────────────────────────────────────────────────────────────────

interface RadioGroupOption {
  value: string
  label: string
  disabled?: boolean
}

interface RadioGroupProps {
  options: RadioGroupOption[]
  value: string
  onChange: (value: string) => void
  name?: string
  disabled?: boolean
}

export function RadioGroup({ options, value, onChange, name, disabled }: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-2" role="radiogroup">
      {options.map((opt) => {
        const id = `${name ?? 'radio'}-${opt.value}`
        const isDisabled = disabled || opt.disabled
        const isChecked = opt.value === value
        return (
          <label
            key={opt.value}
            htmlFor={id}
            className={cn(
              'flex items-center gap-2 cursor-pointer',
              isDisabled && 'cursor-not-allowed opacity-50',
            )}
          >
            <RadioButton
              id={id}
              checked={isChecked}
              onChange={() => !isDisabled && onChange(opt.value)}
              disabled={isDisabled}
            />
            <span
              className="text-[13px] leading-relaxed"
              style={{ color: '#101212', letterSpacing: '0.26px' }}
            >
              {opt.label}
            </span>
          </label>
        )
      })}
    </div>
  )
}

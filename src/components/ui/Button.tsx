import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  Icon?: LucideIcon
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const VARIANT_STYLES: Record<ButtonVariant, { bg: string; color: string }> = {
  primary:   { bg: '#3e7c79',                    color: '#ffffff'  },
  secondary: { bg: 'rgba(62,124,121,0.07)',       color: '#3e7c79'  },
}

const SIZE_STYLES: Record<ButtonSize, { minHeight: number; padding: string; fontSize: number }> = {
  sm: { minHeight: 24, padding: '0 10px', fontSize: 11 },
  md: { minHeight: 32, padding: '5.5px 12px', fontSize: 11 },
}

export function Button({
  children,
  variant = 'secondary',
  size = 'md',
  Icon,
  onClick,
  disabled = false,
  type = 'button',
  className,
}: ButtonProps) {
  const { bg, color } = VARIANT_STYLES[variant]
  const { minHeight, padding, fontSize } = SIZE_STYLES[size]

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-[6px] font-semibold rounded cursor-pointer border-none transition-opacity whitespace-nowrap',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      style={{
        backgroundColor: bg,
        color,
        minHeight,
        padding,
        fontSize,
        letterSpacing: '0.22px',
        borderRadius: 4,
      }}
    >
      {Icon && <Icon size={13.25} strokeWidth={1.8} />}
      {children}
    </button>
  )
}

import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link' | 'destructive' | 'icon'
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

const VARIANT_STYLES: Record<ButtonVariant, { bg: string; color: string; hoverBg?: string }> = {
  primary:     { bg: '#3e7c79',                   color: '#ffffff'  },
  secondary:   { bg: 'rgba(62,124,121,0.07)',      color: '#3e7c79'  },
  ghost:       { bg: 'transparent',               color: '#3e7c79', hoverBg: 'rgba(62,124,121,0.07)' },
  link:        { bg: 'transparent',               color: '#3e7c79'  },
  destructive: { bg: 'rgba(205,61,97,0.07)',       color: '#cd3d61', hoverBg: 'rgba(205,61,97,0.15)' },
  icon:        { bg: 'transparent',               color: '#3e7c79', hoverBg: 'rgba(62,124,121,0.07)' },
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
  const { minHeight, padding, fontSize } = SIZE_STYLES[variant === 'link' || variant === 'icon' ? 'sm' : size]

  const isLink = variant === 'link'
  const isIcon = variant === 'icon'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-[6px] font-semibold rounded cursor-pointer border-none transition-opacity whitespace-nowrap',
        isLink && 'hover:underline',
        isIcon && 'p-1.5',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      style={{
        backgroundColor: bg,
        color,
        minHeight: isIcon ? 28 : minHeight,
        padding: isIcon ? undefined : isLink ? '0' : padding,
        fontSize,
        letterSpacing: '0.22px',
        borderRadius: 4,
      }}
    >
      {Icon && <Icon size={13.25} strokeWidth={1.8} />}
      {!isIcon && children}
    </button>
  )
}

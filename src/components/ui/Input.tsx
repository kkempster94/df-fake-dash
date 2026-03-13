import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean
}

export function Input({ error = false, disabled = false, className, ...props }: InputProps) {
  return (
    <input
      disabled={disabled}
      {...props}
      className={cn(
        'w-full min-h-[32px] px-3 py-[5.5px] rounded border bg-white text-[13px] leading-relaxed tracking-[0.26px] outline-none transition-shadow',
        'placeholder:text-[#798585]',
        'border-[#dde0e0]',
        'focus:border-[#9fa8a7] focus:shadow-[0_0_0_3px_rgba(62,124,121,0.3)]',
        error && 'border-[#cd3d61]',
        error && 'focus:shadow-[0_0_0_3px_rgba(252,165,165,1)]',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      style={{ color: '#101212' }}
    />
  )
}

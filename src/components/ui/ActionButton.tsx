import type { LucideIcon } from 'lucide-react'

interface ActionButtonProps {
  label: string
  Icon: LucideIcon
  onClick?: () => void
}

export function ActionButton({ label, Icon, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-[6px] font-semibold whitespace-nowrap cursor-pointer border-none bg-transparent p-0"
      style={{ color: '#3e7c79', fontSize: 11, letterSpacing: '0.22px', minHeight: 24 }}
    >
      <Icon size={13.25} strokeWidth={1.8} />
      {label}
    </button>
  )
}

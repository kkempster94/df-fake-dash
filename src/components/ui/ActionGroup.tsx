import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'

type ActionVariant = 'ghost' | 'secondary' | 'primary'

interface ActionItem {
  label: string
  variant?: ActionVariant
  Icon?: LucideIcon
  onClick?: () => void
  disabled?: boolean
}

interface ActionGroupProps {
  actions: ActionItem[]
  className?: string
}

export function ActionGroup({ actions, className }: ActionGroupProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {actions.map((action, i) => (
        <Button
          key={i}
          variant={action.variant ?? 'secondary'}
          Icon={action.Icon}
          onClick={action.onClick}
          disabled={action.disabled}
        >
          {action.label}
        </Button>
      ))}
    </div>
  )
}

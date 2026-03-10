import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ActionButton } from '@/components/ui/ActionButton'

interface GraphPanelProps {
  title: string
  subtitle: string
  total: string
  actionLabel: string
  ActionIcon: LucideIcon
  onActionClick?: () => void
  chart: ReactNode
  legend?: ReactNode
}

export function GraphPanel({
  title,
  subtitle,
  total,
  actionLabel,
  ActionIcon,
  onActionClick,
  chart,
  legend,
}: GraphPanelProps) {
  return (
    <div className="bg-white flex-1 flex flex-col gap-3 rounded-[4px] min-w-0">
      {/* Header */}
      <div className="flex items-baseline justify-between pb-3 whitespace-nowrap">
        <div className="flex flex-col gap-[2px] shrink-0" style={{ width: 252 }}>
          <p className="font-semibold text-h3" style={{ color: '#101212' }}>
            {title}
          </p>
          <p className="font-normal text-body-sm" style={{ color: '#798585' }}>
            {subtitle}
          </p>
        </div>
        <p className="font-semibold text-h2" style={{ color: '#101212' }}>
          {total}
        </p>
      </div>

      {/* Chart */}
      <div className="w-full" style={{ height: 100 }}>
        {chart}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between w-full">
        {legend ?? <span />}
        <ActionButton label={actionLabel} Icon={ActionIcon} onClick={onActionClick} />
      </div>
    </div>
  )
}

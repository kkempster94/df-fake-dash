import { Settings } from 'lucide-react'
import { StatusBadge, StatusDot } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/ui/PageHeader'
import { Skeleton } from '@/components/ui/Skeleton'
import { Tooltip } from '@/components/ui/Tooltip'
import { useActiveDomainQuery } from '@/lib/queries'

interface TDHeaderProps {
  onSettingsClick?: () => void
}

function TDHeaderSkeleton() {
  return (
    <PageHeader
      title={<Skeleton width={224} height={28} />}
      description={<Skeleton width={340} height={14} />}
      action={<Skeleton width={130} height={36} />}
    >
      <div className="flex flex-wrap" style={{ columnGap: 36, rowGap: 0 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Skeleton width={56} height={10} />
            <Skeleton width={72} height={20} />
          </div>
        ))}
      </div>
    </PageHeader>
  )
}

export function TDHeader({ onSettingsClick }: TDHeaderProps) {
  const { data: domain, isLoading } = useActiveDomainQuery()

  if (isLoading) return <TDHeaderSkeleton />
  if (!domain) return null

  return (
    <PageHeader
      title={<>{domain.name} <StatusBadge status={domain.status} /></>}
      description={
        <>
          {domain.subtitle}{' '}
          <a href="https://d.spirl.com/concepts/intro#trust-domains" style={{ color: '#3e7c79', textDecoration: 'underline' }}>
            Learn more
          </a>.
        </>
      }
      action={
        <Button Icon={Settings} onClick={onSettingsClick} variant="secondary" size="md">
          Edit settings
        </Button>
      }
    >
      {/* Stats row */}
      <div className="flex flex-wrap" style={{ columnGap: 36, rowGap: 0 }}>
        {domain.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <p
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: '#798585',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {stat.label}
            </p>
            <div className="flex items-center" style={{ height: 32, gap: 6 }}>
              <Tooltip content={stat.label} side="bottom">
                <span style={{ fontSize: 13, fontWeight: 600, color: '#101212', letterSpacing: '0.26px' }}>
                  {stat.value}
                </span>
              </Tooltip>
              {stat.dot && <StatusDot status="good" />}
            </div>
          </div>
        ))}
      </div>
    </PageHeader>
  )
}

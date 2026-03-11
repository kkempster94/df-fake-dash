import { Settings } from 'lucide-react'
import { StatusBadge, StatusDot } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/ui/PageHeader'
import type { TrustDomainRecord } from '@/data/mockData'

interface TDHeaderProps {
  domain: TrustDomainRecord
  onSettingsClick?: () => void
}

export function TDHeader({ domain, onSettingsClick }: TDHeaderProps) {
  return (
    <PageHeader
      title={<>{domain.name} <StatusBadge status={domain.status} /></>}
      description={
        <>
          {domain.subtitle}{' '}
          <a href="https://d.spirl.com/concepts/intro#trust-domains" style={{ color: '#798585', textDecoration: 'underline' }}>
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
              <span style={{ fontSize: 13, fontWeight: 600, color: '#101212', letterSpacing: '0.26px' }}>
                {stat.value}
              </span>
              {stat.dot && <StatusDot status="good" />}
            </div>
          </div>
        ))}
      </div>
    </PageHeader>
  )
}

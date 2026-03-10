import { Eye } from 'lucide-react'
import { credentialLifespanData } from '@/data/mockData'
import { CertificateBadge, AudienceTag } from '@/components/ui/Badge'
import { ActionButton } from '@/components/ui/ActionButton'

const HEADER_STYLE = {
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: '0.8px',
  color: '#101212',
} as const

const CELL_TEXT = {
  fontSize: 13,
  color: '#3e3e3e',
  letterSpacing: '0.26px',
} as const

export function CredentialLifespan() {
  return (
    <section className="flex flex-col gap-3 w-full pb-4">
      {/* Section header */}
      <div className="flex items-center justify-between w-full">
        <p className="font-semibold text-h3 whitespace-nowrap" style={{ color: '#101212' }}>
          Credential lifespan statistics
        </p>
        <ActionButton label="View all audiences" Icon={Eye} />
      </div>

      <div className="bg-white w-full">
        {/* Table header */}
        <div
          className="flex h-[34px] items-center rounded-[4px]"
          style={{ backgroundColor: '#edf2f7' }}
        >
          <div className="flex-none flex flex-col h-full justify-center" style={{ width: 170 }}>
            <div className="flex items-center pl-4 py-[6px]">
              <span className="uppercase" style={HEADER_STYLE}>CREDENTIAL TYPE</span>
            </div>
          </div>
          <div className="flex-none flex flex-col h-full justify-center" style={{ width: 170 }}>
            <div className="flex items-center px-2">
              <span className="uppercase" style={HEADER_STYLE}>CONFIGURED LIFETIME</span>
            </div>
          </div>
          <div className="flex-none flex flex-col h-full justify-center" style={{ width: 170 }}>
            <div className="flex items-center pl-2">
              <span className="uppercase" style={HEADER_STYLE}>AVG REMAINING</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col h-full justify-center min-w-0">
            <div className="flex items-center pl-2">
              <span className="uppercase" style={HEADER_STYLE}>TOP AUDIENCES</span>
            </div>
          </div>
        </div>

        {/* Data rows */}
        {credentialLifespanData.map((row) => (
          <div
            key={row.type}
            className="flex h-[34px] items-center"
            style={{ borderBottom: '1px solid #e9ebed' }}
          >
            <div className="flex-none flex flex-col h-full justify-center pl-4" style={{ width: 170 }}>
              <CertificateBadge type={row.type} />
            </div>
            <div className="flex-none flex flex-col h-full justify-center pl-2" style={{ width: 170 }}>
              <span className="truncate" style={CELL_TEXT}>{row.configuredLifetime}</span>
            </div>
            <div className="flex-none flex flex-col h-full justify-center pl-2" style={{ width: 170 }}>
              <span className="truncate" style={CELL_TEXT}>{row.avgRemaining}</span>
            </div>
            <div className="flex-1 flex flex-col h-full justify-center pl-2 min-w-0">
              {row.topAudiences.length > 0 ? (
                <div className="flex items-center gap-[10px] overflow-hidden">
                  {row.topAudiences.map((audience) => (
                    <AudienceTag key={audience} label={audience} />
                  ))}
                </div>
              ) : (
                <span style={CELL_TEXT}>n/a</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

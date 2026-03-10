import type { StatusLevel } from '@/data/mockData'

interface StatusDotProps {
  status: StatusLevel
  className?: string
}

const statusColors: Record<StatusLevel, string> = {
  good: '#28a868',
  degraded: '#f59e0b',
  bad: '#ef4444',
}

export function StatusDot({ status, className }: StatusDotProps) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: statusColors[status],
        flexShrink: 0,
      }}
    />
  )
}

interface StatusBadgeProps {
  status: StatusLevel
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status !== 'good') return null
  return (
    <span
      className="inline-flex items-center gap-[5px] px-2 py-px rounded-full"
      style={{
        backgroundColor: 'rgba(40,168,104,0.07)',
        minHeight: 20,
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#28a868',
          flexShrink: 0,
        }}
      />
      <span
        className="font-semibold tracking-[0.2px]"
        style={{ color: '#28a868', fontSize: 10 }}
      >
        Good
      </span>
    </span>
  )
}

interface CertificateBadgeProps {
  type: 'x509' | 'jwt'
}

export function CertificateBadge({ type }: CertificateBadgeProps) {
  const isX509 = type === 'x509'
  return (
    <span
      className="inline-flex items-center justify-center rounded-full"
      style={{
        backgroundColor: isX509
          ? 'rgba(2,174,231,0.08)'
          : 'rgba(29,195,115,0.08)',
        color: isX509 ? '#02aee7' : '#1dc373',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.2px',
        padding: '0 8px',
        minHeight: 20,
        width: isX509 ? 72 : 52,
      }}
    >
      {isX509 ? 'X.509' : 'JWT'}
    </span>
  )
}

interface AudienceTagProps {
  label: string
}

export function AudienceTag({ label }: AudienceTagProps) {
  return (
    <span
      className="inline-flex items-center justify-center font-mono text-mono whitespace-nowrap rounded"
      style={{
        backgroundColor: 'rgba(62,124,121,0.07)',
        border: '1px solid rgba(62,124,121,0.3)',
        color: '#3e7c79',
        padding: '2px 8px',
        fontSize: 12,
        letterSpacing: '0.24px',
      }}
    >
      {label}
    </span>
  )
}

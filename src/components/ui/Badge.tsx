import type { StatusLevel } from '@/data/mockData'

// ─── StatusDot ─────────────────────────────────────────────────────────────────

interface StatusDotProps {
  status: StatusLevel
  className?: string
}

const STATUS_COLORS: Record<StatusLevel, string> = {
  good: '#28a868',
  degraded: '#f59e0b',
  bad: '#ef4444',
}

export function StatusDot({ status, className }: StatusDotProps) {
  return (
    <span
      className={className}
      data-status={status}
      style={{
        display: 'inline-block',
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: STATUS_COLORS[status],
        flexShrink: 0,
      }}
    />
  )
}

// ─── StatusBadge ───────────────────────────────────────────────────────────────

const STATUS_BADGE_CONFIG: Record<StatusLevel, { bg: string; color: string; label: string }> = {
  good:     { bg: 'rgba(40,168,104,0.07)',  color: '#28a868', label: 'Good'     },
  degraded: { bg: 'rgba(245,158,11,0.08)', color: '#f59e0b', label: 'Degraded' },
  bad:      { bg: 'rgba(239,68,68,0.08)',  color: '#ef4444', label: 'Error'    },
}

interface StatusBadgeProps {
  status: StatusLevel
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { bg, color, label } = STATUS_BADGE_CONFIG[status]
  return (
    <span
      className="inline-flex items-center gap-[5px] px-2 py-px rounded-full"
      style={{ backgroundColor: bg, minHeight: 20 }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: color,
          flexShrink: 0,
        }}
      />
      <span
        className="font-semibold"
        style={{ color, fontSize: 10, letterSpacing: '0.2px' }}
      >
        {label}
      </span>
    </span>
  )
}

// ─── CertificateBadge ──────────────────────────────────────────────────────────

const CERT_CONFIG = {
  x509: { bg: 'rgba(2,174,231,0.08)',    color: '#02aee7', label: 'X.509', width: 72 },
  jwt:  { bg: 'rgba(29,195,115,0.08)',   color: '#1dc373', label: 'JWT',   width: 52 },
}

interface CertificateBadgeProps {
  type: 'x509' | 'jwt'
}

export function CertificateBadge({ type }: CertificateBadgeProps) {
  const { bg, color, label, width } = CERT_CONFIG[type]
  return (
    <span
      className="inline-flex items-center justify-center rounded-full"
      style={{
        backgroundColor: bg,
        color,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.2px',
        padding: '0 8px',
        minHeight: 20,
        width,
      }}
    >
      {label}
    </span>
  )
}

// ─── AudienceTag ───────────────────────────────────────────────────────────────

interface AudienceTagProps {
  label: string
}

export function AudienceTag({ label }: AudienceTagProps) {
  return (
    <span
      className="inline-flex items-center justify-center whitespace-nowrap rounded"
      style={{
        fontFamily: '"PT Mono", monospace',
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

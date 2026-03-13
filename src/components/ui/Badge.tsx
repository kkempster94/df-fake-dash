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

// ─── PercentageBadge ───────────────────────────────────────────────────────────

type PercentageLevel = 'neutral' | 'concerning' | 'bad' | 'good'

const PERCENTAGE_CONFIG: Record<PercentageLevel, { bg: string; color: string }> = {
  neutral:    { bg: 'rgba(95,105,105,0.1)',   color: '#5f6969' },
  concerning: { bg: 'rgba(255,112,32,0.07)',  color: '#ff7020' },
  bad:        { bg: 'rgba(205,61,97,0.07)',   color: '#cd3d61' },
  good:       { bg: 'rgba(40,168,104,0.07)',  color: '#28a868' },
}

interface PercentageBadgeProps {
  type: PercentageLevel
  value: string
}

export function PercentageBadge({ type, value }: PercentageBadgeProps) {
  const { bg, color } = PERCENTAGE_CONFIG[type]
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-semibold"
      style={{ backgroundColor: bg, color, fontSize: 10, letterSpacing: '0.2px', padding: '0 8px', minHeight: 20, width: 44 }}
    >
      {value}
    </span>
  )
}

// ─── RemediationWorkflowBadge ──────────────────────────────────────────────────

type RemediationStatus = 'NotStarted' | 'Cloning' | 'Complete' | 'Deploying' | 'Planning' | 'Pending'

const REMEDIATION_CONFIG: Record<RemediationStatus, { bg: string; color: string; label: string }> = {
  NotStarted: { bg: 'rgba(95,105,105,0.1)',   color: '#5f6969', label: 'Not Started' },
  Cloning:    { bg: 'rgba(2,124,231,0.08)',   color: '#027ce7', label: 'Cloning'     },
  Complete:   { bg: 'rgba(40,168,104,0.07)',  color: '#28a868', label: 'Complete'    },
  Deploying:  { bg: 'rgba(2,174,231,0.08)',   color: '#02aee7', label: 'Deploying'   },
  Planning:   { bg: 'rgba(2,124,231,0.08)',   color: '#027ce7', label: 'Planning'    },
  Pending:    { bg: 'rgba(245,158,11,0.08)',  color: '#f59e0b', label: 'Pending'     },
}

interface RemediationWorkflowBadgeProps {
  status: RemediationStatus
}

export function RemediationWorkflowBadge({ status }: RemediationWorkflowBadgeProps) {
  const { bg, color, label } = REMEDIATION_CONFIG[status]
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-semibold"
      style={{ backgroundColor: bg, color, fontSize: 10, letterSpacing: '0.2px', padding: '0 8px', minHeight: 20, width: 82 }}
    >
      {label}
    </span>
  )
}

// ─── ScannedCredentialBadge ────────────────────────────────────────────────────

type ScannedCredentialStatus = 'Remediated' | 'Unused' | 'Active'

const SCANNED_CONFIG: Record<ScannedCredentialStatus, { bg: string; color: string }> = {
  Active:     { bg: 'rgba(40,168,104,0.07)', color: '#28a868' },
  Remediated: { bg: 'rgba(2,124,231,0.08)',  color: '#027ce7' },
  Unused:     { bg: 'rgba(245,158,11,0.08)', color: '#f59e0b' },
}

interface ScannedCredentialBadgeProps {
  status: ScannedCredentialStatus
}

export function ScannedCredentialBadge({ status }: ScannedCredentialBadgeProps) {
  const { bg, color } = SCANNED_CONFIG[status]
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-semibold"
      style={{ backgroundColor: bg, color, fontSize: 10, letterSpacing: '0.2px', padding: '0 8px', minHeight: 20, width: 82 }}
    >
      {status}
    </span>
  )
}

// ─── RiskScoreBadge ────────────────────────────────────────────────────────────

type RiskLevel = 'Good' | 'Concerning' | 'Bad'

const RISK_CONFIG: Record<RiskLevel, { bg: string; color: string }> = {
  Good:       { bg: 'rgba(40,168,104,0.07)', color: '#28a868' },
  Concerning: { bg: 'rgba(255,112,32,0.07)', color: '#ff7020' },
  Bad:        { bg: 'rgba(205,61,97,0.07)',  color: '#cd3d61' },
}

interface RiskScoreBadgeProps {
  level: RiskLevel
}

export function RiskScoreBadge({ level }: RiskScoreBadgeProps) {
  const { bg, color } = RISK_CONFIG[level]
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-semibold"
      style={{ backgroundColor: bg, color, fontSize: 10, letterSpacing: '0.2px', padding: '0 8px', minHeight: 20, width: 82 }}
    >
      {level}
    </span>
  )
}

// ─── ScannerStatusBadge ────────────────────────────────────────────────────────

type ScannerStatus = 'Active' | 'Inactive'

const SCANNER_CONFIG: Record<ScannerStatus, { bg: string; color: string }> = {
  Active:   { bg: 'rgba(40,168,104,0.07)', color: '#28a868' },
  Inactive: { bg: 'rgba(95,105,105,0.1)',  color: '#5f6969' },
}

interface ScannerStatusBadgeProps {
  status: ScannerStatus
}

export function ScannerStatusBadge({ status }: ScannerStatusBadgeProps) {
  const { bg, color } = SCANNER_CONFIG[status]
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-semibold"
      style={{ backgroundColor: bg, color, fontSize: 10, letterSpacing: '0.2px', padding: '0 8px', minHeight: 20, width: 100 }}
    >
      {status}
    </span>
  )
}

// ─── AlertBadge ────────────────────────────────────────────────────────────────

interface AlertBadgeProps {
  count?: number
}

export function AlertBadge({ count }: AlertBadgeProps) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-semibold"
      style={{
        backgroundColor: '#cd3d61',
        color: '#ffffff',
        fontSize: 9,
        letterSpacing: '0.18px',
        minWidth: 17,
        height: 14,
        padding: '0 4px',
      }}
    >
      {count != null ? count : ''}
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

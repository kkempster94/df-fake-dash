import type { Meta, StoryObj } from '@storybook/react'
import {
  StatusDot,
  StatusBadge,
  CertificateBadge,
  PercentageBadge,
  RemediationWorkflowBadge,
  ScannedCredentialBadge,
  RiskScoreBadge,
  ScannerStatusBadge,
  AlertBadge,
  AudienceTag,
} from '@/components/ui/Badge'

// ─── StatusDot ────────────────────────────────────────────────────────────────

const statusDotMeta = {
  component: StatusDot,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof StatusDot>

export default statusDotMeta

type StatusDotStory = StoryObj<typeof statusDotMeta>

export const DotGood: StatusDotStory = { name: 'StatusDot · Good', args: { status: 'good' } }
export const DotDegraded: StatusDotStory = { name: 'StatusDot · Degraded', args: { status: 'degraded' } }
export const DotBad: StatusDotStory = { name: 'StatusDot · Bad', args: { status: 'bad' } }

// ─── StatusBadge ─────────────────────────────────────────────────────────────

export const StatusBadgeGood: StoryObj = {
  name: 'StatusBadge · Good',
  render: () => <StatusBadge status="good" />,
}
export const StatusBadgeDegraded: StoryObj = {
  name: 'StatusBadge · Degraded',
  render: () => <StatusBadge status="degraded" />,
}
export const StatusBadgeBad: StoryObj = {
  name: 'StatusBadge · Bad',
  render: () => <StatusBadge status="bad" />,
}

// ─── CertificateBadge ─────────────────────────────────────────────────────────

export const CertX509: StoryObj = {
  name: 'CertificateBadge · X.509',
  render: () => <CertificateBadge type="x509" />,
}
export const CertJwt: StoryObj = {
  name: 'CertificateBadge · JWT',
  render: () => <CertificateBadge type="jwt" />,
}

// ─── PercentageBadge ──────────────────────────────────────────────────────────

export const PercentNeutral: StoryObj = {
  name: 'PercentageBadge · Neutral',
  render: () => <PercentageBadge type="neutral" value="72%" />,
}
export const PercentGood: StoryObj = {
  name: 'PercentageBadge · Good',
  render: () => <PercentageBadge type="good" value="98%" />,
}
export const PercentConcerning: StoryObj = {
  name: 'PercentageBadge · Concerning',
  render: () => <PercentageBadge type="concerning" value="45%" />,
}
export const PercentBad: StoryObj = {
  name: 'PercentageBadge · Bad',
  render: () => <PercentageBadge type="bad" value="12%" />,
}

// ─── RemediationWorkflowBadge ─────────────────────────────────────────────────

export const RemediationNotStarted: StoryObj = {
  name: 'RemediationWorkflowBadge · Not Started',
  render: () => <RemediationWorkflowBadge status="NotStarted" />,
}
export const RemediationCloning: StoryObj = {
  name: 'RemediationWorkflowBadge · Cloning',
  render: () => <RemediationWorkflowBadge status="Cloning" />,
}
export const RemediationComplete: StoryObj = {
  name: 'RemediationWorkflowBadge · Complete',
  render: () => <RemediationWorkflowBadge status="Complete" />,
}
export const RemediationDeploying: StoryObj = {
  name: 'RemediationWorkflowBadge · Deploying',
  render: () => <RemediationWorkflowBadge status="Deploying" />,
}

// ─── RiskScoreBadge ───────────────────────────────────────────────────────────

export const RiskGood: StoryObj = {
  name: 'RiskScoreBadge · Good',
  render: () => <RiskScoreBadge level="Good" />,
}
export const RiskConcerning: StoryObj = {
  name: 'RiskScoreBadge · Concerning',
  render: () => <RiskScoreBadge level="Concerning" />,
}
export const RiskBad: StoryObj = {
  name: 'RiskScoreBadge · Bad',
  render: () => <RiskScoreBadge level="Bad" />,
}

// ─── ScannedCredentialBadge ───────────────────────────────────────────────────

export const ScannedActive: StoryObj = {
  name: 'ScannedCredentialBadge · Active',
  render: () => <ScannedCredentialBadge status="Active" />,
}
export const ScannedRemediated: StoryObj = {
  name: 'ScannedCredentialBadge · Remediated',
  render: () => <ScannedCredentialBadge status="Remediated" />,
}
export const ScannedUnused: StoryObj = {
  name: 'ScannedCredentialBadge · Unused',
  render: () => <ScannedCredentialBadge status="Unused" />,
}

// ─── ScannerStatusBadge ───────────────────────────────────────────────────────

export const ScannerActive: StoryObj = {
  name: 'ScannerStatusBadge · Active',
  render: () => <ScannerStatusBadge status="Active" />,
}
export const ScannerInactive: StoryObj = {
  name: 'ScannerStatusBadge · Inactive',
  render: () => <ScannerStatusBadge status="Inactive" />,
}

// ─── AlertBadge ───────────────────────────────────────────────────────────────

export const AlertBadgeCount: StoryObj = {
  name: 'AlertBadge · With count',
  render: () => <AlertBadge count={3} />,
}
export const AlertBadgeNoCount: StoryObj = {
  name: 'AlertBadge · No count',
  render: () => <AlertBadge />,
}

// ─── AudienceTag ─────────────────────────────────────────────────────────────

export const AudienceTagStory: StoryObj = {
  name: 'AudienceTag',
  render: () => <AudienceTag label="spiffe://production.newco.com/api/auth" />,
}

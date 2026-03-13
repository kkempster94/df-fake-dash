import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  StatusDot, StatusBadge, CertificateBadge, AudienceTag,
  PercentageBadge, RemediationWorkflowBadge, ScannedCredentialBadge,
  RiskScoreBadge, ScannerStatusBadge, AlertBadge,
} from '../Badge'

describe('StatusDot', () => {
  it('renders a span with good color', () => {
    const { container } = render(<StatusDot status="good" />)
    const dot = container.querySelector('[data-status="good"]')
    expect(dot).toBeInTheDocument()
    expect(dot).toHaveStyle({ backgroundColor: '#28a868' })
  })

  it('renders a span with degraded color', () => {
    const { container } = render(<StatusDot status="degraded" />)
    const dot = container.querySelector('[data-status="degraded"]')
    expect(dot).toHaveStyle({ backgroundColor: '#f59e0b' })
  })

  it('renders a span with bad color', () => {
    const { container } = render(<StatusDot status="bad" />)
    const dot = container.querySelector('[data-status="bad"]')
    expect(dot).toHaveStyle({ backgroundColor: '#ef4444' })
  })

  it('applies optional className', () => {
    const { container } = render(<StatusDot status="good" className="my-class" />)
    expect(container.querySelector('.my-class')).toBeInTheDocument()
  })
})

describe('StatusBadge', () => {
  it('renders "Good" label for good status', () => {
    render(<StatusBadge status="good" />)
    expect(screen.getByText('Good')).toBeInTheDocument()
  })

  it('renders "Degraded" label for degraded status', () => {
    render(<StatusBadge status="degraded" />)
    expect(screen.getByText('Degraded')).toBeInTheDocument()
  })

  it('renders "Error" label for bad status', () => {
    render(<StatusBadge status="bad" />)
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('applies correct color for each status', () => {
    const { rerender } = render(<StatusBadge status="good" />)
    expect(screen.getByText('Good')).toHaveStyle({ color: '#28a868' })

    rerender(<StatusBadge status="degraded" />)
    expect(screen.getByText('Degraded')).toHaveStyle({ color: '#f59e0b' })

    rerender(<StatusBadge status="bad" />)
    expect(screen.getByText('Error')).toHaveStyle({ color: '#ef4444' })
  })
})

describe('CertificateBadge', () => {
  it('renders X.509 label for x509 type', () => {
    render(<CertificateBadge type="x509" />)
    expect(screen.getByText('X.509')).toBeInTheDocument()
  })

  it('renders JWT label for jwt type', () => {
    render(<CertificateBadge type="jwt" />)
    expect(screen.getByText('JWT')).toBeInTheDocument()
  })

  it('applies x509 background color', () => {
    const { container } = render(<CertificateBadge type="x509" />)
    expect(container.firstChild).toHaveStyle({ backgroundColor: 'rgba(2,174,231,0.08)' })
  })

  it('applies jwt background color', () => {
    const { container } = render(<CertificateBadge type="jwt" />)
    expect(container.firstChild).toHaveStyle({ backgroundColor: 'rgba(29,195,115,0.08)' })
  })

  it('x509 badge has correct width', () => {
    const { container } = render(<CertificateBadge type="x509" />)
    expect(container.firstChild).toHaveStyle({ width: '72px' })
  })

  it('jwt badge has correct width', () => {
    const { container } = render(<CertificateBadge type="jwt" />)
    expect(container.firstChild).toHaveStyle({ width: '52px' })
  })
})

describe('AudienceTag', () => {
  it('renders the label text', () => {
    render(<AudienceTag label="api.example.com" />)
    expect(screen.getByText('api.example.com')).toBeInTheDocument()
  })

  it('applies teal border color', () => {
    const { container } = render(<AudienceTag label="test" />)
    expect(container.firstChild).toHaveStyle({ border: '1px solid rgba(62,124,121,0.3)' })
  })
})

describe('PercentageBadge', () => {
  it.each([
    ['neutral',    '#5f6969'],
    ['concerning', '#ff7020'],
    ['bad',        '#cd3d61'],
    ['good',       '#28a868'],
  ] as const)('renders %s type with correct color', (type, color) => {
    render(<PercentageBadge type={type} value="75%" />)
    expect(screen.getByText('75%')).toHaveStyle({ color })
  })

  it('renders the value text', () => {
    render(<PercentageBadge type="good" value="42%" />)
    expect(screen.getByText('42%')).toBeInTheDocument()
  })
})

describe('RemediationWorkflowBadge', () => {
  it.each([
    ['NotStarted', 'Not Started'],
    ['Cloning',    'Cloning'],
    ['Complete',   'Complete'],
    ['Deploying',  'Deploying'],
    ['Planning',   'Planning'],
    ['Pending',    'Pending'],
  ] as const)('renders %s status label', (status, label) => {
    render(<RemediationWorkflowBadge status={status} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it('renders Complete with green color', () => {
    const { container } = render(<RemediationWorkflowBadge status="Complete" />)
    expect(container.firstChild).toHaveStyle({ color: '#28a868' })
  })

  it('renders Pending with amber color', () => {
    const { container } = render(<RemediationWorkflowBadge status="Pending" />)
    expect(container.firstChild).toHaveStyle({ color: '#f59e0b' })
  })
})

describe('ScannedCredentialBadge', () => {
  it.each(['Remediated', 'Unused', 'Active'] as const)('renders %s status text', (status) => {
    render(<ScannedCredentialBadge status={status} />)
    expect(screen.getByText(status)).toBeInTheDocument()
  })

  it('renders Active with green color', () => {
    const { container } = render(<ScannedCredentialBadge status="Active" />)
    expect(container.firstChild).toHaveStyle({ color: '#28a868' })
  })
})

describe('RiskScoreBadge', () => {
  it.each(['Good', 'Concerning', 'Bad'] as const)('renders %s level text', (level) => {
    render(<RiskScoreBadge level={level} />)
    expect(screen.getByText(level)).toBeInTheDocument()
  })

  it('renders Good with green color', () => {
    const { container } = render(<RiskScoreBadge level="Good" />)
    expect(container.firstChild).toHaveStyle({ color: '#28a868' })
  })

  it('renders Bad with red color', () => {
    const { container } = render(<RiskScoreBadge level="Bad" />)
    expect(container.firstChild).toHaveStyle({ color: '#cd3d61' })
  })
})

describe('ScannerStatusBadge', () => {
  it('renders Active text', () => {
    render(<ScannerStatusBadge status="Active" />)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders Inactive text', () => {
    render(<ScannerStatusBadge status="Inactive" />)
    expect(screen.getByText('Inactive')).toBeInTheDocument()
  })

  it('renders Active with green color', () => {
    const { container } = render(<ScannerStatusBadge status="Active" />)
    expect(container.firstChild).toHaveStyle({ color: '#28a868' })
  })

  it('renders Inactive with neutral color', () => {
    const { container } = render(<ScannerStatusBadge status="Inactive" />)
    expect(container.firstChild).toHaveStyle({ color: '#5f6969' })
  })
})

describe('AlertBadge', () => {
  it('renders a badge element', () => {
    const { container } = render(<AlertBadge />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders count when provided', () => {
    render(<AlertBadge count={5} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('has red background', () => {
    const { container } = render(<AlertBadge count={1} />)
    expect(container.firstChild).toHaveStyle({ backgroundColor: '#cd3d61' })
  })

  it('has white text color', () => {
    const { container } = render(<AlertBadge count={1} />)
    expect(container.firstChild).toHaveStyle({ color: '#ffffff' })
  })
})

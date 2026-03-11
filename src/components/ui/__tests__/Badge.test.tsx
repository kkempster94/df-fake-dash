import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusDot, StatusBadge, CertificateBadge, AudienceTag } from '../Badge'

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

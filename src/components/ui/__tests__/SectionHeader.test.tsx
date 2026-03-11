import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SectionHeader } from '../SectionHeader'

describe('SectionHeader', () => {
  it('renders the title', () => {
    render(<SectionHeader title="Audit Logs" />)
    expect(screen.getByText('Audit Logs')).toBeInTheDocument()
  })

  it('renders the action node when provided', () => {
    render(
      <SectionHeader
        title="My Section"
        action={<button>View all</button>}
      />
    )
    expect(screen.getByRole('button', { name: 'View all' })).toBeInTheDocument()
  })

  it('renders without action without throwing', () => {
    expect(() => render(<SectionHeader title="No Action" />)).not.toThrow()
  })

  it('does not render action slot when undefined', () => {
    const { container } = render(<SectionHeader title="No Action" />)
    // Should only have the wrapper div and the title p
    const children = container.firstElementChild?.children
    expect(children).toHaveLength(1)
  })
})

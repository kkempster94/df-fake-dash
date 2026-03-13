import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InlineMessage } from '../InlineMessage'

describe('InlineMessage', () => {
  it('renders children text', () => {
    render(<InlineMessage type="good">All good</InlineMessage>)
    expect(screen.getByText('All good')).toBeInTheDocument()
  })

  it('renders good type with correct color', () => {
    const { container } = render(<InlineMessage type="good">OK</InlineMessage>)
    expect(container.firstChild).toHaveStyle({ color: '#28a868' })
  })

  it('renders bad type with correct color', () => {
    const { container } = render(<InlineMessage type="bad">Error</InlineMessage>)
    expect(container.firstChild).toHaveStyle({ color: '#cd3d61' })
  })

  it('renders concerning type with correct color', () => {
    const { container } = render(<InlineMessage type="concerning">Warning</InlineMessage>)
    expect(container.firstChild).toHaveStyle({ color: '#ff7020' })
  })

  it('renders neutral type with correct color', () => {
    const { container } = render(<InlineMessage type="neutral">Info</InlineMessage>)
    expect(container.firstChild).toHaveStyle({ color: '#9fa8a7' })
  })

  it('shows icon by default for good/bad/concerning types', () => {
    const { container } = render(<InlineMessage type="bad">Err</InlineMessage>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('does not show icon for neutral type', () => {
    const { container } = render(<InlineMessage type="neutral">Neutral</InlineMessage>)
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('hides icon when icon=false', () => {
    const { container } = render(<InlineMessage type="bad" icon={false}>Err</InlineMessage>)
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })
})

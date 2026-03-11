import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MonoText } from '../MonoText'

describe('MonoText', () => {
  it('renders the text content', () => {
    render(<MonoText>https://example.com</MonoText>)
    expect(screen.getByText('https://example.com')).toBeInTheDocument()
  })

  it('applies monospace font family', () => {
    const { container } = render(<MonoText>test</MonoText>)
    expect(container.firstChild).toHaveStyle({ fontFamily: '"PT Mono", monospace' })
  })

  it('renders in primary color by default', () => {
    const { container } = render(<MonoText>test</MonoText>)
    expect(container.firstChild).toHaveStyle({ color: '#101212' })
  })

  it('renders in muted color when muted prop is true', () => {
    const { container } = render(<MonoText muted>test</MonoText>)
    expect(container.firstChild).toHaveStyle({ color: '#798585' })
  })

  it('accepts an optional className', () => {
    const { container } = render(<MonoText className="truncate">test</MonoText>)
    expect(container.firstChild).toHaveClass('truncate')
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InfoGrid } from '../InfoGrid'
import type { InfoItem } from '../InfoGrid'

describe('InfoGrid', () => {
  it('renders all item labels', () => {
    const items: InfoItem[] = [
      { label: 'Name', value: 'Alice' },
      { label: 'Role', value: 'Admin' },
    ]
    render(<InfoGrid items={items} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
  })

  it('renders string values as spans', () => {
    const items: InfoItem[] = [{ label: 'Status', value: 'Active' }]
    const { container } = render(<InfoGrid items={items} />)
    const span = container.querySelector('span')
    expect(span).toBeInTheDocument()
    expect(span).toHaveTextContent('Active')
  })

  it('renders ReactNode values (e.g. a span with testid)', () => {
    const items: InfoItem[] = [
      { label: 'Badge', value: <span data-testid="custom-node">Custom</span> },
    ]
    render(<InfoGrid items={items} />)
    expect(screen.getByTestId('custom-node')).toBeInTheDocument()
    expect(screen.getByTestId('custom-node')).toHaveTextContent('Custom')
  })

  it('renders multiple items', () => {
    const items: InfoItem[] = [
      { label: 'A', value: 'val-a' },
      { label: 'B', value: 'val-b' },
      { label: 'C', value: 'val-c' },
    ]
    render(<InfoGrid items={items} />)
    expect(screen.getByText('val-a')).toBeInTheDocument()
    expect(screen.getByText('val-b')).toBeInTheDocument()
    expect(screen.getByText('val-c')).toBeInTheDocument()
  })

  it('labels are uppercase class', () => {
    const items: InfoItem[] = [{ label: 'Region', value: 'US' }]
    render(<InfoGrid items={items} />)
    const label = screen.getByText('Region')
    expect(label).toHaveClass('uppercase')
  })

  it('each item has its label above its value', () => {
    const items: InfoItem[] = [{ label: 'Type', value: 'AWS' }]
    const { container } = render(<InfoGrid items={items} />)
    const wrapper = container.firstChild?.firstChild as HTMLElement
    const label = wrapper.querySelector('p')
    const valueDiv = wrapper.querySelector('div')
    // Label comes before value in DOM
    expect(label?.compareDocumentPosition(valueDiv!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
  })
})

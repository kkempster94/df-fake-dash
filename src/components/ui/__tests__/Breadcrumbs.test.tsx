import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Breadcrumbs } from '../Breadcrumbs'
import type { BreadcrumbItem } from '../Breadcrumbs'

describe('Breadcrumbs', () => {
  it('has a nav landmark with Breadcrumb label', () => {
    render(<Breadcrumbs items={[{ label: 'Home' }]} />)
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
  })

  it('renders all item labels', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Trust Domains' },
      { label: 'production.example.com', mono: true },
    ]
    render(<Breadcrumbs items={items} />)
    expect(screen.getByText('Trust Domains')).toBeInTheDocument()
    expect(screen.getByText('production.example.com')).toBeInTheDocument()
  })

  it('renders chevron separators between items', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Trust Domains' },
      { label: 'production.example.com' },
    ]
    const { container } = render(<Breadcrumbs items={items} />)
    expect(container.querySelectorAll('svg').length).toBe(1)
  })

  it('does not render a separator before the first item', () => {
    const { container } = render(<Breadcrumbs items={[{ label: 'Only' }]} />)
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('renders three separators for four items', () => {
    const items: BreadcrumbItem[] = [
      { label: 'A' },
      { label: 'B' },
      { label: 'C' },
      { label: 'D' },
    ]
    const { container } = render(<Breadcrumbs items={items} />)
    expect(container.querySelectorAll('svg').length).toBe(3)
  })

  it('renders a button when onClick is provided', () => {
    const items: BreadcrumbItem[] = [{ label: 'Trust Domains', onClick: vi.fn() }]
    render(<Breadcrumbs items={items} />)
    expect(screen.getByRole('button', { name: 'Trust Domains' })).toBeInTheDocument()
  })

  it('renders a span (not button) when onClick is absent', () => {
    render(<Breadcrumbs items={[{ label: 'Trust Domains' }]} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.getByText('Trust Domains')).toBeInTheDocument()
  })

  it('calls onClick when a clickable crumb is clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Breadcrumbs items={[{ label: 'Trust Domains', onClick }]} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('applies primary color to all items', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Trust Domains' },
      { label: 'production.example.com' },
    ]
    render(<Breadcrumbs items={items} />)
    expect(screen.getByText('Trust Domains')).toHaveStyle({ color: '#101212' })
    expect(screen.getByText('production.example.com')).toHaveStyle({ color: '#101212' })
  })

  it('applies semibold weight to the last item', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Trust Domains' },
      { label: 'production.example.com' },
    ]
    render(<Breadcrumbs items={items} />)
    expect(screen.getByText('production.example.com')).toHaveStyle({ fontWeight: 600 })
  })

  it('applies normal weight to non-last items', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Trust Domains' },
      { label: 'production.example.com' },
    ]
    render(<Breadcrumbs items={items} />)
    expect(screen.getByText('Trust Domains')).toHaveStyle({ fontWeight: 400 })
  })

  it('applies white pill background to the last item', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Trust Domains' },
      { label: 'production.example.com' },
    ]
    render(<Breadcrumbs items={items} />)
    const lastCrumbWrapper = screen.getByText('production.example.com').parentElement
    expect(lastCrumbWrapper).toHaveStyle({ backgroundColor: 'rgba(255,255,255,0.7)' })
  })

  it('does not apply active background to non-last items', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Trust Domains' },
      { label: 'production.example.com' },
    ]
    render(<Breadcrumbs items={items} />)
    const firstCrumbWrapper = screen.getByText('Trust Domains').parentElement
    const bg = firstCrumbWrapper?.style.backgroundColor
    expect(bg).not.toBe('rgba(255,255,255,0.7)')
  })

  it('applies PT Mono font when mono=true', () => {
    render(<Breadcrumbs items={[{ label: 'production.example.com', mono: true }]} />)
    expect(screen.getByText('production.example.com')).toHaveStyle({
      fontFamily: '"PT Mono", monospace',
    })
  })

  it('does not apply PT Mono when mono is absent', () => {
    render(<Breadcrumbs items={[{ label: 'Trust Domains' }]} />)
    const el = screen.getByText('Trust Domains')
    expect(el.style.fontFamily).not.toBe('"PT Mono", monospace')
  })

  it('renders a custom node slot instead of label when node is provided', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Trust Domains' },
      { node: <span data-testid="custom-node">Custom</span> },
    ]
    render(<Breadcrumbs items={items} />)
    expect(screen.getByTestId('custom-node')).toBeInTheDocument()
  })

  it('still wraps a node slot crumb in the active pill', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Trust Domains' },
      { node: <span data-testid="custom-node">Custom</span> },
    ]
    render(<Breadcrumbs items={items} />)
    const wrapper = screen.getByTestId('custom-node').parentElement
    expect(wrapper).toHaveStyle({ backgroundColor: 'rgba(255,255,255,0.7)' })
  })

  it('renders a badge next to the item when provided', () => {
    const items: BreadcrumbItem[] = [
      { label: 'production.example.com', badge: <span data-testid="badge">Good</span> },
    ]
    render(<Breadcrumbs items={items} />)
    expect(screen.getByTestId('badge')).toBeInTheDocument()
  })
})

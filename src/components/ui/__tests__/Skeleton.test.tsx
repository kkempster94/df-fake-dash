import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Skeleton } from '../Skeleton'

describe('Skeleton', () => {
  it('renders with aria-hidden', () => {
    render(<Skeleton />)
    const el = document.querySelector('[aria-hidden="true"]')
    expect(el).toBeInTheDocument()
  })

  it('applies custom className alongside base classes', () => {
    render(<Skeleton className="rounded-full" />)
    const el = document.querySelector('[aria-hidden="true"]') as HTMLElement
    expect(el.className).toContain('rounded-full')
    expect(el.className).toContain('animate-pulse')
  })

  it('applies numeric width and height as inline styles', () => {
    render(<Skeleton width={120} height={24} />)
    const el = document.querySelector('[aria-hidden="true"]') as HTMLElement
    expect(el).toHaveStyle({ width: '120px', height: '24px' })
  })

  it('applies string width and height as inline styles', () => {
    render(<Skeleton width="100%" height="2rem" />)
    const el = document.querySelector('[aria-hidden="true"]') as HTMLElement
    expect(el).toHaveStyle({ width: '100%', height: '2rem' })
  })

  it('renders without width or height when omitted', () => {
    render(<Skeleton />)
    const el = document.querySelector('[aria-hidden="true"]') as HTMLElement
    expect(el.style.width).toBe('')
    expect(el.style.height).toBe('')
  })

  it('renders as a <span> so it is valid inside <p> elements', () => {
    // Regression: previously rendered as <div>, causing invalid DOM nesting
    // when used inside PageHeader's description prop (which wraps content in <p>).
    render(<Skeleton />)
    const el = document.querySelector('[aria-hidden="true"]') as HTMLElement
    expect(el.tagName).toBe('SPAN')
  })
})

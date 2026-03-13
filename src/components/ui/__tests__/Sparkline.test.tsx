import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Sparkline } from '../Sparkline'

describe('Sparkline', () => {
  it('renders without crashing', () => {
    const { container } = render(<Sparkline data={[1, 2, 3]} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders a recharts svg element', () => {
    const { container } = render(<Sparkline data={[10, 20, 15, 25]} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Sparkline data={[1, 2]} className="my-sparkline" />)
    expect(container.firstChild).toHaveClass('my-sparkline')
  })

  it('renders with neutral variant (default)', () => {
    const { container } = render(<Sparkline data={[1, 2, 3]} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders with good variant', () => {
    const { container } = render(<Sparkline data={[1, 2, 3]} variant="good" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders with bad variant', () => {
    const { container } = render(<Sparkline data={[1, 2, 3]} variant="bad" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders with custom width and height', () => {
    const { container } = render(<Sparkline data={[1, 2, 3]} width={100} height={30} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '100')
    expect(svg).toHaveAttribute('height', '30')
  })

  it('renders with single data point without crashing', () => {
    expect(() => render(<Sparkline data={[42]} />)).not.toThrow()
  })

  it('renders with empty data without crashing', () => {
    expect(() => render(<Sparkline data={[]} />)).not.toThrow()
  })
})

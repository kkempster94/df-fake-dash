import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CodeBlock } from '../CodeBlock'

// Mock clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: vi.fn().mockResolvedValue(undefined) },
  writable: true,
})

describe('CodeBlock', () => {
  it('renders the code text', () => {
    render(<CodeBlock code="npm install react" />)
    expect(screen.getByText('npm install react')).toBeInTheDocument()
  })

  it('renders code inside a pre element', () => {
    const { container } = render(<CodeBlock code="const x = 1" />)
    const pre = container.querySelector('pre')
    expect(pre).toBeInTheDocument()
    expect(pre).toHaveTextContent('const x = 1')
  })

  it('renders a CopyButton (find by button text "Copy command")', () => {
    render(<CodeBlock code="some code" />)
    expect(screen.getByText('Copy command')).toBeInTheDocument()
  })

  it('has dark background (#101212) on the code container', () => {
    const { container } = render(<CodeBlock code="test" />)
    // The dark container is the first child div of the outer wrapper
    const outerDiv = container.firstElementChild as HTMLElement
    const darkDiv = outerDiv?.firstElementChild as HTMLElement
    // jsdom normalises hex to rgb
    expect(darkDiv?.style.backgroundColor).toBe('rgb(16, 18, 18)')
  })

  it('applies PT Mono font family to the pre element', () => {
    const { container } = render(<CodeBlock code="test" />)
    const pre = container.querySelector('pre')
    expect(pre).toHaveStyle({ fontFamily: '"PT Mono", monospace' })
  })

  it('renders multi-line code correctly (newlines preserved in pre)', () => {
    const code = 'line one\nline two\nline three'
    const { container } = render(<CodeBlock code={code} />)
    const pre = container.querySelector('pre')
    expect(pre).toHaveTextContent('line one')
    expect(pre).toHaveTextContent('line two')
    expect(pre).toHaveTextContent('line three')
    expect(pre?.textContent).toBe(code)
  })
})

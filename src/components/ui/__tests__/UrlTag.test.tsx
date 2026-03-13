import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UrlTag } from '../UrlTag'

describe('UrlTag', () => {
  it('renders the url as text when no label provided', () => {
    render(<UrlTag url="https://example.com" />)
    expect(screen.getByText('https://example.com')).toBeInTheDocument()
  })

  it('renders label text when provided', () => {
    render(<UrlTag url="https://example.com" label="Example" />)
    expect(screen.getByText('Example')).toBeInTheDocument()
  })

  it('does not render url text when label is provided', () => {
    render(<UrlTag url="https://example.com" label="Example" />)
    expect(screen.queryByText('https://example.com')).not.toBeInTheDocument()
  })

  it('renders a link icon (svg)', () => {
    const { container } = render(<UrlTag url="https://example.com" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<UrlTag url="https://example.com" onClick={onClick} />)
    await user.click(screen.getByText('https://example.com'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('applies blue color styling', () => {
    const { container } = render(<UrlTag url="https://example.com" />)
    expect(container.firstChild).toHaveStyle({ color: '#027ce7' })
  })

  it('applies blue background', () => {
    const { container } = render(<UrlTag url="https://example.com" />)
    expect(container.firstChild).toHaveStyle({ backgroundColor: 'rgba(2,124,231,0.07)' })
  })

  it('applies cursor-pointer when onClick is provided', () => {
    const { container } = render(<UrlTag url="https://example.com" onClick={() => {}} />)
    expect(container.firstChild).toHaveClass('cursor-pointer')
  })

  it('does not apply cursor-pointer when onClick is not provided', () => {
    const { container } = render(<UrlTag url="https://example.com" />)
    expect(container.firstChild).not.toHaveClass('cursor-pointer')
  })
})

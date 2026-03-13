import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Alert } from '../Alert'

describe('Alert', () => {
  it('has role="alert"', () => {
    render(<Alert severity="good">All clear</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(<Alert severity="neutral">Info message</Alert>)
    expect(screen.getByText('Info message')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Alert severity="bad" title="Error occurred">Details here</Alert>)
    expect(screen.getByText('Error occurred')).toBeInTheDocument()
  })

  it('does not render title element when not provided', () => {
    render(<Alert severity="good">No title</Alert>)
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument()
  })

  it('renders good severity with green background', () => {
    const { container } = render(<Alert severity="good">OK</Alert>)
    expect(container.firstChild).toHaveStyle({ backgroundColor: 'rgba(40,168,104,0.07)' })
  })

  it('renders bad severity with red background', () => {
    const { container } = render(<Alert severity="bad">Error</Alert>)
    expect(container.firstChild).toHaveStyle({ backgroundColor: 'rgba(205,61,97,0.07)' })
  })

  it('renders warning severity with orange background', () => {
    const { container } = render(<Alert severity="warning">Warning</Alert>)
    expect(container.firstChild).toHaveStyle({ backgroundColor: 'rgba(255,112,32,0.07)' })
  })

  it('renders neutral severity with gray background', () => {
    const { container } = render(<Alert severity="neutral">Info</Alert>)
    expect(container.firstChild).toHaveStyle({ backgroundColor: 'rgba(95,105,105,0.1)' })
  })

  it('renders an SVG icon', () => {
    const { container } = render(<Alert severity="good">Good</Alert>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders dismiss button when onDismiss is provided', () => {
    render(<Alert severity="neutral" onDismiss={() => {}}>Message</Alert>)
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument()
  })

  it('does not render dismiss button when onDismiss not provided', () => {
    render(<Alert severity="neutral">Message</Alert>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', async () => {
    const onDismiss = vi.fn()
    const user = userEvent.setup()
    render(<Alert severity="bad" onDismiss={onDismiss}>Error</Alert>)
    await user.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('accepts custom className', () => {
    const { container } = render(<Alert severity="good" className="my-alert">OK</Alert>)
    expect(container.firstChild).toHaveClass('my-alert')
  })
})

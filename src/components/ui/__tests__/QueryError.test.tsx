import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryError } from '../QueryError'

describe('QueryError', () => {
  it('renders the default message', () => {
    render(<QueryError />)
    expect(screen.getByText('Something went wrong loading this data.')).toBeInTheDocument()
  })

  it('renders a custom message', () => {
    render(<QueryError message="Failed to load SVIDs." />)
    expect(screen.getByText('Failed to load SVIDs.')).toBeInTheDocument()
  })

  it('does not render retry button when onRetry is not provided', () => {
    render(<QueryError />)
    expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument()
  })

  it('renders retry button when onRetry is provided', () => {
    render(<QueryError onRetry={() => {}} />)
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    render(<QueryError onRetry={onRetry} />)
    await user.click(screen.getByRole('button', { name: /try again/i }))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('has role="alert" for accessibility', () => {
    render(<QueryError />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('applies a custom className', () => {
    render(<QueryError className="my-custom-class" />)
    expect(screen.getByRole('alert')).toHaveClass('my-custom-class')
  })
})

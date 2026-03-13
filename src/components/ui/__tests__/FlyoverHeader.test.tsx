import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FlyoverHeader } from '../FlyoverHeader'

describe('FlyoverHeader', () => {
  it('renders the title', () => {
    render(<FlyoverHeader title="Panel title" />)
    expect(screen.getByText('Panel title')).toBeInTheDocument()
  })

  it('renders close button when onClose is provided', () => {
    render(<FlyoverHeader title="Panel" onClose={() => {}} />)
    expect(screen.getByRole('button', { name: 'Close panel' })).toBeInTheDocument()
  })

  it('does not render close button when onClose not provided', () => {
    render(<FlyoverHeader title="Panel" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<FlyoverHeader title="Panel" onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: 'Close panel' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders actions slot when provided', () => {
    render(
      <FlyoverHeader
        title="Panel"
        actions={<button>Action</button>}
      />
    )
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    const { container } = render(<FlyoverHeader title="Panel" className="my-header" />)
    expect(container.firstChild).toHaveClass('my-header')
  })

  it('has correct height class h-8', () => {
    const { container } = render(<FlyoverHeader title="Panel" />)
    expect(container.firstChild).toHaveClass('h-8')
  })
})

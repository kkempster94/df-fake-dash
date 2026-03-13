import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DialogHeader, DialogFooter } from '../Dialog'
import { Button } from '../Button'

describe('DialogHeader', () => {
  it('renders the title', () => {
    render(<DialogHeader title="Confirm action" />)
    expect(screen.getByText('Confirm action')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<DialogHeader title="Title" description="Some helpful description" />)
    expect(screen.getByText('Some helpful description')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    render(<DialogHeader title="Title" />)
    expect(screen.queryByText('Some helpful description')).not.toBeInTheDocument()
  })

  it('renders close button when onClose is provided', () => {
    render(<DialogHeader title="Title" onClose={() => {}} />)
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument()
  })

  it('does not render close button when onClose not provided', () => {
    render(<DialogHeader title="Title" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<DialogHeader title="Title" onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: 'Close dialog' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders title with h2 element', () => {
    render(<DialogHeader title="My Dialog" />)
    expect(screen.getByRole('heading', { level: 2, name: 'My Dialog' })).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    const { container } = render(<DialogHeader title="Title" className="my-header" />)
    expect(container.firstChild).toHaveClass('my-header')
  })
})

describe('DialogFooter', () => {
  it('renders children', () => {
    render(
      <DialogFooter>
        <Button>Cancel</Button>
        <Button variant="primary">Save</Button>
      </DialogFooter>
    )
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    const { container } = render(<DialogFooter className="my-footer"><span>x</span></DialogFooter>)
    expect(container.firstChild).toHaveClass('my-footer')
  })

  it('aligns content to the right (justify-end)', () => {
    const { container } = render(<DialogFooter><span>x</span></DialogFooter>)
    expect(container.firstChild).toHaveClass('justify-end')
  })
})

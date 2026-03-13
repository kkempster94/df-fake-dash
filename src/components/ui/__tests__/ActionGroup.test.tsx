import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Plus, Trash } from 'lucide-react'
import { ActionGroup } from '../ActionGroup'

describe('ActionGroup', () => {
  it('renders all action labels', () => {
    render(
      <ActionGroup actions={[
        { label: 'Add' },
        { label: 'Delete' },
      ]} />
    )
    expect(screen.getByText('Add')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('renders correct number of buttons', () => {
    render(
      <ActionGroup actions={[
        { label: 'One' },
        { label: 'Two' },
        { label: 'Three' },
      ]} />
    )
    expect(screen.getAllByRole('button')).toHaveLength(3)
  })

  it('calls onClick for the correct action', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <ActionGroup actions={[
        { label: 'Save', onClick },
        { label: 'Cancel' },
      ]} />
    )
    await user.click(screen.getByText('Save'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders icon when Icon is provided', () => {
    const { container } = render(
      <ActionGroup actions={[{ label: 'Add', Icon: Plus }]} />
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders a disabled button when disabled=true', () => {
    render(
      <ActionGroup actions={[{ label: 'Delete', Icon: Trash, disabled: true }]} />
    )
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('defaults to secondary variant', () => {
    render(<ActionGroup actions={[{ label: 'Test' }]} />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveStyle({ backgroundColor: 'rgba(62,124,121,0.07)', color: '#3e7c79' })
  })

  it('applies primary variant when specified', () => {
    render(<ActionGroup actions={[{ label: 'Save', variant: 'primary' }]} />)
    expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: '#3e7c79', color: '#ffffff' })
  })

  it('accepts custom className', () => {
    const { container } = render(
      <ActionGroup actions={[{ label: 'X' }]} className="my-group" />
    )
    expect(container.firstChild).toHaveClass('my-group')
  })

  it('renders empty actions array without error', () => {
    const { container } = render(<ActionGroup actions={[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})

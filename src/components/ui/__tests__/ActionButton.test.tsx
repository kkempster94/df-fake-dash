import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Star } from 'lucide-react'
import { ActionButton } from '../ActionButton'

describe('ActionButton', () => {
  it('renders the label', () => {
    render(<ActionButton label="View all" Icon={Star} />)
    expect(screen.getByText('View all')).toBeInTheDocument()
  })

  it('renders an icon', () => {
    const { container } = render(<ActionButton label="View all" Icon={Star} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<ActionButton label="Click me" Icon={Star} onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders without onClick without throwing', () => {
    expect(() => render(<ActionButton label="No handler" Icon={Star} />)).not.toThrow()
  })

  it('applies teal color styling', () => {
    render(<ActionButton label="Test" Icon={Star} />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveStyle({ color: '#3e7c79' })
  })
})

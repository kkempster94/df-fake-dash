import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Star } from 'lucide-react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renders with primary variant styles (bg #3e7c79, color #fff)', () => {
    render(<Button variant="primary">Primary</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveStyle({ backgroundColor: '#3e7c79', color: '#ffffff' })
  })

  it('renders with secondary variant styles (bg rgba(62,124,121,0.07), color #3e7c79)', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveStyle({ backgroundColor: 'rgba(62,124,121,0.07)', color: '#3e7c79' })
  })

  it('defaults to secondary variant when variant not specified', () => {
    render(<Button>Default</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveStyle({ color: '#3e7c79' })
  })

  it('renders with md size (minHeight 32)', () => {
    render(<Button size="md">MD</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveStyle({ minHeight: '32px' })
  })

  it('renders with sm size (minHeight 24)', () => {
    render(<Button size="sm">SM</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveStyle({ minHeight: '24px' })
  })

  it('defaults to md size when size not specified', () => {
    render(<Button>Default size</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveStyle({ minHeight: '32px' })
  })

  it('renders an icon (svg) when Icon prop is provided', () => {
    const { container } = render(<Button Icon={Star}>With icon</Button>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('does not render an icon when Icon is absent', () => {
    const { container } = render(<Button>No icon</Button>)
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={onClick} disabled>Disabled</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders as disabled when disabled=true (has disabled attribute)', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies opacity-50 class when disabled', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toHaveClass('opacity-50')
  })

  it('accepts custom className', () => {
    render(<Button className="my-custom-class">Custom</Button>)
    expect(screen.getByRole('button')).toHaveClass('my-custom-class')
  })

  it('renders with type="submit" when specified', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })
})

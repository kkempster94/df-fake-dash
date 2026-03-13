import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Menu, MenuItem } from '../Menu'

describe('Menu', () => {
  it('renders children', () => {
    render(
      <Menu>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })

  it('has role="menu"', () => {
    render(<Menu><MenuItem>Test</MenuItem></Menu>)
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    const { container } = render(<Menu className="my-menu"><MenuItem>Test</MenuItem></Menu>)
    expect(container.firstChild).toHaveClass('my-menu')
  })
})

describe('MenuItem', () => {
  it('renders children', () => {
    render(<Menu><MenuItem>Click me</MenuItem></Menu>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('has role="menuitem"', () => {
    render(<Menu><MenuItem>Item</MenuItem></Menu>)
    expect(screen.getByRole('menuitem')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Menu><MenuItem onClick={onClick}>Click me</MenuItem></Menu>)
    await user.click(screen.getByRole('menuitem'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('shows Check icon when checked=true', () => {
    const { container } = render(
      <Menu><MenuItem checked>Checked item</MenuItem></Menu>
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('does not show Check icon when checked=false', () => {
    const { container } = render(
      <Menu><MenuItem>Normal item</MenuItem></Menu>
    )
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('renders bold text when checked', () => {
    render(<Menu><MenuItem checked>Checked</MenuItem></Menu>)
    expect(screen.getByRole('menuitem')).toHaveClass('font-semibold')
  })

  it('renders normal font weight when not checked', () => {
    render(<Menu><MenuItem>Normal</MenuItem></Menu>)
    expect(screen.getByRole('menuitem')).toHaveClass('font-normal')
  })

  it('shows health dot when healthDot is provided', () => {
    const { container } = render(
      <Menu><MenuItem healthDot="good">With dot</MenuItem></Menu>
    )
    expect(container.querySelector('[data-status="good"]')).toBeInTheDocument()
  })

  it('is aria-disabled and does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Menu><MenuItem onClick={onClick} disabled>Disabled</MenuItem></Menu>)
    const item = screen.getByRole('menuitem')
    expect(item).toHaveAttribute('aria-disabled', 'true')
    await user.click(item)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('calls onClick on Enter key', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Menu><MenuItem onClick={onClick}>Item</MenuItem></Menu>)
    screen.getByRole('menuitem').focus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick on Space key', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Menu><MenuItem onClick={onClick}>Item</MenuItem></Menu>)
    screen.getByRole('menuitem').focus()
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

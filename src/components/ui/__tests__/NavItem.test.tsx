import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NavItem } from '../NavItem'

describe('NavItem', () => {
  it('renders the label', () => {
    render(<NavItem label="Trust domains" isActive={false} onClick={() => {}} />)
    expect(screen.getByText('Trust domains')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<NavItem label="Trust domains" isActive={false} onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('sets aria-current="page" when active', () => {
    render(<NavItem label="Trust domains" isActive={true} onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-current', 'page')
  })

  it('does not set aria-current when inactive', () => {
    render(<NavItem label="Trust domains" isActive={false} onClick={() => {}} />)
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-current')
  })

  it('applies white pill background when active', () => {
    render(<NavItem label="Trust domains" isActive={true} onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveStyle({
      backgroundColor: 'rgba(255,255,255,0.7)',
    })
  })

  it('does not apply active background when inactive', () => {
    render(<NavItem label="Settings" isActive={false} onClick={() => {}} />)
    // jsdom returns '' for 'transparent'; assert it is NOT the active highlight color
    const bg = screen.getByRole('button').style.backgroundColor
    expect(bg).not.toBe('rgba(255,255,255,0.7)')
  })

  it('applies dark primary text color', () => {
    render(<NavItem label="Trust domains" isActive={true} onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveStyle({ color: '#101212' })
  })

  it('applies semibold weight when active', () => {
    render(<NavItem label="Trust domains" isActive={true} onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveStyle({ fontWeight: 600 })
  })

  it('applies normal weight when inactive', () => {
    render(<NavItem label="Trust domains" isActive={false} onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveStyle({ fontWeight: 400 })
  })

  it('does not render an svg icon', () => {
    const { container } = render(
      <NavItem label="Trust domains" isActive={false} onClick={() => {}} />
    )
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('renders a red alert dot when alertBadge=true', () => {
    const { container } = render(
      <NavItem label="Alerts" isActive={false} onClick={() => {}} alertBadge />
    )
    const dot = container.querySelector('[aria-label="alert"]')
    expect(dot).toBeInTheDocument()
    expect(dot).toHaveStyle({ backgroundColor: '#cd3d61' })
  })

  it('does not render alert dot when alertBadge is not set', () => {
    const { container } = render(
      <NavItem label="Alerts" isActive={false} onClick={() => {}} />
    )
    expect(container.querySelector('[aria-label="alert"]')).not.toBeInTheDocument()
  })
})

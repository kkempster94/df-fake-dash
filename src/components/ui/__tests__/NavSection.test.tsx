import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NavSection } from '../NavSection'

const ITEMS = [
  { id: 'overview', label: 'Trust domains' },
  { id: 'cicd-profiles', label: 'CI/CD profiles' },
]

describe('NavSection', () => {
  it('renders the section heading', () => {
    render(
      <NavSection heading="MINT" items={ITEMS} activeId="" onNavigate={() => {}} />
    )
    expect(screen.getByText('MINT')).toBeInTheDocument()
  })

  it('renders all item labels', () => {
    render(
      <NavSection heading="MINT" items={ITEMS} activeId="" onNavigate={() => {}} />
    )
    expect(screen.getByText('Trust domains')).toBeInTheDocument()
    expect(screen.getByText('CI/CD profiles')).toBeInTheDocument()
  })

  it('marks the active item with aria-current', () => {
    render(
      <NavSection heading="MINT" items={ITEMS} activeId="overview" onNavigate={() => {}} />
    )
    expect(screen.getByText('Trust domains').closest('button')).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByText('CI/CD profiles').closest('button')).not.toHaveAttribute(
      'aria-current'
    )
  })

  it('calls onNavigate with the correct id when an item is clicked', async () => {
    const onNavigate = vi.fn()
    const user = userEvent.setup()
    render(
      <NavSection heading="MINT" items={ITEMS} activeId="" onNavigate={onNavigate} />
    )
    await user.click(screen.getByText('CI/CD profiles'))
    expect(onNavigate).toHaveBeenCalledWith('cicd-profiles')
  })

  it('renders the heading with uppercase styling', () => {
    render(
      <NavSection heading="MINT" items={ITEMS} activeId="" onNavigate={() => {}} />
    )
    const heading = screen.getByText('MINT')
    expect(heading).toHaveStyle({ textTransform: 'uppercase' })
  })

  it('renders heading in muted color', () => {
    render(
      <NavSection heading="MINT" items={ITEMS} activeId="" onNavigate={() => {}} />
    )
    expect(screen.getByText('MINT')).toHaveStyle({ color: '#798585' })
  })

  it('renders with no active item when activeId does not match any item', () => {
    render(
      <NavSection heading="MINT" items={ITEMS} activeId="nonexistent" onNavigate={() => {}} />
    )
    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => {
      expect(btn).not.toHaveAttribute('aria-current')
    })
  })
})

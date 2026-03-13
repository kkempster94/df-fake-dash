import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TrustDomainSelector } from '../TrustDomainSelector'
import type { DomainOption } from '../TrustDomainSelector'

const DOMAINS: DomainOption[] = [
  { id: 'production', name: 'production.newco.com', status: 'good'     },
  { id: 'staging',    name: 'staging.newco.com',    status: 'good'     },
  { id: 'dev',        name: 'dev.newco.com',         status: 'degraded' },
]

describe('TrustDomainSelector', () => {
  it('renders the selected domain name', () => {
    render(<TrustDomainSelector domains={DOMAINS} selectedId="production" onSelect={() => {}} />)
    expect(screen.getByText('production.newco.com')).toBeInTheDocument()
  })

  it('renders the chevrons-up-down toggle icon', () => {
    const { container } = render(
      <TrustDomainSelector domains={DOMAINS} selectedId="production" onSelect={() => {}} />
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('does not show the dropdown by default', () => {
    render(<TrustDomainSelector domains={DOMAINS} selectedId="production" onSelect={() => {}} />)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('opens the dropdown when the button is clicked', async () => {
    const user = userEvent.setup()
    render(<TrustDomainSelector domains={DOMAINS} selectedId="production" onSelect={() => {}} />)
    await user.click(screen.getByRole('button', { name: /select trust domain/i }))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('shows all domain options in the dropdown', async () => {
    const user = userEvent.setup()
    render(<TrustDomainSelector domains={DOMAINS} selectedId="production" onSelect={() => {}} />)
    await user.click(screen.getByRole('button', { name: /select trust domain/i }))
    expect(screen.getAllByText('production.newco.com')).toHaveLength(2) // trigger + option
    expect(screen.getByText('staging.newco.com')).toBeInTheDocument()
    expect(screen.getByText('dev.newco.com')).toBeInTheDocument()
  })

  it('marks the selected option with aria-selected', async () => {
    const user = userEvent.setup()
    render(<TrustDomainSelector domains={DOMAINS} selectedId="staging" onSelect={() => {}} />)
    await user.click(screen.getByRole('button', { name: /select trust domain/i }))
    const options = screen.getAllByRole('option')
    const stagingOption = options.find(o => o.textContent?.includes('staging.newco.com'))
    expect(stagingOption).toHaveAttribute('aria-selected', 'true')
  })

  it('calls onSelect with the correct id when an option is clicked', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<TrustDomainSelector domains={DOMAINS} selectedId="production" onSelect={onSelect} />)
    await user.click(screen.getByRole('button', { name: /select trust domain/i }))
    await user.click(screen.getByText('staging.newco.com'))
    expect(onSelect).toHaveBeenCalledWith('staging')
  })

  it('closes the dropdown after selection', async () => {
    const user = userEvent.setup()
    render(<TrustDomainSelector domains={DOMAINS} selectedId="production" onSelect={() => {}} />)
    await user.click(screen.getByRole('button', { name: /select trust domain/i }))
    await user.click(screen.getByText('staging.newco.com'))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('closes the dropdown on Escape key', async () => {
    const user = userEvent.setup()
    render(<TrustDomainSelector domains={DOMAINS} selectedId="production" onSelect={() => {}} />)
    await user.click(screen.getByRole('button', { name: /select trust domain/i }))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('sets aria-expanded on the toggle button', async () => {
    const user = userEvent.setup()
    render(<TrustDomainSelector domains={DOMAINS} selectedId="production" onSelect={() => {}} />)
    const btn = screen.getByRole('button', { name: /select trust domain/i })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    await user.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
  })

  it('falls back to first domain when selectedId does not match any domain', () => {
    render(<TrustDomainSelector domains={DOMAINS} selectedId="nonexistent" onSelect={() => {}} />)
    expect(screen.getByText('production.newco.com')).toBeInTheDocument()
  })

  it('closes dropdown on outside mousedown', async () => {
    const user = userEvent.setup()
    render(<TrustDomainSelector domains={DOMAINS} selectedId="production" onSelect={() => {}} />)
    await user.click(screen.getByRole('button', { name: /select trust domain/i }))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    fireEvent.mouseDown(document.body)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('renders a status dot for the selected domain', () => {
    const { container } = render(
      <TrustDomainSelector domains={DOMAINS} selectedId="dev" onSelect={() => {}} />
    )
    // StatusDot uses data-status attribute
    const dot = container.querySelector('[data-status="degraded"]')
    expect(dot).toBeInTheDocument()
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tab, Tabs } from '../Tabs'
import type { TabItem } from '../Tabs'

const ITEMS: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'agents',   label: 'Agents'   },
  { id: 'svids',    label: 'SVIDs'    },
]

// ─── Tab ──────────────────────────────────────────────────────────────────────

describe('Tab', () => {
  it('renders the label', () => {
    render(<Tab id="overview" label="Overview" isActive={false} onClick={() => {}} />)
    expect(screen.getByRole('tab', { name: 'Overview' })).toBeInTheDocument()
  })

  it('has role="tab"', () => {
    render(<Tab id="x" label="X" isActive={false} onClick={() => {}} />)
    expect(screen.getByRole('tab')).toBeInTheDocument()
  })

  it('sets aria-selected=true when active', () => {
    render(<Tab id="x" label="X" isActive={true} onClick={() => {}} />)
    expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'true')
  })

  it('sets aria-selected=false when inactive', () => {
    render(<Tab id="x" label="X" isActive={false} onClick={() => {}} />)
    expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'false')
  })

  it('sets aria-controls to tabpanel-{id}', () => {
    render(<Tab id="overview" label="Overview" isActive={false} onClick={() => {}} />)
    expect(screen.getByRole('tab')).toHaveAttribute('aria-controls', 'tabpanel-overview')
  })

  it('sets id to tab-{id}', () => {
    render(<Tab id="agents" label="Agents" isActive={false} onClick={() => {}} />)
    expect(screen.getByRole('tab')).toHaveAttribute('id', 'tab-agents')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Tab id="x" label="X" isActive={false} onClick={onClick} />)
    await user.click(screen.getByRole('tab'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('applies active teal color when active', () => {
    render(<Tab id="x" label="X" isActive={true} onClick={() => {}} />)
    expect(screen.getByRole('tab')).toHaveStyle({ color: '#3e7c79' })
  })

  it('applies muted color when inactive', () => {
    render(<Tab id="x" label="X" isActive={false} onClick={() => {}} />)
    expect(screen.getByRole('tab')).toHaveStyle({ color: '#798585' })
  })

  it('applies semibold weight when active', () => {
    render(<Tab id="x" label="X" isActive={true} onClick={() => {}} />)
    expect(screen.getByRole('tab')).toHaveStyle({ fontWeight: 600 })
  })

  it('applies normal weight when inactive', () => {
    render(<Tab id="x" label="X" isActive={false} onClick={() => {}} />)
    expect(screen.getByRole('tab')).toHaveStyle({ fontWeight: 400 })
  })
})

// ─── Tabs ─────────────────────────────────────────────────────────────────────

describe('Tabs', () => {
  it('renders all tab labels', () => {
    render(<Tabs items={ITEMS} activeId="overview" onChange={() => {}} />)
    expect(screen.getByRole('tab', { name: 'Overview' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Agents'   })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'SVIDs'    })).toBeInTheDocument()
  })

  it('has role="tablist"', () => {
    render(<Tabs items={ITEMS} activeId="overview" onChange={() => {}} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('marks only the active tab as aria-selected', () => {
    render(<Tabs items={ITEMS} activeId="agents" onChange={() => {}} />)
    expect(screen.getByRole('tab', { name: 'Agents'   })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tab', { name: 'SVIDs'    })).toHaveAttribute('aria-selected', 'false')
  })

  it('calls onChange with the clicked tab id', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Tabs items={ITEMS} activeId="overview" onChange={onChange} />)
    await user.click(screen.getByRole('tab', { name: 'Agents' }))
    expect(onChange).toHaveBeenCalledWith('agents')
  })

  it('applies optional className to the tablist', () => {
    const { container } = render(
      <Tabs items={ITEMS} activeId="overview" onChange={() => {}} className="px-8" />
    )
    expect(container.firstChild).toHaveClass('px-8')
  })

  it('renders the bottom border', () => {
    const { container } = render(
      <Tabs items={ITEMS} activeId="overview" onChange={() => {}} />
    )
    expect(container.firstChild).toHaveStyle({ borderBottom: '1px solid #e9ebed' })
  })

  it('renders count badge when count is provided on a tab item', () => {
    const itemsWithCount: TabItem[] = [
      { id: 'overview', label: 'Overview', count: 42 },
      { id: 'agents', label: 'Agents' },
    ]
    render(<Tabs items={itemsWithCount} activeId="overview" onChange={() => {}} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('does not render count badge when count is not provided', () => {
    render(<Tabs items={ITEMS} activeId="overview" onChange={() => {}} />)
    // No numeric-only text nodes from badges
    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument()
  })

  it('renders inactive count badge with opacity 0.7', () => {
    const items: TabItem[] = [
      { id: 'a', label: 'A', count: 5 },
      { id: 'b', label: 'B' },
    ]
    render(<Tabs items={items} activeId="b" onChange={() => {}} />)
    const badge = screen.getByText('5')
    expect(badge).toHaveStyle({ opacity: 0.7 })
  })

  it('formats counts >= 1000 as whole-number k', () => {
    const items: TabItem[] = [{ id: 'a', label: 'A', count: 1000 }]
    render(<Tabs items={items} activeId="a" onChange={() => {}} />)
    expect(screen.getByText('1k')).toBeInTheDocument()
  })

  it('formats counts with decimal k when not a round thousand', () => {
    const items: TabItem[] = [{ id: 'a', label: 'A', count: 1500 }]
    render(<Tabs items={items} activeId="a" onChange={() => {}} />)
    expect(screen.getByText('1.5k')).toBeInTheDocument()
  })

  it('renders counts below 1000 as plain numbers', () => {
    const items: TabItem[] = [{ id: 'a', label: 'A', count: 999 }]
    render(<Tabs items={items} activeId="a" onChange={() => {}} />)
    expect(screen.getByText('999')).toBeInTheDocument()
  })
})

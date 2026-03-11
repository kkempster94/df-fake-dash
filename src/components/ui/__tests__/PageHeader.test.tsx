import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PageHeader } from '../PageHeader'

describe('PageHeader', () => {
  it('renders the title', () => {
    render(<PageHeader title="My Title" />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My Title')
  })

  it('renders title as ReactNode', () => {
    render(
      <PageHeader
        title={<><span data-testid="badge">Active</span> My Title</>}
      />,
    )
    expect(screen.getByRole('heading', { level: 1 })).toContainElement(
      screen.getByTestId('badge'),
    )
  })

  it('renders inline node (e.g. badge) inside the title heading', () => {
    render(
      <PageHeader
        title={<>My Domain <span data-testid="status-badge">Active</span></>}
      />,
    )
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toContainElement(screen.getByTestId('status-badge'))
  })

  it('renders description when provided', () => {
    render(<PageHeader title="T" description="Some description text" />)
    expect(screen.getByText('Some description text')).toBeInTheDocument()
  })

  it('does not render description paragraph when omitted', () => {
    const { container } = render(<PageHeader title="T" />)
    expect(container.querySelector('p')).toBeNull()
  })

  it('renders description as ReactNode (link inside)', () => {
    render(
      <PageHeader
        title="T"
        description={<>Info text <a href="/more">Learn more</a>.</>}
      />,
    )
    expect(screen.getByRole('link', { name: 'Learn more' })).toBeInTheDocument()
    expect(screen.getByText(/Info text/)).toBeInTheDocument()
  })

  it('renders the action slot', () => {
    render(
      <PageHeader
        title="T"
        action={<button>Edit settings</button>}
      />,
    )
    expect(screen.getByRole('button', { name: 'Edit settings' })).toBeInTheDocument()
  })

  it('does not render action wrapper when action is omitted', () => {
    const { container } = render(<PageHeader title="T" />)
    // Only the heading wrapper div; no extra shrink-0 sibling
    const headerRow = container.querySelector('.flex.items-start.justify-between')!
    // heading side + no action side
    expect(headerRow.children).toHaveLength(1)
  })

  it('renders children below the divider', () => {
    render(
      <PageHeader title="T">
        <div data-testid="below">Stats here</div>
      </PageHeader>,
    )
    expect(screen.getByTestId('below')).toBeInTheDocument()
  })

  it('does not render children slot when omitted', () => {
    const { container } = render(<PageHeader title="T" />)
    // The only div after the divider would be the children; confirm absence
    const innerPad = container.querySelector('.px-8')!
    // Elements: title-row div, divider div — no third child
    expect(innerPad.children).toHaveLength(2)
  })

  it('applies correct heading styles', () => {
    render(<PageHeader title="Check styles" />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveStyle({ fontSize: '21px', fontWeight: '600', color: 'rgb(16, 18, 18)' })
  })

  it('applies correct description styles', () => {
    render(<PageHeader title="T" description="desc" />)
    const p = screen.getByText('desc')
    expect(p).toHaveStyle({ fontSize: '11px', color: 'rgb(121, 133, 133)' })
  })

  it('renders the outer divider element', () => {
    const { container } = render(<PageHeader title="T" />)
    // The divider div has height 1 via inline style
    const divider = container.querySelector('[style*="height: 1px"]') ??
                    container.querySelector('[style*="height:1px"]')
    expect(divider).not.toBeNull()
  })

  it('renders action and children together', () => {
    render(
      <PageHeader
        title="T"
        action={<button>Act</button>}
        description="desc"
      >
        <span data-testid="child">child</span>
      </PageHeader>,
    )
    expect(screen.getByRole('button', { name: 'Act' })).toBeInTheDocument()
    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('desc')).toBeInTheDocument()
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WorkflowProcessState } from '../WorkflowProcessState'

describe('WorkflowProcessState', () => {
  it('renders the message text', () => {
    render(<WorkflowProcessState state="neutral" message="Processing…" />)
    expect(screen.getByText('Processing…')).toBeInTheDocument()
  })

  it('renders an SVG icon', () => {
    const { container } = render(<WorkflowProcessState state="success" message="Done" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it.each(['neutral', 'success', 'problem', 'error'] as const)(
    'renders %s state without crashing',
    (state) => {
      expect(() =>
        render(<WorkflowProcessState state={state} message="msg" />)
      ).not.toThrow()
    }
  )

  it('renders neutral state with gray background', () => {
    const { container } = render(<WorkflowProcessState state="neutral" message="msg" />)
    expect(container.firstChild).toHaveStyle({ backgroundColor: 'rgba(95,105,105,0.1)' })
  })

  it('renders success state with green background', () => {
    const { container } = render(<WorkflowProcessState state="success" message="msg" />)
    expect(container.firstChild).toHaveStyle({ backgroundColor: 'rgba(40,168,104,0.07)' })
  })

  it('renders problem state with orange background', () => {
    const { container } = render(<WorkflowProcessState state="problem" message="msg" />)
    expect(container.firstChild).toHaveStyle({ backgroundColor: 'rgba(255,112,32,0.07)' })
  })

  it('renders error state with red background', () => {
    const { container } = render(<WorkflowProcessState state="error" message="msg" />)
    expect(container.firstChild).toHaveStyle({ backgroundColor: 'rgba(205,61,97,0.07)' })
  })

  it('accepts custom className', () => {
    const { container } = render(
      <WorkflowProcessState state="neutral" message="msg" className="my-state" />
    )
    expect(container.firstChild).toHaveClass('my-state')
  })
})

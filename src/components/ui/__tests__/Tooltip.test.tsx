import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip } from '../Tooltip'

describe('Tooltip', () => {
  it('renders children', () => {
    render(<Tooltip content="Hint"><span>Trigger</span></Tooltip>)
    expect(screen.getByText('Trigger')).toBeInTheDocument()
  })

  it('does not show tooltip by default', () => {
    render(<Tooltip content="Hint"><span>Trigger</span></Tooltip>)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows tooltip on mouse enter', async () => {
    const user = userEvent.setup()
    render(<Tooltip content="Hint text"><span>Trigger</span></Tooltip>)
    await user.hover(screen.getByText('Trigger'))
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(screen.getByRole('tooltip')).toHaveTextContent('Hint text')
  })

  it('hides tooltip on mouse leave', async () => {
    const user = userEvent.setup()
    render(<Tooltip content="Hint text"><span>Trigger</span></Tooltip>)
    await user.hover(screen.getByText('Trigger'))
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    await user.unhover(screen.getByText('Trigger'))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('renders tooltip with dark background', async () => {
    const user = userEvent.setup()
    render(<Tooltip content="Info"><span>T</span></Tooltip>)
    await user.hover(screen.getByText('T'))
    expect(screen.getByRole('tooltip')).toHaveStyle({ backgroundColor: '#101212' })
  })

  it('renders tooltip with white text', async () => {
    const user = userEvent.setup()
    render(<Tooltip content="Info"><span>T</span></Tooltip>)
    await user.hover(screen.getByText('T'))
    expect(screen.getByRole('tooltip')).toHaveStyle({ color: '#ffffff' })
  })

  it.each(['top', 'bottom', 'left', 'right'] as const)(
    'renders with side=%s without error',
    async (side) => {
      const user = userEvent.setup()
      render(<Tooltip content="Tip" side={side}><span>Trigger</span></Tooltip>)
      await user.hover(screen.getByText('Trigger'))
      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    }
  )
})

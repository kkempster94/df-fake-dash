import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { Toast } from '../Toast'

vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-dom')>()
  return { ...actual, createPortal: (node: React.ReactNode) => node }
})

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders message when visible', () => {
    render(<Toast message="Rescan done." visible onDismiss={() => {}} />)
    expect(screen.getByText('Rescan done.')).toBeInTheDocument()
  })

  it('renders nothing when not visible', () => {
    render(<Toast message="Rescan done." visible={false} onDismiss={() => {}} />)
    expect(screen.queryByText('Rescan done.')).not.toBeInTheDocument()
  })

  it('has role="status" and aria-live="polite"', () => {
    render(<Toast message="Done." visible onDismiss={() => {}} />)
    const el = screen.getByRole('status')
    expect(el).toHaveAttribute('aria-live', 'polite')
  })

  it('calls onDismiss when dismiss button is clicked', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(<Toast message="Done." visible onDismiss={onDismiss} />)
    await user.click(screen.getByRole('button', { name: /dismiss/i }))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('calls onDismiss automatically after 4 seconds', () => {
    const onDismiss = vi.fn()
    render(<Toast message="Done." visible onDismiss={onDismiss} />)
    expect(onDismiss).not.toHaveBeenCalled()
    act(() => { vi.advanceTimersByTime(4000) })
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('does not auto-dismiss when not visible', () => {
    const onDismiss = vi.fn()
    render(<Toast message="Done." visible={false} onDismiss={onDismiss} />)
    act(() => { vi.advanceTimersByTime(4000) })
    expect(onDismiss).not.toHaveBeenCalled()
  })

  it('clears the timer when unmounted', () => {
    const onDismiss = vi.fn()
    const { unmount } = render(<Toast message="Done." visible onDismiss={onDismiss} />)
    unmount()
    act(() => { vi.advanceTimersByTime(4000) })
    expect(onDismiss).not.toHaveBeenCalled()
  })
})

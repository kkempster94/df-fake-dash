import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { CopyButton } from '../CopyButton'

// Set up clipboard mock once before all tests
Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: vi.fn().mockResolvedValue(undefined) },
  writable: true,
  configurable: true,
})

const writeText = navigator.clipboard.writeText as ReturnType<typeof vi.fn>

/**
 * Drain microtask queue (resolved Promises) without using timers.
 * Works correctly even when vi.useFakeTimers() is active.
 */
const drainMicrotasks = () => act(async () => {
  await Promise.resolve()
  await Promise.resolve()
  await Promise.resolve()
})

beforeEach(() => {
  writeText.mockResolvedValue(undefined)
  vi.useFakeTimers()
})

afterEach(() => {
  writeText.mockClear()
  vi.useRealTimers()
})

describe('CopyButton', () => {
  it('renders with default "Copy" label', () => {
    render(<CopyButton value="https://example.com" />)
    expect(screen.getByText('Copy')).toBeInTheDocument()
  })

  it('renders custom label', () => {
    render(<CopyButton value="test" label="Duplicate" />)
    expect(screen.getByText('Duplicate')).toBeInTheDocument()
  })

  it('calls clipboard.writeText with the provided value on click', async () => {
    render(<CopyButton value="https://api.example.com" />)
    fireEvent.click(screen.getByRole('button'))
    await drainMicrotasks()
    expect(writeText).toHaveBeenCalledWith('https://api.example.com')
  })

  it('shows copiedLabel after clicking', async () => {
    render(<CopyButton value="test" copiedLabel="Done!" />)
    fireEvent.click(screen.getByRole('button'))
    await drainMicrotasks()
    expect(screen.getByText('Done!')).toBeInTheDocument()
  })

  it('reverts to original label after 2000ms', async () => {
    render(<CopyButton value="test" />)
    fireEvent.click(screen.getByRole('button'))
    await drainMicrotasks()
    expect(screen.getByText('Copied!')).toBeInTheDocument()
    act(() => { vi.advanceTimersByTime(2000) })
    expect(screen.getByText('Copy')).toBeInTheDocument()
  })

  it('has accessible aria-label reflecting current state', async () => {
    render(<CopyButton value="test" />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Copy')
    fireEvent.click(screen.getByRole('button'))
    await drainMicrotasks()
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Copied!')
  })
})

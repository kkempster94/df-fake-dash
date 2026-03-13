import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from '../Select'

const OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

describe('Select', () => {
  it('renders a trigger button', () => {
    render(<Select options={OPTIONS} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows placeholder when no value selected', () => {
    render(<Select options={OPTIONS} placeholder="Pick one" />)
    expect(screen.getByText('Pick one')).toBeInTheDocument()
  })

  it('shows selected label when value is set', () => {
    render(<Select options={OPTIONS} value="b" onChange={() => {}} />)
    expect(screen.getByText('Option B')).toBeInTheDocument()
  })

  it('opens menu on click', async () => {
    const user = userEvent.setup()
    render(<Select options={OPTIONS} />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('shows all options when open', async () => {
    const user = userEvent.setup()
    render(<Select options={OPTIONS} />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
    expect(screen.getByText('Option C')).toBeInTheDocument()
  })

  it('calls onChange when option is clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Select options={OPTIONS} onChange={onChange} />)
    await user.click(screen.getByRole('button'))
    await user.click(screen.getByText('Option A'))
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('closes menu after selecting an option', async () => {
    const user = userEvent.setup()
    render(<Select options={OPTIONS} onChange={() => {}} />)
    await user.click(screen.getByRole('button'))
    await user.click(screen.getByText('Option A'))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('closes menu on Escape key', async () => {
    const user = userEvent.setup()
    render(<Select options={OPTIONS} />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('shows checkmark for selected option', async () => {
    const user = userEvent.setup()
    render(<Select options={OPTIONS} value="b" onChange={() => {}} />)
    await user.click(screen.getByRole('button'))
    const selectedOption = screen.getAllByRole('option').find(o => o.getAttribute('aria-selected') === 'true')
    expect(selectedOption).toBeInTheDocument()
    expect(selectedOption?.querySelector('svg')).toBeInTheDocument()
  })

  it('is disabled when disabled=true', () => {
    render(<Select options={OPTIONS} disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not open when disabled', async () => {
    const user = userEvent.setup()
    render(<Select options={OPTIONS} disabled />)
    await user.click(screen.getByRole('button'))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('applies error border when error=true', () => {
    render(<Select options={OPTIONS} error />)
    expect(screen.getByRole('button')).toHaveClass('border-[#cd3d61]')
  })

  it('closes menu on outside mousedown', async () => {
    const user = userEvent.setup()
    render(<Select options={OPTIONS} />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    fireEvent.mouseDown(document.body)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})

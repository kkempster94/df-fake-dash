import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioButton, RadioGroup } from '../RadioGroup'

describe('RadioButton', () => {
  it('renders a radio input', () => {
    render(<RadioButton checked={false} onChange={() => {}} />)
    expect(screen.getByRole('radio')).toBeInTheDocument()
  })

  it('is checked when checked=true', () => {
    render(<RadioButton checked={true} onChange={() => {}} />)
    expect(screen.getByRole('radio')).toBeChecked()
  })

  it('is not checked when checked=false', () => {
    render(<RadioButton checked={false} onChange={() => {}} />)
    expect(screen.getByRole('radio')).not.toBeChecked()
  })

  it('shows inner dot when checked', () => {
    const { container } = render(<RadioButton checked={true} onChange={() => {}} />)
    // The filled dot span should exist
    const dots = container.querySelectorAll('span.rounded-full')
    expect(dots.length).toBeGreaterThan(0)
  })

  it('calls onChange on click', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<RadioButton checked={false} onChange={onChange} />)
    await user.click(screen.getByRole('radio'))
    expect(onChange).toHaveBeenCalled()
  })

  it('is disabled when disabled=true', () => {
    render(<RadioButton checked={false} onChange={() => {}} disabled />)
    expect(screen.getByRole('radio')).toBeDisabled()
  })
})

describe('RadioGroup', () => {
  const options = [
    { value: 'x', label: 'X option' },
    { value: 'y', label: 'Y option' },
    { value: 'z', label: 'Z option' },
  ]

  it('renders all options', () => {
    render(<RadioGroup options={options} value="x" onChange={() => {}} />)
    expect(screen.getByLabelText('X option')).toBeInTheDocument()
    expect(screen.getByLabelText('Y option')).toBeInTheDocument()
    expect(screen.getByLabelText('Z option')).toBeInTheDocument()
  })

  it('marks the correct option as checked', () => {
    render(<RadioGroup options={options} value="y" onChange={() => {}} />)
    expect(screen.getByLabelText('Y option')).toBeChecked()
    expect(screen.getByLabelText('X option')).not.toBeChecked()
  })

  it('calls onChange with correct value when option is clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<RadioGroup options={options} value="x" onChange={onChange} />)
    await user.click(screen.getByLabelText('Z option'))
    expect(onChange).toHaveBeenCalledWith('z')
  })

  it('renders with radiogroup role', () => {
    render(<RadioGroup options={options} value="x" onChange={() => {}} />)
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
  })

  it('disables all options when disabled=true', () => {
    render(<RadioGroup options={options} value="x" onChange={() => {}} disabled />)
    const radios = screen.getAllByRole('radio')
    radios.forEach(r => expect(r).toBeDisabled())
  })

  it('disables individual option when option.disabled=true', () => {
    const opts = [{ value: 'a', label: 'A' }, { value: 'b', label: 'B', disabled: true }]
    render(<RadioGroup options={opts} value="a" onChange={() => {}} />)
    expect(screen.getByLabelText('B')).toBeDisabled()
    expect(screen.getByLabelText('A')).not.toBeDisabled()
  })
})

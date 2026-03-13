import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../Input'

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders placeholder', () => {
    render(<Input placeholder="Enter value" />)
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument()
  })

  it('renders with value', () => {
    render(<Input value="hello" onChange={() => {}} />)
    expect(screen.getByDisplayValue('hello')).toBeInTheDocument()
  })

  it('applies error border class when error=true', () => {
    render(<Input error />)
    expect(screen.getByRole('textbox')).toHaveClass('border-[#cd3d61]')
  })

  it('does not apply error class when error=false', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).not.toHaveClass('border-[#cd3d61]')
  })

  it('renders as disabled', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('applies opacity class when disabled', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toHaveClass('opacity-50')
  })

  it('calls onChange when typing', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Input onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), 'a')
    expect(onChange).toHaveBeenCalled()
  })

  it('accepts custom className', () => {
    render(<Input className="my-class" />)
    expect(screen.getByRole('textbox')).toHaveClass('my-class')
  })

  it('forwards name and id props', () => {
    render(<Input name="myinput" id="myid" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('name', 'myinput')
    expect(input).toHaveAttribute('id', 'myid')
  })
})

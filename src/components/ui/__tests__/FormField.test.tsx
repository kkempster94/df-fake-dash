import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FormField } from '../FormField'
import { Input } from '../Input'

describe('FormField', () => {
  it('renders children', () => {
    render(<FormField><Input placeholder="test" /></FormField>)
    expect(screen.getByPlaceholderText('test')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<FormField label="My Label"><Input /></FormField>)
    expect(screen.getByText('My Label')).toBeInTheDocument()
  })

  it('does not render label when not provided', () => {
    render(<FormField><Input /></FormField>)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('renders message when provided', () => {
    render(<FormField message="Required field"><Input /></FormField>)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('does not render message when not provided', () => {
    render(<FormField><Input /></FormField>)
    // No inline message text should appear
    expect(screen.queryByText('Required field')).not.toBeInTheDocument()
  })

  it('renders label with uppercase class for CSS styling', () => {
    render(<FormField label="email"><Input /></FormField>)
    const label = screen.getByText('email')
    expect(label).toBeInTheDocument()
    expect(label).toHaveClass('uppercase')
  })

  it('applies messageType to InlineMessage', () => {
    const { container } = render(
      <FormField message="All good" messageType="good"><Input /></FormField>
    )
    // InlineMessage with good type gets #28a868 color
    const msgContainer = container.querySelector('.flex.items-center.gap-1')
    expect(msgContainer).toHaveStyle({ color: '#28a868' })
  })

  it('defaults messageType to bad', () => {
    const { container } = render(
      <FormField message="Error here"><Input /></FormField>
    )
    const msgContainer = container.querySelector('.flex.items-center.gap-1')
    expect(msgContainer).toHaveStyle({ color: '#cd3d61' })
  })

  it('accepts custom className', () => {
    const { container } = render(<FormField className="my-class"><Input /></FormField>)
    expect(container.firstChild).toHaveClass('my-class')
  })
})

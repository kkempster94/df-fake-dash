import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from '../Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card><p>Hello Card</p></Card>)
    expect(screen.getByText('Hello Card')).toBeInTheDocument()
  })

  it('has white background class', () => {
    const { container } = render(<Card>content</Card>)
    expect(container.firstChild).toHaveClass('bg-white')
  })

  it('has rounded corner class', () => {
    const { container } = render(<Card>content</Card>)
    expect(container.firstChild).toHaveClass('rounded-[4px]')
  })

  it('accepts and applies extra className', () => {
    const { container } = render(<Card className="p-4">content</Card>)
    expect(container.firstChild).toHaveClass('p-4')
  })
})

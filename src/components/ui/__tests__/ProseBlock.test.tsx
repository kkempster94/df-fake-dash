import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProseBlock } from '../ProseBlock'

describe('ProseBlock', () => {
  it('renders the title', () => {
    render(<ProseBlock title="My Title" body="Some body text" />)
    expect(screen.getByText('My Title')).toBeInTheDocument()
  })

  it('renders the body', () => {
    render(<ProseBlock title="Title" body="Body content here" />)
    expect(screen.getByText('Body content here')).toBeInTheDocument()
  })

  it('title has correct font size (14px)', () => {
    render(<ProseBlock title="Title" body="Body" />)
    const title = screen.getByText('Title')
    expect(title).toHaveStyle({ fontSize: '14px' })
  })

  it('body has muted color (#798585)', () => {
    render(<ProseBlock title="Title" body="Body" />)
    const body = screen.getByText('Body')
    expect(body).toHaveStyle({ color: '#798585' })
  })

  it('title has semibold font weight (600)', () => {
    render(<ProseBlock title="Title" body="Body" />)
    const title = screen.getByText('Title')
    expect(title).toHaveClass('font-semibold')
  })
})

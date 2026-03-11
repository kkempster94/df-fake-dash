import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '../Modal'

// Render portals inline in tests
vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-dom')>()
  return { ...actual, createPortal: (node: React.ReactNode) => node }
})

describe('Modal', () => {
  it('renders nothing when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={() => {}} title="Settings"><p>body</p></Modal>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders when isOpen is true', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Settings"><p>body</p></Modal>)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Trust domain settings"><p>x</p></Modal>)
    expect(screen.getByText('Trust domain settings')).toBeInTheDocument()
  })

  it('renders children in the body', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="T"><p>modal body content</p></Modal>)
    expect(screen.getByText('modal body content')).toBeInTheDocument()
  })

  it('has aria-modal="true"', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="T"><p>x</p></Modal>)
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('has aria-labelledby pointing to the title element id', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="My Modal"><p>x</p></Modal>)
    const dialog = screen.getByRole('dialog')
    const labelId = dialog.getAttribute('aria-labelledby')
    expect(document.getElementById(labelId!)).toHaveTextContent('My Modal')
  })

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<Modal isOpen={true} onClose={onClose} title="T"><p>x</p></Modal>)
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when the backdrop is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<Modal isOpen={true} onClose={onClose} title="T"><p>x</p></Modal>)
    await user.click(screen.getByTestId('modal-backdrop'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not close when the dialog content itself is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<Modal isOpen={true} onClose={onClose} title="T"><p>inner</p></Modal>)
    await user.click(screen.getByRole('dialog'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('calls onClose when Escape key is pressed', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<Modal isOpen={true} onClose={onClose} title="T"><p>x</p></Modal>)
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not fire keydown handler when closed', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<Modal isOpen={false} onClose={onClose} title="T"><p>x</p></Modal>)
    await user.keyboard('{Escape}')
    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders footer content when provided', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="T"
        footer={<button>Save</button>}
      >
        <p>x</p>
      </Modal>
    )
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('does not render footer section when footer is absent', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="T"><p>x</p></Modal>)
    expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument()
  })

  it('applies the width prop to the dialog', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="T" width={600}><p>x</p></Modal>)
    expect(screen.getByRole('dialog')).toHaveStyle({ width: '600px' })
  })
})

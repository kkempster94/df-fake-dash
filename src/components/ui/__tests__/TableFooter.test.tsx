import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TableFooter } from '../TableFooter'

describe('TableFooter', () => {
  it('renders page range text', () => {
    render(<TableFooter page={1} pageSize={10} total={100} onPageChange={() => {}} />)
    expect(screen.getByText(/1\s*–\s*10/)).toBeInTheDocument()
  })

  it('renders total count', () => {
    render(<TableFooter page={1} pageSize={10} total={100} onPageChange={() => {}} />)
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('renders current page and total pages', () => {
    render(<TableFooter page={2} pageSize={10} total={100} onPageChange={() => {}} />)
    expect(screen.getByText(/2 of 10/)).toBeInTheDocument()
  })

  it('calculates correct range for page 2', () => {
    render(<TableFooter page={2} pageSize={10} total={100} onPageChange={() => {}} />)
    expect(screen.getByText(/11\s*–\s*20/)).toBeInTheDocument()
  })

  it('renders previous page button', () => {
    render(<TableFooter page={2} pageSize={10} total={100} onPageChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeInTheDocument()
  })

  it('renders next page button', () => {
    render(<TableFooter page={1} pageSize={10} total={100} onPageChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Next page' })).toBeInTheDocument()
  })

  it('previous button is disabled on first page', () => {
    render(<TableFooter page={1} pageSize={10} total={100} onPageChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
  })

  it('next button is disabled on last page', () => {
    render(<TableFooter page={10} pageSize={10} total={100} onPageChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
  })

  it('calls onPageChange with page+1 when next is clicked', async () => {
    const onPageChange = vi.fn()
    const user = userEvent.setup()
    render(<TableFooter page={1} pageSize={10} total={100} onPageChange={onPageChange} />)
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange with page-1 when prev is clicked', async () => {
    const onPageChange = vi.fn()
    const user = userEvent.setup()
    render(<TableFooter page={3} pageSize={10} total={100} onPageChange={onPageChange} />)
    await user.click(screen.getByRole('button', { name: 'Previous page' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('renders page size when onPageSizeChange provided', () => {
    render(
      <TableFooter
        page={1} pageSize={25} total={100}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    )
    expect(screen.getByRole('button', { name: 'Change page size' })).toBeInTheDocument()
  })

  it('opens page size dropdown when size button clicked', async () => {
    const user = userEvent.setup()
    render(
      <TableFooter
        page={1} pageSize={10} total={100}
        pageSizeOptions={[10, 25, 50]}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    )
    await user.click(screen.getByRole('button', { name: 'Change page size' }))
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
  })

  it('calls onPageSizeChange when size option selected', async () => {
    const onPageSizeChange = vi.fn()
    const user = userEvent.setup()
    render(
      <TableFooter
        page={1} pageSize={10} total={100}
        pageSizeOptions={[10, 25, 50]}
        onPageChange={() => {}}
        onPageSizeChange={onPageSizeChange}
      />
    )
    await user.click(screen.getByRole('button', { name: 'Change page size' }))
    // Click the "25" option inside the dropdown
    const options = screen.getAllByText('25')
    await user.click(options[options.length - 1])
    expect(onPageSizeChange).toHaveBeenCalledWith(25)
  })

  it('clamps end to total on last page', () => {
    render(<TableFooter page={3} pageSize={10} total={25} onPageChange={() => {}} />)
    expect(screen.getByText(/21\s*–\s*25/)).toBeInTheDocument()
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Table, TableHeader, TableHeadCell, TableRow, TableCell } from '../Table'

describe('Table', () => {
  it('renders children', () => {
    render(<Table><p>table content</p></Table>)
    expect(screen.getByText('table content')).toBeInTheDocument()
  })

  it('has white background', () => {
    const { container } = render(<Table>child</Table>)
    expect(container.firstChild).toHaveClass('bg-white')
  })

  it('accepts extra className', () => {
    const { container } = render(<Table className="my-table">child</Table>)
    expect(container.firstChild).toHaveClass('my-table')
  })
})

describe('TableHeader', () => {
  it('renders children', () => {
    render(
      <TableHeader>
        <TableHeadCell>NAME</TableHeadCell>
      </TableHeader>
    )
    expect(screen.getByText('NAME')).toBeInTheDocument()
  })

  it('has header background color', () => {
    const { getByRole } = render(
      <TableHeader>
        <TableHeadCell>COL</TableHeadCell>
      </TableHeader>
    )
    expect(getByRole('row')).toHaveStyle({ backgroundColor: '#edf2f7' })
  })

  it('has role="row"', () => {
    render(<TableHeader><TableHeadCell>X</TableHeadCell></TableHeader>)
    expect(screen.getByRole('row')).toBeInTheDocument()
  })
})

describe('TableHeadCell', () => {
  it('renders the column label as uppercase', () => {
    render(<TableHeader><TableHeadCell>status</TableHeadCell></TableHeader>)
    const span = screen.getByText('status')
    expect(span).toHaveClass('uppercase')
  })

  it('renders nothing when children is undefined', () => {
    const { container } = render(
      <TableHeader>
        <TableHeadCell width={90} />
      </TableHeader>
    )
    // The cell div exists but has no text content
    expect(container.querySelector('[role="columnheader"]')).toBeInTheDocument()
    expect(container.querySelector('[role="columnheader"]')?.textContent).toBe('')
  })

  it('is flex-none with explicit width', () => {
    render(
      <TableHeader>
        <TableHeadCell width={170}>TYPE</TableHeadCell>
      </TableHeader>
    )
    const cell = screen.getByRole('columnheader')
    expect(cell).toHaveClass('flex-none')
    expect(cell).toHaveStyle({ width: '170px' })
  })

  it('is flex-1 when no width provided', () => {
    render(
      <TableHeader>
        <TableHeadCell>NAME</TableHeadCell>
      </TableHeader>
    )
    expect(screen.getByRole('columnheader')).toHaveClass('flex-1')
  })

  it('applies default pl-2 padding', () => {
    render(
      <TableHeader>
        <TableHeadCell>COL</TableHeadCell>
      </TableHeader>
    )
    expect(screen.getByRole('columnheader')).toHaveClass('pl-2')
  })

  it('accepts a custom className for padding override', () => {
    render(
      <TableHeader>
        <TableHeadCell className="pl-4">COL</TableHeadCell>
      </TableHeader>
    )
    expect(screen.getByRole('columnheader')).toHaveClass('pl-4')
  })
})

describe('TableRow', () => {
  it('renders children', () => {
    render(
      <TableRow>
        <TableCell>row content</TableCell>
      </TableRow>
    )
    expect(screen.getByText('row content')).toBeInTheDocument()
  })

  it('has border-bottom style', () => {
    const { getAllByRole } = render(
      <TableRow>
        <TableCell>cell</TableCell>
      </TableRow>
    )
    const row = getAllByRole('row')[0]
    expect(row).toHaveStyle({ borderBottom: '1px solid #e9ebed' })
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <TableRow onClick={onClick}>
        <TableCell>click me</TableCell>
      </TableRow>
    )
    await user.click(screen.getByRole('row'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('applies cursor-pointer when onClick is provided', () => {
    render(
      <TableRow onClick={() => {}}>
        <TableCell>cell</TableCell>
      </TableRow>
    )
    expect(screen.getByRole('row')).toHaveClass('cursor-pointer')
  })

  it('does not apply cursor-pointer when onClick is not provided', () => {
    render(
      <TableRow>
        <TableCell>cell</TableCell>
      </TableRow>
    )
    expect(screen.getByRole('row')).not.toHaveClass('cursor-pointer')
  })
})

describe('TableCell', () => {
  it('renders children', () => {
    render(
      <TableRow>
        <TableCell>cell value</TableCell>
      </TableRow>
    )
    expect(screen.getByText('cell value')).toBeInTheDocument()
  })

  it('is flex-none with explicit width', () => {
    render(
      <TableRow>
        <TableCell width={120}>content</TableCell>
      </TableRow>
    )
    expect(screen.getByRole('cell')).toHaveClass('flex-none')
    expect(screen.getByRole('cell')).toHaveStyle({ width: '120px' })
  })

  it('is flex-1 when no width provided', () => {
    render(
      <TableRow>
        <TableCell>content</TableCell>
      </TableRow>
    )
    expect(screen.getByRole('cell')).toHaveClass('flex-1')
  })

  it('applies default pl-2 padding', () => {
    render(
      <TableRow>
        <TableCell>content</TableCell>
      </TableRow>
    )
    expect(screen.getByRole('cell')).toHaveClass('pl-2')
  })

  it('accepts a custom className for padding override', () => {
    render(
      <TableRow>
        <TableCell className="pl-0">content</TableCell>
      </TableRow>
    )
    expect(screen.getByRole('cell')).toHaveClass('pl-0')
  })

  it('renders without children without crashing', () => {
    expect(() =>
      render(<TableRow><TableCell /></TableRow>)
    ).not.toThrow()
  })
})

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

  it('renders bold cellType with font-semibold', () => {
    render(<TableRow><TableCell cellType="bold">Bold value</TableCell></TableRow>)
    const span = screen.getByText('Bold value')
    expect(span).toHaveClass('font-semibold')
  })

  it('renders link cellType as an anchor element', () => {
    render(<TableRow><TableCell cellType="link" href="/test">Link text</TableCell></TableRow>)
    const link = screen.getByRole('link', { name: 'Link text' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('renders link cellType with fallback href # when no href provided', () => {
    render(<TableRow><TableCell cellType="link">Fallback link</TableCell></TableRow>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '#')
  })

  it('renders code cellType with font-mono', () => {
    render(<TableRow><TableCell cellType="code">spiffe://example</TableCell></TableRow>)
    expect(screen.getByText('spiffe://example')).toHaveClass('font-mono')
  })

  it('renders healthDot cellType centered', () => {
    render(<TableRow><TableCell cellType="healthDot"><span>dot</span></TableCell></TableRow>)
    expect(screen.getByRole('cell')).toHaveClass('items-center')
  })
})

describe('TableHeadCell sort', () => {
  it('renders as a columnheader when onSort is provided', () => {
    render(
      <TableHeader>
        <TableHeadCell onSort={() => {}}>Name</TableHeadCell>
      </TableHeader>
    )
    expect(screen.getByRole('columnheader')).toBeInTheDocument()
  })

  it('calls onSort when sort columnheader is clicked', async () => {
    const onSort = vi.fn()
    const user = userEvent.setup()
    render(
      <TableHeader>
        <TableHeadCell onSort={onSort} sortDirection="none">Name</TableHeadCell>
      </TableHeader>
    )
    await user.click(screen.getByRole('columnheader'))
    expect(onSort).toHaveBeenCalledTimes(1)
  })

  it('has aria-sort="ascending" when sortDirection="up"', () => {
    render(
      <TableHeader>
        <TableHeadCell onSort={() => {}} sortDirection="up">Name</TableHeadCell>
      </TableHeader>
    )
    expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', 'ascending')
  })

  it('has aria-sort="descending" when sortDirection="down"', () => {
    render(
      <TableHeader>
        <TableHeadCell onSort={() => {}} sortDirection="down">Name</TableHeadCell>
      </TableHeader>
    )
    expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', 'descending')
  })

  it('has aria-sort="none" when sortDirection="none"', () => {
    render(
      <TableHeader>
        <TableHeadCell onSort={() => {}} sortDirection="none">Name</TableHeadCell>
      </TableHeader>
    )
    expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', 'none')
  })

  it('renders teal sort icon for "up" direction', () => {
    const { container } = render(
      <TableHeader>
        <TableHeadCell onSort={() => {}} sortDirection="up">Name</TableHeadCell>
      </TableHeader>
    )
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
  })

  it('renders sort icon for "down" direction', () => {
    const { container } = render(
      <TableHeader>
        <TableHeadCell onSort={() => {}} sortDirection="down">Name</TableHeadCell>
      </TableHeader>
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders muted sort icon for "none" direction', () => {
    const { container } = render(
      <TableHeader>
        <TableHeadCell onSort={() => {}} sortDirection="none">Name</TableHeadCell>
      </TableHeader>
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderHook, act } from '@testing-library/react'
import { Table, TableHeader, TableHeadCell, TableRow, TableCell, useColumnWidths } from '../Table'

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

describe('TableHeadCell resize', () => {
  it('renders a resize handle when onResize is provided', () => {
    const { container } = render(
      <TableHeader>
        <TableHeadCell onResize={() => {}}>NAME</TableHeadCell>
      </TableHeader>
    )
    expect(container.querySelector('[data-resize-handle="true"]')).toBeInTheDocument()
  })

  it('does not render a resize handle when onResize is not provided', () => {
    const { container } = render(
      <TableHeader>
        <TableHeadCell>NAME</TableHeadCell>
      </TableHeader>
    )
    expect(container.querySelector('[data-resize-handle="true"]')).not.toBeInTheDocument()
  })

  it('sets position:relative on the cell when onResize is provided', () => {
    render(
      <TableHeader>
        <TableHeadCell width={150} onResize={() => {}}>NAME</TableHeadCell>
      </TableHeader>
    )
    expect(screen.getByRole('columnheader')).toHaveStyle({ position: 'relative' })
  })

  it('calls onResize with the pixel delta when dragged', () => {
    const onResize = vi.fn()
    const { container } = render(
      <TableHeader>
        <TableHeadCell onResize={onResize}>NAME</TableHeadCell>
      </TableHeader>
    )
    const handle = container.querySelector('[data-resize-handle="true"]')!

    fireEvent.mouseDown(handle, { clientX: 100 })
    fireEvent.mouseMove(document, { clientX: 130 })
    fireEvent.mouseUp(document)

    expect(onResize).toHaveBeenCalledWith(30)
  })

  it('accumulates multiple move events during a single drag', () => {
    const onResize = vi.fn()
    const { container } = render(
      <TableHeader>
        <TableHeadCell onResize={onResize}>NAME</TableHeadCell>
      </TableHeader>
    )
    const handle = container.querySelector('[data-resize-handle="true"]')!

    fireEvent.mouseDown(handle, { clientX: 100 })
    fireEvent.mouseMove(document, { clientX: 120 })
    fireEvent.mouseMove(document, { clientX: 135 })
    fireEvent.mouseUp(document)

    expect(onResize).toHaveBeenCalledTimes(2)
    expect(onResize).toHaveBeenNthCalledWith(1, 20)
    expect(onResize).toHaveBeenNthCalledWith(2, 15)
  })

  it('does not trigger onSort when resize handle is clicked', async () => {
    const onSort = vi.fn()
    const onResize = vi.fn()
    const user = userEvent.setup()
    const { container } = render(
      <TableHeader>
        <TableHeadCell onSort={onSort} sortDirection="none" onResize={onResize}>NAME</TableHeadCell>
      </TableHeader>
    )
    const handle = container.querySelector('[data-resize-handle="true"]')!
    await user.click(handle)
    expect(onSort).not.toHaveBeenCalled()
  })

  it('stops firing after mouseUp', () => {
    const onResize = vi.fn()
    const { container } = render(
      <TableHeader>
        <TableHeadCell onResize={onResize}>NAME</TableHeadCell>
      </TableHeader>
    )
    const handle = container.querySelector('[data-resize-handle="true"]')!

    fireEvent.mouseDown(handle, { clientX: 100 })
    fireEvent.mouseMove(document, { clientX: 120 })
    fireEvent.mouseUp(document)
    fireEvent.mouseMove(document, { clientX: 150 })

    expect(onResize).toHaveBeenCalledTimes(1)
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

describe('ResizeHandle + useColumnWidths integration', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  function ResizableTable() {
    const { widths, setWidth } = useColumnWidths('test-resize', { col: 200 })
    return (
      <TableHeader>
        <TableHeadCell
          width={widths.col}
          onResize={d => setWidth('col', Math.max(60, widths.col + d))}
        >
          COL
        </TableHeadCell>
      </TableHeader>
    )
  }

  it('applies each successive delta to the latest width', () => {
    const { container } = render(<ResizableTable />)
    const handle = container.querySelector('[data-resize-handle="true"]')!

    fireEvent.mouseDown(handle, { clientX: 100 })
    fireEvent.mouseMove(document, { clientX: 120 }) // +20 → 220
    fireEvent.mouseMove(document, { clientX: 140 }) // +20 → 240
    fireEvent.mouseUp(document)

    expect(screen.getByRole('columnheader')).toHaveStyle({ width: '240px' })
  })

  it('persists the final width to localStorage after a multi-step drag', () => {
    const { container } = render(<ResizableTable />)
    const handle = container.querySelector('[data-resize-handle="true"]')!

    fireEvent.mouseDown(handle, { clientX: 0 })
    fireEvent.mouseMove(document, { clientX: 50 })  // +50 → 250
    fireEvent.mouseMove(document, { clientX: 100 }) // +50 → 300
    fireEvent.mouseUp(document)

    expect(JSON.parse(localStorage.getItem('test-resize')!).col).toBe(300)
  })
})

describe('useColumnWidths', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns defaults when localStorage is empty', () => {
    const { result } = renderHook(() =>
      useColumnWidths('test-table', { name: 200, status: 100 })
    )
    expect(result.current.widths).toEqual({ name: 200, status: 100 })
  })

  it('merges stored values over defaults', () => {
    localStorage.setItem('test-table', JSON.stringify({ name: 300 }))
    const { result } = renderHook(() =>
      useColumnWidths('test-table', { name: 200, status: 100 })
    )
    expect(result.current.widths.name).toBe(300)
    expect(result.current.widths.status).toBe(100)
  })

  it('setWidth updates the width and persists to localStorage', () => {
    const { result } = renderHook(() =>
      useColumnWidths('test-table', { name: 200, status: 100 })
    )
    act(() => {
      result.current.setWidth('name', 350)
    })
    expect(result.current.widths.name).toBe(350)
    expect(JSON.parse(localStorage.getItem('test-table')!).name).toBe(350)
  })

  it('setWidth does not affect other columns', () => {
    const { result } = renderHook(() =>
      useColumnWidths('test-table', { name: 200, status: 100 })
    )
    act(() => {
      result.current.setWidth('name', 350)
    })
    expect(result.current.widths.status).toBe(100)
  })

  it('falls back to defaults when localStorage contains invalid JSON', () => {
    localStorage.setItem('test-table', 'not-json')
    const { result } = renderHook(() =>
      useColumnWidths('test-table', { name: 200, status: 100 })
    )
    expect(result.current.widths).toEqual({ name: 200, status: 100 })
  })

  it('uses a separate key per storageKey', () => {
    const { result: a } = renderHook(() =>
      useColumnWidths('table-a', { col: 100 })
    )
    const { result: b } = renderHook(() =>
      useColumnWidths('table-b', { col: 200 })
    )
    act(() => { a.current.setWidth('col', 150) })
    expect(a.current.widths.col).toBe(150)
    expect(b.current.widths.col).toBe(200)
  })
})

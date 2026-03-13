import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TableFooter } from '@/components/ui/TableFooter'

const meta = {
  component: TableFooter,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TableFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    page: 1,
    pageSize: 10,
    total: 142,
    onPageChange: () => {},
  },
}

export const MidPage: Story = {
  args: {
    page: 3,
    pageSize: 10,
    total: 142,
    onPageChange: () => {},
  },
}

export const LastPage: Story = {
  args: {
    page: 15,
    pageSize: 10,
    total: 142,
    onPageChange: () => {},
  },
}

export const SmallDataset: Story = {
  args: {
    page: 1,
    pageSize: 25,
    total: 8,
    onPageChange: () => {},
  },
}

export const WithPageSizeChange: Story = {
  args: {
    page: 1,
    pageSize: 10,
    total: 142,
    pageSizeOptions: [10, 25, 50],
    onPageChange: () => {},
    onPageSizeChange: () => {},
  },
}

export const Interactive: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = useState(1)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [pageSize, setPageSize] = useState(10)
    return (
      <TableFooter
        page={page}
        pageSize={pageSize}
        total={142}
        pageSizeOptions={[10, 25, 50]}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    )
  },
}

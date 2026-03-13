import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

const meta = {
  component: Modal,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Edit trust domain settings',
    children: (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-600">
          Configure how SPIRE manages certificates and key rotation for this trust domain.
        </p>
        <p className="text-sm text-gray-400 italic">Form fields would appear here.</p>
      </div>
    ),
    footer: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save changes</Button>
      </>
    ),
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: 'This should not be visible',
    children: 'Hidden content',
  },
}

export const WideModal: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Workload identity details',
    width: 640,
    children: (
      <p className="text-sm text-gray-600">
        Wide modal content — use for forms with multiple columns or complex data.
      </p>
    ),
  },
}

export const Interactive: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button variant="primary" onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Edit settings"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Save</Button>
            </>
          }
        >
          <p className="text-sm text-gray-600">Click outside or press Escape to close.</p>
        </Modal>
      </div>
    )
  },
}

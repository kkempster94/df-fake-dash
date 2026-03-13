import type { Meta, StoryObj } from '@storybook/react'
import { DialogHeader, DialogFooter } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'

const meta = {
  component: DialogHeader,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DialogHeader>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderSimple: Story = {
  name: 'DialogHeader · Simple',
  args: {
    title: 'Edit trust domain settings',
  },
}

export const HeaderWithDescription: Story = {
  name: 'DialogHeader · With description',
  args: {
    title: 'Edit trust domain settings',
    description: 'Configure how SPIRE manages certificates and key rotation for this trust domain.',
  },
}

export const HeaderWithClose: Story = {
  name: 'DialogHeader · With close button',
  args: {
    title: 'Edit trust domain settings',
    description: 'Configure certificate settings.',
    onClose: () => {},
  },
}

export const FullDialog: StoryObj = {
  name: 'Full dialog layout',
  render: () => (
    <div className="bg-white rounded-lg shadow-xl w-[480px] border border-[#e9ebed]">
      <DialogHeader
        title="Edit trust domain settings"
        description="Changes take effect on the next agent refresh cycle."
        onClose={() => {}}
      />
      <div className="px-8 py-6">
        <p className="text-sm text-gray-500">Form content goes here.</p>
      </div>
      <DialogFooter>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save changes</Button>
      </DialogFooter>
    </div>
  ),
}

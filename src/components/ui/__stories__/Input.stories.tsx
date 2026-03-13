import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/components/ui/Input'

const meta = {
  component: Input,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'e.g. production.example.com' },
}

export const WithValue: Story = {
  args: { value: 'production.newco.com', readOnly: true },
}

export const Error: Story = {
  args: { value: '0', error: true },
}

export const Disabled: Story = {
  args: { value: 'production.newco.com', disabled: true },
}

export const Password: Story = {
  args: { type: 'password', placeholder: 'Enter token…' },
}

export const Monospace: Story = {
  args: {
    value: 'spiffe://production.newco.com/api/auth',
    className: 'font-mono',
    readOnly: true,
  },
}

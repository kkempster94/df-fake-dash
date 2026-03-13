import type { Meta, StoryObj } from '@storybook/react'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

const meta = {
  component: FormField,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

const KEY_TYPE_OPTIONS = [
  { value: 'EC_P256', label: 'EC P-256' },
  { value: 'EC_P384', label: 'EC P-384' },
  { value: 'RSA_2048', label: 'RSA 2048' },
]

export const WithInput: Story = {
  args: {
    label: 'Trust domain name',
    children: <Input placeholder="e.g. production.example.com" />,
  },
}

export const WithMessage: Story = {
  args: {
    label: 'Trust domain name',
    message: 'The trust domain name cannot be changed after creation.',
    messageType: 'neutral',
    children: <Input value="production.example.com" readOnly disabled />,
  },
}

export const WithError: Story = {
  args: {
    label: 'TTL (seconds)',
    message: 'TTL must be between 60 and 86400.',
    messageType: 'bad',
    children: <Input value="0" error />,
  },
}

export const WithSelect: Story = {
  args: {
    label: 'Key type',
    children: <Select options={KEY_TYPE_OPTIONS} value="EC_P256" />,
  },
}

export const NoLabel: Story = {
  args: {
    children: <Input placeholder="Search identities…" />,
  },
}

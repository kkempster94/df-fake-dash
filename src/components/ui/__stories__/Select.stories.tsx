import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Select } from '@/components/ui/Select'

const meta = {
  component: Select,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const KEY_TYPE_OPTIONS = [
  { value: 'EC_P256', label: 'EC P-256' },
  { value: 'EC_P384', label: 'EC P-384' },
  { value: 'RSA_2048', label: 'RSA 2048' },
  { value: 'RSA_4096', label: 'RSA 4096' },
]

export const Default: Story = {
  args: { options: KEY_TYPE_OPTIONS },
}

export const WithValue: Story = {
  args: { options: KEY_TYPE_OPTIONS, value: 'EC_P256' },
}

export const Placeholder: Story = {
  args: { options: KEY_TYPE_OPTIONS, placeholder: 'Choose a key type…' },
}

export const Error: Story = {
  args: { options: KEY_TYPE_OPTIONS, error: true },
}

export const Disabled: Story = {
  args: { options: KEY_TYPE_OPTIONS, value: 'EC_P256', disabled: true },
}

export const Interactive: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<string | undefined>(undefined)
    return (
      <Select
        options={KEY_TYPE_OPTIONS}
        value={value}
        onChange={setValue}
        placeholder="Select key type…"
      />
    )
  },
}

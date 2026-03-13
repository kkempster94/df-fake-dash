import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RadioGroup, RadioButton } from '@/components/ui/RadioGroup'

const meta = {
  component: RadioGroup,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

const OPTIONS = [
  { value: 'EC_P256', label: 'EC P-256 (recommended)' },
  { value: 'EC_P384', label: 'EC P-384' },
  { value: 'RSA_2048', label: 'RSA 2048' },
  { value: 'RSA_4096', label: 'RSA 4096' },
]

export const Default: Story = {
  args: {
    options: OPTIONS,
    value: 'EC_P256',
    name: 'key-type',
    onChange: () => {},
  },
}

export const Disabled: Story = {
  args: {
    options: OPTIONS,
    value: 'EC_P256',
    name: 'key-type',
    disabled: true,
    onChange: () => {},
  },
}

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'EC_P256', label: 'EC P-256' },
      { value: 'EC_P384', label: 'EC P-384' },
      { value: 'RSA_2048', label: 'RSA 2048 (deprecated)', disabled: true },
    ],
    value: 'EC_P256',
    name: 'key-type',
    onChange: () => {},
  },
}

export const Interactive: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('EC_P256')
    return (
      <div>
        <p className="text-xs text-gray-500 mb-3 uppercase tracking-widest font-medium">Key type</p>
        <RadioGroup options={OPTIONS} value={value} onChange={setValue} name="key-type-interactive" />
        <p className="text-xs text-gray-400 mt-3">Selected: <strong>{value}</strong></p>
      </div>
    )
  },
}

export const SingleButton: StoryObj = {
  name: 'RadioButton · standalone',
  render: () => (
    <div className="flex gap-4 items-center">
      <RadioButton checked={false} onChange={() => {}} />
      <RadioButton checked={true} onChange={() => {}} />
      <RadioButton checked={false} onChange={() => {}} disabled />
    </div>
  ),
}

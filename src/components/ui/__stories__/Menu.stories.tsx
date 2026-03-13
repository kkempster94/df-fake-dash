import type { Meta, StoryObj } from '@storybook/react'
import { Menu, MenuItem } from '@/components/ui/Menu'

const meta = {
  component: Menu,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Menu>

export default meta

export const Default: StoryObj = {
  render: () => (
    <Menu>
      <MenuItem>View details</MenuItem>
      <MenuItem>Edit settings</MenuItem>
      <MenuItem>Download certificate</MenuItem>
      <MenuItem>Revoke identity</MenuItem>
    </Menu>
  ),
}

export const WithChecked: StoryObj = {
  render: () => (
    <Menu>
      <MenuItem checked>production.newco.com</MenuItem>
      <MenuItem>staging.newco.com</MenuItem>
      <MenuItem>dev.newco.com</MenuItem>
    </Menu>
  ),
}

export const WithHealthDots: StoryObj = {
  render: () => (
    <Menu>
      <MenuItem healthDot="good">production.newco.com</MenuItem>
      <MenuItem healthDot="degraded">staging.newco.com</MenuItem>
      <MenuItem healthDot="bad">dev.newco.com</MenuItem>
    </Menu>
  ),
}

export const WithDisabled: StoryObj = {
  render: () => (
    <Menu>
      <MenuItem>Edit settings</MenuItem>
      <MenuItem disabled>Delete domain (requires admin)</MenuItem>
      <MenuItem>Download certificate</MenuItem>
    </Menu>
  ),
}

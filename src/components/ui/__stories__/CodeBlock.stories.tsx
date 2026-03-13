import type { Meta, StoryObj } from '@storybook/react'
import { CodeBlock } from '@/components/ui/CodeBlock'

const meta = {
  component: CodeBlock,
  parameters: { layout: 'padded', backgrounds: { default: 'light' } },
} satisfies Meta<typeof CodeBlock>

export default meta
type Story = StoryObj<typeof meta>

export const SpireCommand: Story = {
  args: {
    language: 'bash',
    code: 'spire-server entry create \\\n  -spiffeID spiffe://production.newco.com/api/auth \\\n  -parentID spiffe://production.newco.com/spire/agent \\\n  -selector unix:user:api',
  },
}

export const YamlConfig: Story = {
  args: {
    language: 'yaml',
    code: `server:
  bind_address: "0.0.0.0"
  bind_port: "8081"
  trust_domain: "production.newco.com"
  data_dir: "/opt/spire/data/server"
  log_level: "INFO"`,
  },
}

export const Short: Story = {
  args: {
    code: 'spire-server healthcheck',
  },
}

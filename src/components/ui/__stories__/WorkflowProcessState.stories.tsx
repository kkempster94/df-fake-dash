import type { Meta, StoryObj } from '@storybook/react'
import { WorkflowProcessState } from '@/components/ui/WorkflowProcessState'

const meta = {
  component: WorkflowProcessState,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof WorkflowProcessState>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {
  args: { state: 'neutral', message: 'Fetching workload identities…' },
}

export const Success: Story = {
  args: { state: 'success', message: 'Workload identity successfully deployed.' },
}

export const Problem: Story = {
  args: { state: 'problem', message: 'Certificate rotation is taking longer than expected.' },
}

export const Error: Story = {
  args: { state: 'error', message: 'Failed to deploy workload identity. Check SPIRE agent logs.' },
}

export const AllStates: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-3">
      <WorkflowProcessState state="neutral" message="Awaiting agent check-in…" />
      <WorkflowProcessState state="success" message="Certificate rotation complete." />
      <WorkflowProcessState state="problem" message="Agent latency is elevated." />
      <WorkflowProcessState state="error" message="Unable to reach SPIRE server." />
    </div>
  ),
}

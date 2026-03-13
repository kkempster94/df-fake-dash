import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { WizardNav } from '@/components/ui/WizardNav'
import type { WizardStep } from '@/components/ui/WizardNav'

const meta = {
  component: WizardNav,
  parameters: { layout: 'padded', backgrounds: { default: 'light' } },
} satisfies Meta<typeof WizardNav>

export default meta
type Story = StoryObj<typeof meta>

const STEPS: WizardStep[] = [
  {
    id: 'identity',
    title: 'Define workload identity',
    subSteps: [
      { id: 'spiffe-id', label: 'Set SPIFFE ID', completed: true },
      { id: 'selectors', label: 'Configure selectors', completed: true },
    ],
  },
  {
    id: 'certificate',
    title: 'Configure certificate',
    subSteps: [
      { id: 'key-type', label: 'Choose key type', completed: false },
      { id: 'ttl', label: 'Set TTL', completed: false },
    ],
  },
  {
    id: 'review',
    title: 'Review & deploy',
    subSteps: [
      { id: 'summary', label: 'Verify settings', completed: false },
      { id: 'deploy', label: 'Deploy to agents', completed: false },
    ],
  },
]

export const FirstStep: Story = {
  args: { steps: STEPS, activeStepId: 'identity', onStepClick: () => {} },
}

export const SecondStep: Story = {
  args: { steps: STEPS, activeStepId: 'certificate', onStepClick: () => {} },
}

export const LastStep: Story = {
  args: { steps: STEPS, activeStepId: 'review', onStepClick: () => {} },
}

export const Interactive: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeId, setActiveId] = useState('identity')
    return <WizardNav steps={STEPS} activeStepId={activeId} onStepClick={setActiveId} />
  },
}

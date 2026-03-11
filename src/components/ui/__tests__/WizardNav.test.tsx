import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WizardNav } from '../WizardNav'
import type { WizardStep } from '../WizardNav'

const steps: WizardStep[] = [
  {
    id: 'step-1',
    title: 'Step 1: Plan',
    subSteps: [
      { id: 'ss-1-1', label: 'Assign app owner', completed: true },
      { id: 'ss-1-2', label: 'Assign security owner', completed: false },
    ],
  },
  {
    id: 'step-2',
    title: 'Step 2: Deploy',
    subSteps: [
      { id: 'ss-2-1', label: 'Configure environment', completed: false },
    ],
  },
]

describe('WizardNav', () => {
  it('renders all step titles', () => {
    render(<WizardNav steps={steps} activeStepId="step-1" />)
    expect(screen.getByText('Step 1: Plan')).toBeInTheDocument()
    expect(screen.getByText('Step 2: Deploy')).toBeInTheDocument()
  })

  it('renders sub-step labels for a given step', () => {
    render(<WizardNav steps={steps} activeStepId="step-1" />)
    expect(screen.getByText('Assign app owner')).toBeInTheDocument()
    expect(screen.getByText('Assign security owner')).toBeInTheDocument()
  })

  it('active step has teal right border color (#3e7c79)', () => {
    render(<WizardNav steps={steps} activeStepId="step-1" />)
    // The active step button has teal borderRightColor
    const buttons = screen.getAllByRole('button')
    const activeBtn = buttons.find((b) => b.textContent?.includes('Step 1: Plan'))
    expect(activeBtn).toHaveStyle({ borderRightColor: '#3e7c79' })
  })

  it('inactive step does NOT have teal right border', () => {
    render(<WizardNav steps={steps} activeStepId="step-1" />)
    const buttons = screen.getAllByRole('button')
    const inactiveBtn = buttons.find((b) => b.textContent?.includes('Step 2: Deploy')) as HTMLElement
    expect(inactiveBtn?.style.borderRightColor).toBe('transparent')
  })

  it('active step title has primary color (#101212)', () => {
    render(<WizardNav steps={steps} activeStepId="step-1" />)
    const title = screen.getByText('Step 1: Plan')
    expect(title).toHaveStyle({ color: '#101212' })
  })

  it('inactive step title has tertiary color (#9fa8a7)', () => {
    render(<WizardNav steps={steps} activeStepId="step-1" />)
    const title = screen.getByText('Step 2: Deploy')
    expect(title).toHaveStyle({ color: '#9fa8a7' })
  })

  it('calls onStepClick with the step id when a step is clicked', async () => {
    const onStepClick = vi.fn()
    const user = userEvent.setup()
    render(<WizardNav steps={steps} activeStepId="step-1" onStepClick={onStepClick} />)
    const buttons = screen.getAllByRole('button')
    const step2Btn = buttons.find((b) => b.textContent?.includes('Step 2: Deploy'))!
    await user.click(step2Btn)
    expect(onStepClick).toHaveBeenCalledWith('step-2')
  })

  it('renders without onStepClick without throwing', () => {
    expect(() =>
      render(<WizardNav steps={steps} activeStepId="step-1" />)
    ).not.toThrow()
  })

  it('sub-steps with completed=true have teal border on their icon', () => {
    const { container } = render(<WizardNav steps={steps} activeStepId="step-1" />)
    const icons = container.querySelectorAll('span.rounded-full')
    // First sub-step is completed=true
    expect(icons[0]).toHaveStyle({ borderColor: '#3e7c79' })
  })

  it('sub-steps with completed=false have non-teal border on their icon', () => {
    const { container } = render(<WizardNav steps={steps} activeStepId="step-1" />)
    const icons = container.querySelectorAll('span.rounded-full')
    // Second sub-step is completed=false
    expect(icons[1]).toHaveStyle({ borderColor: '#dde0e0' })
  })

  it('renders a nav element', () => {
    const { container } = render(<WizardNav steps={steps} activeStepId="step-1" />)
    expect(container.querySelector('nav')).toBeInTheDocument()
  })
})

import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface WizardSubStep {
  id: string
  label: string
  completed?: boolean
}

export interface WizardStep {
  id: string
  title: string
  subSteps?: WizardSubStep[]
}

interface WizardNavProps {
  steps: WizardStep[]
  activeStepId: string
  onStepClick?: (id: string) => void
  disabledStepIds?: string[]
}

function SubStepIcon({ completed }: { completed?: boolean }) {
  if (completed) {
    return (
      <span
        className="shrink-0 rounded-full inline-flex items-center justify-center"
        style={{
          width: 14,
          height: 14,
          backgroundColor: '#9fa8a7',
          marginTop: 1,
        }}
      >
        <Check size={9} strokeWidth={3} color="#ffffff" />
      </span>
    )
  }
  return (
    <span
      className="shrink-0 rounded-full border"
      style={{
        display: 'inline-block',
        width: 14,
        height: 14,
        borderColor: '#dde0e0',
        backgroundColor: 'transparent',
        marginTop: 1,
      }}
    />
  )
}

export function WizardNav({ steps, activeStepId, onStepClick, disabledStepIds = [] }: WizardNavProps) {
  return (
    <nav className="flex flex-col gap-8 w-60 shrink-0 border-r pr-0" style={{ borderColor: '#dde0e0' }}>
      {steps.map((step) => {
        const isActive = step.id === activeStepId
        const isDisabled = disabledStepIds.includes(step.id)
        return (
          <button
            key={step.id}
            onClick={() => onStepClick?.(step.id)}
            disabled={isDisabled}
            className={cn(
              'flex flex-col gap-2 text-left border-r-4 border-solid w-full bg-transparent border-none p-0 pr-6',
              isDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
            )}
            style={{
              borderRightColor: isActive ? '#3e7c79' : 'transparent',
            }}
          >
            <p
              className="font-semibold w-full"
              style={{
                fontSize: 14,
                color: isActive ? '#101212' : '#9fa8a7',
                letterSpacing: '0.28px',
                lineHeight: 1.5,
              }}
            >
              {step.title}
            </p>
            {step.subSteps && (
              <div className="flex flex-col gap-2 w-full">
                {step.subSteps.map((sub) => (
                  <div key={sub.id} className="flex items-start gap-3">
                    <span className="flex items-center py-[1px]">
                      <SubStepIcon completed={sub.completed} />
                    </span>
                    <p
                      className="font-normal flex-1 text-left"
                      style={{
                        fontSize: 13,
                        color: isActive ? '#101212' : '#798585',
                        letterSpacing: '0.26px',
                        lineHeight: 1.5,
                      }}
                    >
                      {sub.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </button>
        )
      })}
    </nav>
  )
}

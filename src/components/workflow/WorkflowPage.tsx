import { useState, useEffect } from 'react'
import { Radar, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { InfoGrid } from '@/components/ui/InfoGrid'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProseBlock } from '@/components/ui/ProseBlock'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { WizardNav } from '@/components/ui/WizardNav'
import { Tabs } from '@/components/ui/Tabs'
import { MonoText } from '@/components/ui/MonoText'
import { Alert } from '@/components/ui/Alert'
import { QueryError } from '@/components/ui/QueryError'
import { Toast } from '@/components/ui/Toast'
import { ActionGroup } from '@/components/ui/ActionGroup'
import type { RemediationStatus } from '@/components/ui/Badge'
import { RemediationWorkflowBadge, RiskScoreBadge } from '@/components/ui/Badge'
import { workflowMeta, workflowSteps, workflowStepContent } from '@/data/mockData'
import { idToPath } from '@/lib/routes'
import { useWorkflowMetaQuery, useTriggerRescan } from '@/lib/queries'

// ── URL step param helpers ─────────────────────────────────────────────────────

function getStepFromUrl(): string {
  const id = new URLSearchParams(window.location.search).get('step')
  return workflowSteps.some(s => s.id === id) ? id! : workflowSteps[0].id
}

function setStepInUrl(id: string) {
  const url = new URL(window.location.href)
  url.searchParams.set('step', id)
  window.history.replaceState(null, '', url.toString())
}

// ── Component ─────────────────────────────────────────────────────────────────

export function WorkflowPage() {
  const [activeStepId, setActiveStepIdState] = useState(getStepFromUrl)
  const [toastVisible, setToastVisible] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [activeTabId, setActiveTabId] = useState<Record<string, string>>({
    'step-2': 'azure-cli',
    'step-3': 'env',
    'step-4': 'aws-cli',
  })

  const { data: meta, isError: metaError, refetch: refetchMeta } = useWorkflowMetaQuery()
  const rescan = useTriggerRescan({ onSuccess: () => setToastVisible(true) })

  const isInProgress = meta?.status === 'In Progress'

  useEffect(() => {
    if (!completed) return
    if (countdown <= 0) {
      window.history.pushState(null, '', idToPath('overview'))
      window.dispatchEvent(new PopStateEvent('popstate'))
      return
    }
    const id = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(id)
  }, [completed, countdown])

  function setActiveStepId(id: string) {
    setActiveStepIdState(id)
    setStepInUrl(id)
  }

  const content = workflowStepContent[activeStepId]
  const stepIndex = workflowSteps.findIndex((s) => s.id === activeStepId)

  // Step 3 is locked until the rescan has run and status flipped to In Progress
  const step3Locked = !isInProgress

  // Mark all sub-steps of completed steps as checked
  const stepsWithProgress = workflowSteps.map((step, i) => ({
    ...step,
    subSteps: step.subSteps?.map((sub) => ({ ...sub, completed: i < stepIndex })),
  }))

  function handleStepClick(id: string) {
    if ((id === 'step-3' || id === 'step-4') && step3Locked) return
    setActiveStepId(id)
  }

  function handleTabChange(sectionIndex: number, tabId: string) {
    setActiveTabId((prev) => ({ ...prev, [`${activeStepId}-${sectionIndex}`]: tabId }))
  }

  function getActiveTab(sectionIndex: number, tabs: Array<{ id: string }>) {
    const key = `${activeStepId}-${sectionIndex}`
    return activeTabId[key] ?? activeTabId[activeStepId] ?? tabs[0]?.id
  }

  const status = (meta?.status ?? workflowMeta.status) as RemediationStatus

  const infoItems = [
    { label: 'Workflow ID',         value: <MonoText>{workflowMeta.id}</MonoText> },
    { label: 'Risk Score',          value: <RiskScoreBadge level={workflowMeta.riskLevel} score={workflowMeta.riskScore} /> },
    { label: 'Remediation Type',    value: workflowMeta.remediationType },
    { label: 'Provider Type',       value: workflowMeta.providerType },
    { label: 'Status',              value: <RemediationWorkflowBadge status={status} /> },
    { label: 'Application',         value: <Button variant="link" onClick={() => {}}>{workflowMeta.application}</Button> },
    { label: 'Security Owner',      value: workflowMeta.securityOwner },
    { label: 'Application Owner',   value: workflowMeta.applicationOwner },
    { label: 'Deployment',          value: workflowMeta.deployment },
    { label: 'Original Credential', value: <MonoText>{workflowMeta.originalCredential}</MonoText> },
    { label: 'Created',             value: workflowMeta.created },
    { label: 'Last Updated',        value: workflowMeta.lastUpdated },
  ]

  const isLastStep = stepIndex === workflowSteps.length - 1
  const nextDisabled =
    stepIndex >= workflowSteps.length - 1 ||
    (activeStepId === 'step-2' && step3Locked)

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-5">
        <CheckCircle2 size={48} style={{ color: '#28a868' }} />
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#101212', margin: 0 }}>
          Migration workflow completed!
        </h2>
        <p style={{ fontSize: 14, color: '#798585', margin: 0 }}>
          Returning to Trust domain page in {countdown} second{countdown !== 1 ? 's' : ''}…
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full h-full">
      <Toast
        message="Rescan completed successfully."
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />
      <PageHeader
        title={`Workflow: ${workflowMeta.id}`}
        description={
          <>
            Remediation instructions for fixing a detected risk.{' '}
            <a href="https://d.spirl.com/concepts/intro" style={{ color: '#798585', textDecoration: 'underline' }}>Learn more.</a>
          </>
        }
        action={
          <Button
            variant="primary"
            Icon={Radar}
            onClick={() => rescan.mutate()}
            disabled={rescan.isPending || isInProgress}
          >
            {rescan.isPending ? 'Scanning…' : 'Trigger manual rescan'}
          </Button>
        }
      >
        <InfoGrid items={infoItems} />
      </PageHeader>

      <Tabs
        items={[
          { id: 'work-steps',    label: 'Work steps',    count: workflowSteps.length },
          { id: 'audit-history', label: 'Audit history' },
        ]}
        activeId="work-steps"
        onChange={() => {}}
        className="mb-6"
      />

      <div className="flex gap-12 flex-1 min-h-0">
        <WizardNav
          steps={stepsWithProgress}
          activeStepId={activeStepId}
          onStepClick={handleStepClick}
          disabledStepIds={step3Locked ? ['step-3', 'step-4'] : []}
        />

        <div className="flex flex-col gap-6 flex-1 min-w-0 overflow-y-auto pb-8">

          {metaError && (
            <QueryError message="Failed to load workflow status." onRetry={() => void refetchMeta()} />
          )}

          {activeStepId === 'step-2' && step3Locked && (
            <Alert severity="neutral" title="Manual rescan required">
              Complete the steps below, then click <strong>Trigger manual rescan</strong> above. You will not be able to proceed to Step 3 until the scan returns <strong>In Progress</strong>.
            </Alert>
          )}

          {content && (
            <>
              <ProseBlock title={content.objective.title} body={content.objective.body} />

              {content.sections.map((section, si) => (
                <div key={si} className="flex flex-col gap-4">
                  <ProseBlock title={section.title} body={section.body} />

                  {section.tabs.length > 0 && (
                    <div className="flex flex-col gap-4">
                      <Tabs
                        items={section.tabs.map((t) => ({ id: t.id, label: t.label }))}
                        activeId={getActiveTab(si, section.tabs)}
                        onChange={(id) => handleTabChange(si, id)}
                      />
                      {(() => {
                        const tab = section.tabs.find((t) => t.id === getActiveTab(si, section.tabs))
                        return tab ? <CodeBlock code={tab.code} /> : null
                      })()}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          <div className="flex items-center justify-between pt-4 mt-auto border-t border-[#dde0e0]">
            <ActionGroup
              actions={[{
                label: 'Previous step',
                variant: 'secondary',
                onClick: () => { if (stepIndex > 0) setActiveStepId(workflowSteps[stepIndex - 1].id) },
                disabled: stepIndex <= 0,
              }]}
            />
            <ActionGroup
              actions={[{
                label: isLastStep ? 'Complete workflow' : 'Next step',
                variant: 'primary',
                onClick: () => {
                  if (isLastStep) setCompleted(true)
                  else if (!nextDisabled) setActiveStepId(workflowSteps[stepIndex + 1].id)
                },
                disabled: !isLastStep && nextDisabled,
              }]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

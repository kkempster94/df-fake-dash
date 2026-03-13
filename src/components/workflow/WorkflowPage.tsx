import { useState } from 'react'
import { Radar } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { InfoGrid } from '@/components/ui/InfoGrid'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProseBlock } from '@/components/ui/ProseBlock'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { WizardNav } from '@/components/ui/WizardNav'
import { Tabs } from '@/components/ui/Tabs'
import { MonoText } from '@/components/ui/MonoText'
import { Alert } from '@/components/ui/Alert'
import { ActionGroup } from '@/components/ui/ActionGroup'
import { RemediationWorkflowBadge, RiskScoreBadge } from '@/components/ui/Badge'
import { workflowMeta, workflowSteps, workflowStepContent } from '@/data/mockData'

export function WorkflowPage() {
  const [activeStepId, setActiveStepId] = useState('step-2')
  const [activeTabId, setActiveTabId]   = useState<Record<string, string>>({
    'step-2': 'azure-cli',
    'step-3': 'env',
    'step-4': 'aws-cli',
  })
  const [alertDismissed, setAlertDismissed] = useState(false)

  const content = workflowStepContent[activeStepId]

  function handleTabChange(sectionIndex: number, tabId: string) {
    setActiveTabId((prev) => ({ ...prev, [`${activeStepId}-${sectionIndex}`]: tabId }))
  }

  function getActiveTab(sectionIndex: number, tabs: Array<{ id: string }>) {
    const key = `${activeStepId}-${sectionIndex}`
    return activeTabId[key] ?? activeTabId[activeStepId] ?? tabs[0]?.id
  }

  const infoItems = [
    { label: 'Workflow ID',          value: <MonoText>{workflowMeta.id}</MonoText> },
    { label: 'Risk Score',           value: <RiskScoreBadge level={workflowMeta.riskLevel} /> },
    { label: 'Remediation Type',     value: workflowMeta.remediationType },
    { label: 'Provider Type',        value: workflowMeta.providerType },
    { label: 'Status',               value: <RemediationWorkflowBadge status={workflowMeta.status} /> },
    { label: 'Application',          value: (
        <Button variant="link" onClick={() => {}}>
          {workflowMeta.application}
        </Button>
      )
    },
    { label: 'Security Owner',       value: workflowMeta.securityOwner },
    { label: 'Application Owner',    value: workflowMeta.applicationOwner },
    { label: 'Deployment',           value: workflowMeta.deployment },
    { label: 'Original Credential',  value: <MonoText>{workflowMeta.originalCredential}</MonoText> },
    { label: 'Created',              value: workflowMeta.created },
    { label: 'Last Updated',         value: workflowMeta.lastUpdated },
  ]

  const stepIndex = workflowSteps.findIndex((s) => s.id === activeStepId)

  return (
    <div className="flex flex-col w-full h-full">
      <PageHeader
        title={`Workflow: ${workflowMeta.id}`}
        description={
          <>
            Remediation instructions for fixing a detected risk.{' '}
            <a href="https://d.spirl.com/concepts/intro" style={{ color: '#798585', textDecoration: 'underline' }}>Learn more.</a>
          </>
        }
        action={<Button variant="primary" Icon={Radar}>Trigger manual rescan</Button>}
      >
        <InfoGrid items={infoItems} />
      </PageHeader>

      {/* Tabs */}
      <Tabs
        items={[
          { id: 'work-steps',    label: 'Work steps',    count: workflowSteps.length },
          { id: 'audit-history', label: 'Audit history' },
        ]}
        activeId="work-steps"
        onChange={() => {}}
        className="mb-6"
      />

      {/* Main layout: wizard nav + content panel */}
      <div className="flex gap-12 flex-1 min-h-0">
        <WizardNav
          steps={workflowSteps}
          activeStepId={activeStepId}
          onStepClick={setActiveStepId}
        />

        {/* Assessment panel */}
        <div className="flex flex-col gap-6 flex-1 min-w-0 overflow-y-auto pb-8">
          {!alertDismissed && (
            <Alert
              severity="warning"
              title="Automated scan triggered"
              onDismiss={() => setAlertDismissed(true)}
            >
              This workflow was triggered by a scheduled scan. Review all steps carefully before proceeding.
            </Alert>
          )}

          {content && (
            <>
              <ProseBlock
                title={content.objective.title}
                body={content.objective.body}
              />

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
                        const activeTab = getActiveTab(si, section.tabs)
                        const tab = section.tabs.find((t) => t.id === activeTab)
                        return tab ? <CodeBlock code={tab.code} /> : null
                      })()}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* Footer nav */}
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
                label: 'Next step',
                variant: 'primary',
                onClick: () => { if (stepIndex < workflowSteps.length - 1) setActiveStepId(workflowSteps[stepIndex + 1].id) },
                disabled: stepIndex >= workflowSteps.length - 1,
              }]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

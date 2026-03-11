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
import { workflowMeta, workflowSteps, workflowStepContent } from '@/data/mockData'

// Status badge inline for now (Planning = blue tinted)
function WorkflowStatusBadge({ status }: { status: string }) {
  const isPlanng = status === 'Planning'
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap"
      style={{
        backgroundColor: isPlanng ? 'rgba(2,124,231,0.08)' : 'rgba(95,105,105,0.1)',
        color: isPlanng ? '#027ce7' : '#5f6969',
        fontSize: 10,
        letterSpacing: '0.2px',
        padding: '0 10px',
        height: 20,
      }}
    >
      {status}
    </span>
  )
}

export function WorkflowPage() {
  const [activeStepId, setActiveStepId] = useState('step-2')
  const [activeTabId, setActiveTabId] = useState<Record<string, string>>({
    'step-2': 'azure-cli',
    'step-3': 'env',
    'step-4': 'aws-cli',
  })

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
    { label: 'Risk Score',           value: (
        <span className="inline-flex items-center justify-center rounded-full font-semibold"
          style={{ backgroundColor: 'rgba(255,112,32,0.07)', color: '#ff7020', fontSize: 10, padding: '0 10px', height: 20 }}>
          {workflowMeta.riskScore}
        </span>
      )
    },
    { label: 'Remediation Type',     value: workflowMeta.remediationType },
    { label: 'Provider Type',        value: workflowMeta.providerType },
    { label: 'Status',               value: <WorkflowStatusBadge status={workflowMeta.status} /> },
    { label: 'Application',          value: (
        <a href="#" style={{ color: '#101212', fontSize: 13, textDecoration: 'underline' }}>
          {workflowMeta.application}
        </a>
      )
    },
    { label: 'Security Owner',       value: workflowMeta.securityOwner },
    { label: 'Application Owner',    value: workflowMeta.applicationOwner },
    { label: 'Deployment',           value: workflowMeta.deployment },
    { label: 'Original Credential',  value: <MonoText>{workflowMeta.originalCredential}</MonoText> },
    { label: 'Created',              value: workflowMeta.created },
    { label: 'Last Updated',         value: workflowMeta.lastUpdated },
  ]

  return (
    <div className="flex flex-col w-full h-full">
      <PageHeader
        title={`Workflow: ${workflowMeta.id}`}
        description={
          <>
            Remediation instructions for fixing a detected risk.{' '}
            <a href="#" style={{ color: '#798585', textDecoration: 'underline' }}>Learn more.</a>
          </>
        }
        action={<Button variant="primary" Icon={Radar}>Trigger manual rescan</Button>}
      >
        <InfoGrid items={infoItems} />
      </PageHeader>

      {/* Tabs */}
      <Tabs
        items={[{ id: 'work-steps', label: 'Work steps' }, { id: 'audit-history', label: 'Audit history' }]}
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
          {content && (
            <>
              {/* Objective */}
              <ProseBlock
                title={content.objective.title}
                body={content.objective.body}
              />

              {/* Sections */}
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
          <div
            className="flex items-center justify-between pt-4 mt-auto"
            style={{ borderTop: '1px solid #dde0e0' }}
          >
            <Button
              variant="secondary"
              onClick={() => {
                const idx = workflowSteps.findIndex((s) => s.id === activeStepId)
                if (idx > 0) setActiveStepId(workflowSteps[idx - 1].id)
              }}
            >
              Previous step
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                const idx = workflowSteps.findIndex((s) => s.id === activeStepId)
                if (idx < workflowSteps.length - 1) setActiveStepId(workflowSteps[idx + 1].id)
              }}
            >
              Next step
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

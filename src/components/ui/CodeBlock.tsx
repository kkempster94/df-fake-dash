import { CopyButton } from '@/components/ui/CopyButton'

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className="w-full rounded-lg p-6 overflow-x-auto"
        style={{ backgroundColor: '#101212' }}
      >
        <pre
          className="font-mono text-white m-0 whitespace-pre"
          style={{ fontSize: 12, letterSpacing: '0.24px', lineHeight: 1.5, fontFamily: '"PT Mono", monospace' }}
        >
          {code}
        </pre>
      </div>
      <div>
        <CopyButton value={code} label="Copy command" copiedLabel="Copied!" />
      </div>
    </div>
  )
}

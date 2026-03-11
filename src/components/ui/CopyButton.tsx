import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  value: string
  label?: string
  copiedLabel?: string
}

export function CopyButton({
  value,
  label = 'Copy',
  copiedLabel = 'Copied!',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    void navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : label}
      className="inline-flex items-center gap-[6px] font-semibold cursor-pointer border-none bg-transparent p-0 whitespace-nowrap"
      style={{ color: '#3e7c79', fontSize: 11, letterSpacing: '0.22px', minHeight: 24 }}
    >
      {copied ? (
        <Check size={13.25} strokeWidth={1.8} />
      ) : (
        <Copy size={13.25} strokeWidth={1.8} />
      )}
      {copied ? copiedLabel : label}
    </button>
  )
}

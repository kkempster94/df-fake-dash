import { Link } from 'lucide-react'
import { cn } from '@/lib/cn'

interface UrlTagProps {
  url: string
  label?: string
  onClick?: () => void
}

export function UrlTag({ url, label, onClick }: UrlTagProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded max-w-full overflow-hidden',
        onClick && 'cursor-pointer',
      )}
      style={{
        backgroundColor: 'rgba(2,124,231,0.07)',
        color: '#027ce7',
        fontFamily: '"PT Mono", monospace',
        fontSize: 11,
      }}
    >
      <Link size={10} style={{ flexShrink: 0 }} />
      <span className="truncate">{label ?? url}</span>
    </span>
  )
}

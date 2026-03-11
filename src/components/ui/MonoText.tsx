interface MonoTextProps {
  children: string
  muted?: boolean
  className?: string
}

export function MonoText({ children, muted = false, className }: MonoTextProps) {
  return (
    <span
      className={className}
      style={{
        fontFamily: '"PT Mono", monospace',
        fontSize: 12,
        letterSpacing: '0.24px',
        color: muted ? '#798585' : '#101212',
      }}
    >
      {children}
    </span>
  )
}

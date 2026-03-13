interface NavItemProps {
  label: string
  isActive: boolean
  onClick: () => void
  alertBadge?: boolean
}

export function NavItem({ label, isActive, onClick, alertBadge }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className="w-full text-left cursor-pointer border-none rounded transition-colors flex items-center gap-1.5"
      style={{
        backgroundColor: isActive ? 'rgba(255,255,255,0.7)' : 'transparent',
        color: '#101212',
        fontSize: 13,
        fontWeight: isActive ? 600 : 400,
        letterSpacing: '0.26px',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 2,
        paddingBottom: 2,
      }}
    >
      {label}
      {alertBadge && (
        <span
          className="inline-block rounded-full shrink-0"
          style={{ width: 6, height: 6, backgroundColor: '#cd3d61' }}
          aria-label="alert"
        />
      )}
    </button>
  )
}

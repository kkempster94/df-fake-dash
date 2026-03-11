interface NavItemProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export function NavItem({ label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className="w-full text-left cursor-pointer border-none rounded transition-colors"
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
    </button>
  )
}

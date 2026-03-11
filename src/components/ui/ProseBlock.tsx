interface ProseBlockProps {
  title: string
  body: string
}

export function ProseBlock({ title, body }: ProseBlockProps) {
  return (
    <div className="flex flex-col w-full">
      <p
        className="font-semibold"
        style={{ fontSize: 14, color: '#101212', letterSpacing: '0.28px', lineHeight: 1.5, marginBottom: 4 }}
      >
        {title}
      </p>
      <p
        className="font-normal"
        style={{ fontSize: 13, color: '#798585', letterSpacing: '0.26px', lineHeight: 1.5 }}
      >
        {body}
      </p>
    </div>
  )
}

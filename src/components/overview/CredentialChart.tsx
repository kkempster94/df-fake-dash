import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface LegendKeyProps { color: string; label: string }
function LegendKey({ color, label }: LegendKeyProps) {
  return (
    <span className="flex items-center gap-[6px]">
      <span className="shrink-0 rounded-[2px]" style={{ width: 10, height: 10, backgroundColor: color }} />
      <span className="font-semibold text-body-sm whitespace-nowrap" style={{ color: '#101212' }}>{label}</span>
    </span>
  )
}

interface CredentialChartProps {
  data: Array<{ x509: number; jwt: number }>
}

const X509_COLOR = 'rgba(2,174,231,0.5)'
const JWT_COLOR  = 'rgba(29,195,115,0.5)'

export function CredentialChart({ data }: CredentialChartProps) {
  const maxVal = Math.max(...data.map(d => d.x509))
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} barCategoryGap={2} barGap={2} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <XAxis dataKey="index" hide />
        <YAxis domain={[0, maxVal]} hide />
        <Tooltip
          cursor={{ fill: 'rgba(0,0,0,0.04)' }}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null
            return (
              <div className="bg-white border border-table-border rounded shadow-sm px-2 py-1 flex flex-col gap-1" style={{ fontSize: 11, color: '#101212' }}>
                {payload.map((p) => (
                  <div key={p.dataKey as string} className="flex items-center gap-2">
                    <span className="inline-block rounded-sm" style={{ width: 8, height: 8, backgroundColor: p.fill }} />
                    <span>{p.name}: {p.value}</span>
                  </div>
                ))}
              </div>
            )
          }}
        />
        <Bar dataKey="x509" name="X.509" fill={X509_COLOR} radius={[2, 2, 0, 0]} maxBarSize={14} />
        <Bar dataKey="jwt"  name="JWT"   fill={JWT_COLOR}  radius={[2, 2, 0, 0]} maxBarSize={14} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function CredentialChartLegend() {
  return (
    <div className="flex items-center gap-4">
      <LegendKey color={X509_COLOR} label="X.509" />
      <LegendKey color={JWT_COLOR}  label="JWT" />
    </div>
  )
}

import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface WorkloadChartProps {
  data: Array<{ index: number; value: number }>
  total: number
}

export function WorkloadChart({ data, total }: WorkloadChartProps) {
  const maxVal = Math.max(...data.map(d => d.value))
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} barCategoryGap={2} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <XAxis dataKey="index" hide />
        <YAxis domain={[0, maxVal]} hide />
        <Tooltip
          cursor={{ fill: 'rgba(0,0,0,0.04)' }}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null
            const pct = (payload[0].value as number) / maxVal
            return (
              <div className="bg-white border border-table-border rounded shadow-sm px-2 py-1" style={{ fontSize: 11, color: '#101212' }}>
                {Math.round(pct * total)} workloads
              </div>
            )
          }}
        />
        <Bar dataKey="value" fill="rgba(2,124,231,0.5)" radius={[2, 2, 0, 0]} maxBarSize={20} />
      </BarChart>
    </ResponsiveContainer>
  )
}

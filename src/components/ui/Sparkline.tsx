import { AreaChart, Area } from 'recharts'

type SparklineVariant = 'neutral' | 'good' | 'bad'

interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  variant?: SparklineVariant
  className?: string
}

const VARIANT_COLORS: Record<SparklineVariant, { stroke: string; fill: string }> = {
  neutral: { stroke: 'rgba(95,105,105,1)',   fill: 'rgba(95,105,105,0.3)'   },
  good:    { stroke: 'rgba(40,168,104,1)',   fill: 'rgba(40,168,104,0.3)'   },
  bad:     { stroke: 'rgba(205,61,97,1)',    fill: 'rgba(205,61,97,0.3)'    },
}

export function Sparkline({ data, width = 60, height = 15, variant = 'neutral', className }: SparklineProps) {
  const { stroke, fill } = VARIANT_COLORS[variant]
  const chartData = data.map((v) => ({ v }))

  return (
    <span className={className}>
      <AreaChart width={width} height={height} data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Area
          type="monotone"
          dataKey="v"
          stroke={stroke}
          fill={fill}
          strokeWidth={1}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </span>
  )
}

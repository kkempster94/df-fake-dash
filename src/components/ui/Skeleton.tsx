import { cn } from '@/lib/cn'

interface SkeletonProps {
  className?: string
  width?: number | string
  height?: number | string
}

export function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <span
      className={cn('animate-pulse rounded bg-gray-200 block', className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

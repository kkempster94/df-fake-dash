import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { trustDomainURLs } from '@/data/mockData'

function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    void navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-[6px] font-semibold cursor-pointer border-none bg-transparent p-0 whitespace-nowrap"
      style={{ color: '#3e7c79', fontSize: 11, letterSpacing: '0.22px', minHeight: 24 }}
    >
      {copied ? (
        <Check size={13.25} strokeWidth={1.8} />
      ) : (
        <Copy size={13.25} strokeWidth={1.8} />
      )}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

const HEADER_STYLE = {
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: '0.8px',
  color: '#101212',
} as const

export function TrustDomainURLs() {
  return (
    <section className="flex flex-col gap-3 w-full pb-4">
      <p className="font-semibold text-h3 whitespace-nowrap" style={{ color: '#101212' }}>
        Trust domain URLs
      </p>

      <div className="bg-white w-full">
        {/* Header row */}
        <div
          className="flex h-[34px] items-center rounded-[4px]"
          style={{ backgroundColor: '#edf2f7' }}
        >
          <div className="flex-none flex flex-col h-full justify-center" style={{ width: 170 }}>
            <div className="flex items-center pl-4 py-[6px]">
              <span className="uppercase" style={HEADER_STYLE}>URL TYPE</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col h-full justify-center min-w-0">
            <div className="flex items-center px-2">
              <span className="uppercase" style={HEADER_STYLE}>URL</span>
            </div>
          </div>
          <div className="flex-none" style={{ width: 90 }} />
        </div>

        {/* Data rows */}
        {trustDomainURLs.map((row) => (
          <div
            key={row.type}
            className="flex h-[34px] items-center"
            style={{ borderBottom: '1px solid #e9ebed' }}
          >
            <div className="flex-none flex flex-col h-full justify-center" style={{ width: 170 }}>
              <div className="pl-4 overflow-hidden">
                <span
                  className="font-semibold block truncate"
                  style={{ fontSize: 11, color: '#101212', letterSpacing: '0.22px' }}
                >
                  {row.type}
                </span>
              </div>
            </div>
            <div className="flex-1 flex flex-col h-full justify-center min-w-0">
              <div className="pl-2 overflow-hidden">
                <span
                  className="font-mono block truncate"
                  style={{ fontSize: 12, color: '#798585', letterSpacing: '0.24px' }}
                >
                  {row.url}
                </span>
              </div>
            </div>
            <div className="flex-none flex flex-col h-full justify-center pl-2" style={{ width: 90 }}>
              <CopyButton url={row.url} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'

interface FormRowProps {
  label: string
  hint?: string
  children: React.ReactNode
}

function FormRow({ label, hint, children }: FormRowProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-medium"
        style={{ fontSize: 12, color: '#101212', letterSpacing: '0.24px' }}
      >
        {label}
      </label>
      {children}
      {hint && (
        <p style={{ fontSize: 11, color: '#798585', letterSpacing: '0.22px' }}>{hint}</p>
      )}
    </div>
  )
}

const INPUT_STYLE = {
  width: '100%',
  border: '1px solid #e9ebed',
  borderRadius: 4,
  padding: '6px 10px',
  fontSize: 12,
  color: '#101212',
  letterSpacing: '0.24px',
  outline: 'none',
  fontFamily: 'inherit',
  backgroundColor: '#fff',
} as const

const SELECT_STYLE = {
  ...INPUT_STYLE,
  cursor: 'pointer',
} as const

interface TrustDomainSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TrustDomainSettingsModal({
  isOpen,
  onClose,
}: TrustDomainSettingsModalProps) {
  const [svidTtl, setSvidTtl] = useState('3600')
  const [jwtTtl, setJwtTtl] = useState('300')
  const [keyType, setKeyType] = useState('EC_P256')
  const [bundleRefresh, setBundleRefresh] = useState('300')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onClose()
    }, 800)
  }

  const footer = (
    <>
      <button
        onClick={onClose}
        className="cursor-pointer border rounded-md px-4 py-1.5 font-medium transition-colors"
        style={{ fontSize: 12, color: '#798585', borderColor: '#e9ebed', backgroundColor: '#fff' }}
      >
        Cancel
      </button>
      <button
        onClick={handleSave}
        className="cursor-pointer border-none rounded-md px-4 py-1.5 font-semibold transition-colors"
        style={{
          fontSize: 12,
          color: '#fff',
          backgroundColor: saved ? '#28a868' : '#3e7c79',
          letterSpacing: '0.24px',
        }}
      >
        {saved ? 'Saved!' : 'Save changes'}
      </button>
    </>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Trust domain settings"
      footer={footer}
      width={500}
    >
      <div className="flex flex-col gap-5">
        {/* Read-only trust domain name */}
        <FormRow label="Trust domain" hint="The trust domain name cannot be changed after creation.">
          <input
            readOnly
            value="production.example.com"
            style={{ ...INPUT_STYLE, backgroundColor: '#f5f7f7', color: '#798585', fontFamily: '"PT Mono", monospace' }}
          />
        </FormRow>

        <div className="flex gap-4">
          <div className="flex-1">
            <FormRow label="X.509 SVID TTL (seconds)" hint="Default credential lifetime.">
              <input
                type="number"
                min={60}
                max={86400}
                value={svidTtl}
                onChange={(e) => setSvidTtl(e.target.value)}
                style={INPUT_STYLE}
              />
            </FormRow>
          </div>
          <div className="flex-1">
            <FormRow label="JWT SVID TTL (seconds)" hint="Default JWT credential lifetime.">
              <input
                type="number"
                min={60}
                max={86400}
                value={jwtTtl}
                onChange={(e) => setJwtTtl(e.target.value)}
                style={INPUT_STYLE}
              />
            </FormRow>
          </div>
        </div>

        <FormRow label="CA key type" hint="Key algorithm used for signing SVIDs.">
          <select
            value={keyType}
            onChange={(e) => setKeyType(e.target.value)}
            style={SELECT_STYLE}
          >
            <option value="EC_P256">EC P-256</option>
            <option value="EC_P384">EC P-384</option>
            <option value="RSA_2048">RSA 2048</option>
            <option value="RSA_4096">RSA 4096</option>
          </select>
        </FormRow>

        <FormRow label="Bundle refresh interval (seconds)" hint="How often agents re-fetch the trust bundle.">
          <input
            type="number"
            min={30}
            value={bundleRefresh}
            onChange={(e) => setBundleRefresh(e.target.value)}
            style={INPUT_STYLE}
          />
        </FormRow>
      </div>
    </Modal>
  )
}

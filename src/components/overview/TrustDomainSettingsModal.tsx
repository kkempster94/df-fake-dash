import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

const KEY_TYPE_OPTIONS = [
  { value: 'EC_P256',  label: 'EC P-256'  },
  { value: 'EC_P384',  label: 'EC P-384'  },
  { value: 'RSA_2048', label: 'RSA 2048'  },
  { value: 'RSA_4096', label: 'RSA 4096'  },
]

interface TrustDomainSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TrustDomainSettingsModal({
  isOpen,
  onClose,
}: TrustDomainSettingsModalProps) {
  const [svidTtl, setSvidTtl]         = useState('3600')
  const [jwtTtl, setJwtTtl]           = useState('300')
  const [keyType, setKeyType]         = useState('EC_P256')
  const [bundleRefresh, setBundleRefresh] = useState('300')
  const [saved, setSaved]             = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onClose()
    }, 800)
  }

  const footer = (
    <>
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
      <Button variant="primary" onClick={handleSave}>
        {saved ? 'Saved!' : 'Save changes'}
      </Button>
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
        <FormField
          label="Trust domain"
          message="The trust domain name cannot be changed after creation."
          messageType="neutral"
        >
          <Input
            readOnly
            value="production.example.com"
            disabled
            className="font-mono"
          />
        </FormField>

        <div className="flex gap-4">
          <div className="flex-1">
            <FormField
              label="X.509 SVID TTL (seconds)"
              message="Default credential lifetime."
              messageType="neutral"
            >
              <Input
                type="number"
                value={svidTtl}
                onChange={(e) => setSvidTtl(e.target.value)}
              />
            </FormField>
          </div>
          <div className="flex-1">
            <FormField
              label="JWT SVID TTL (seconds)"
              message="Default JWT credential lifetime."
              messageType="neutral"
            >
              <Input
                type="number"
                value={jwtTtl}
                onChange={(e) => setJwtTtl(e.target.value)}
              />
            </FormField>
          </div>
        </div>

        <FormField
          label="CA key type"
          message="Key algorithm used for signing SVIDs."
          messageType="neutral"
        >
          <Select
            options={KEY_TYPE_OPTIONS}
            value={keyType}
            onChange={setKeyType}
          />
        </FormField>

        <FormField
          label="Bundle refresh interval (seconds)"
          message="How often agents re-fetch the trust bundle."
          messageType="neutral"
        >
          <Input
            type="number"
            value={bundleRefresh}
            onChange={(e) => setBundleRefresh(e.target.value)}
          />
        </FormField>
      </div>
    </Modal>
  )
}

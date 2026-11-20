'use client'

import { openConsent } from '@/lib/consent'

export default function ConsentSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={openConsent} className={`cursor-pointer ${className ?? ''}`}>
      {label}
    </button>
  )
}

import { useTranslations } from 'next-intl'
import Band from '@/components/ui/Band'
import TitledList from '@/components/ui/TitledList'

const items = ['refinement', 'architecture', 'release', 'communication'] as const

// Figma 345:1302.
export default function HowIWork() {
  const t = useTranslations('HowIWork')
  return (
    <Band id="how-i-work" title={t('title')} titleSize="h2" className="lg:pb-[120px]">
      <TitledList
        items={items.map((key) => ({ title: t(`items.${key}.title`), text: t(`items.${key}.text`) }))}
      />
    </Band>
  )
}

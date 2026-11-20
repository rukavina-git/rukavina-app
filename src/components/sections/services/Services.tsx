import { useTranslations } from 'next-intl'
import Band from '@/components/ui/Band'
import TitledList from '@/components/ui/TitledList'

const items = ['development', 'ai', 'review'] as const

// "What I take on", Figma 331:798.
export default function Services() {
  const t = useTranslations('Services')
  return (
    <Band id="services" title={t('title')} titleSize="h2-sm">
      <TitledList
        size="lg"
        items={items.map((key) => ({ title: t(`items.${key}.title`), text: t(`items.${key}.text`) }))}
      />
    </Band>
  )
}

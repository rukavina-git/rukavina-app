import { useTranslations } from 'next-intl'

export default function ProfileCard() {
  const t = useTranslations('AboutSection')

  return (
    <div className="bg-dark rounded-xl p-9 text-white sticky top-[100px]">
      <div className="w-16 h-16 rounded-full bg-white/10 mb-[18px] flex items-center justify-center text-[18px] font-bold text-white/60">
        {t('card.initials')}
      </div>

      <div className="text-[19px] font-bold tracking-[-0.01em] mb-1">
        {t('card.name')}
      </div>
      <div className="text-[13px] text-white/45 mb-6">{t('card.title')}</div>

      <div className="flex flex-col gap-[11px] pt-5 border-t border-white/10">
        {(
          [
            { label: t('card.locationLabel'), value: t('card.location') },
            { label: t('card.timezoneLabel'), value: t('card.timezone') },
            { label: t('card.languagesLabel'), value: t('card.languages') },
          ] as const
        ).map(({ label, value }) => (
          <div key={label} className="flex items-start gap-2.5 text-[13px]">
            <span className="min-w-[68px] text-[11px] uppercase tracking-[0.06em] text-white/30 pt-px shrink-0">
              {label}
            </span>
            <span className="text-white/70">{value}</span>
          </div>
        ))}

        <div className="flex items-center gap-2.5 text-[13px]">
          <span className="min-w-[68px] text-[11px] uppercase tracking-[0.06em] text-white/30 shrink-0">
            Status
          </span>
          <span className="text-white/70 flex items-center gap-1.5">
            <span
              className="inline-block w-[7px] h-[7px] rounded-full bg-green-400"
              style={{ animation: 'pdot 2s ease-in-out infinite' }}
            />
            Available
          </span>
        </div>
      </div>

      <div className="flex gap-3 mt-5 pt-5 border-t border-white/10">
        <a
          href="https://www.linkedin.com/in/rukavina/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-white/50 no-underline transition-colors duration-300 hover:text-white font-medium"
        >
          {t('card.linkedin')}
        </a>
      </div>
    </div>
  )
}

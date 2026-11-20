import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { getTranslations } from 'next-intl/server'
import { site } from '@/lib/site'

export const alt = site.name
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Hanken Grotesk only (CLAUDE.md). woff files from @fontsource/hanken-grotesk 5.1.0, OFL.
// `outputFileTracingIncludes` in next.config.ts ships them with the deployed function.
const fontDir = join(process.cwd(), 'src/assets/fonts')
const fonts = () =>
  Promise.all(
    ['latin-400', 'latin-ext-400', 'latin-600', 'latin-ext-600'].map((name) =>
      readFile(join(fontDir, `hanken-grotesk-${name}-normal.woff`)),
    ),
  )

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Hero' })
  const [latin400, ext400, latin600, ext600] = await fonts()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#f7f5f0',
          color: '#161616',
          fontFamily: 'Hanken Grotesk',
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 600 }}>{site.name}</div>
        <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.02, letterSpacing: '-0.035em', maxWidth: 980 }}>
          {t('title')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: '#6b6862' }}>
          <div style={{ width: 40, height: 4, background: '#1d4e5f' }} />
          rukavina.app
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Hanken Grotesk', data: latin400, weight: 400, style: 'normal' },
        { name: 'Hanken Grotesk', data: ext400, weight: 400, style: 'normal' },
        { name: 'Hanken Grotesk', data: latin600, weight: 600, style: 'normal' },
        { name: 'Hanken Grotesk', data: ext600, weight: 600, style: 'normal' },
      ],
    },
  )
}

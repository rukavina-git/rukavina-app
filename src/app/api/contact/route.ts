import { Resend } from 'resend'
import { contactLimits, validateContact } from '@/lib/contact'
import { site } from '@/lib/site'

// Contact form endpoint (decision 0009): validation, honeypot, minimum fill time, rate limit,
// reCAPTCHA v3, escaped HTML.

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000
const RECAPTCHA_MIN_SCORE = 0.5

// Per server instance only. Enough for a personal site; move to a shared store if spam shows up.
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key)
    }
  }
  return recent.length > RATE_LIMIT
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function verifyRecaptcha(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    // Local development without keys. Production must have the secret.
    return process.env.NODE_ENV !== 'production'
  }
  if (typeof token !== 'string' || !token) return false

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    })
    const data = (await res.json()) as { success?: boolean; score?: number; action?: string }
    return Boolean(data.success) && data.action === 'contact' && (data.score ?? 0) >= RECAPTCHA_MIN_SCORE
  } catch {
    return false
  }
}

const ok = () => Response.json({ ok: true })
const fail = (error: string, status: number) => Response.json({ error }, { status })

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  let body: Record<string, unknown>
  try {
    const parsed: unknown = await req.json()
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return fail('invalid', 400)
    }
    body = parsed as Record<string, unknown>
  } catch {
    return fail('invalid', 400)
  }

  const str = (value: unknown) => (typeof value === 'string' ? value : '')
  const fields = { name: str(body.name), email: str(body.email), message: str(body.message) }

  // Bots: answer like a success so they don't retry.
  if (str(body.website)) return ok()
  const elapsed = typeof body.elapsed === 'number' ? body.elapsed : 0
  if (elapsed < contactLimits.minFillMs) return ok()

  if (rateLimited(ip)) return fail('rate', 429)

  if (Object.keys(validateContact(fields)).length > 0) return fail('invalid', 400)

  if (!(await verifyRecaptcha(body.token, ip))) return fail('captcha', 403)

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return fail('send', 500)

  const name = fields.name.trim()
  const email = fields.email.trim()
  const message = fields.message.trim()
  const subjectName = name.replace(/[\r\n]+/g, ' ').slice(0, contactLimits.name)

  const { error } = await new Resend(apiKey).emails.send({
    from: 'rukavina.app <no-reply@rukavina.app>',
    to: process.env.CONTACT_TO_EMAIL || site.email,
    replyTo: email,
    subject: `New message from ${subjectName}`,
    text: `${name} <${email}>\n\n${message}`,
    html: `<p><b>${escapeHtml(name)}</b> (${escapeHtml(email)})</p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
  })

  if (error) return fail('send', 502)
  return ok()
}

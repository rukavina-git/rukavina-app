import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, service, message } = (await req.json()) as {
    name: string
    email: string
    service: string
    message: string
  }

  if (!name || !email || !service || !message) {
    return Response.json({ error: 'Missing fields' }, { status: 400 })
  }

  await resend.emails.send({
    from: 'rukavina.app <no-reply@rukavina.app>',
    to: process.env.CONTACT_TO_EMAIL ?? 'hello@rukavina.app',
    subject: `New inquiry — ${service}`,
    html: `<p><b>${name}</b> (${email})</p><p><b>Service:</b> ${service}</p><p>${message.replace(/\n/g, '<br/>')}</p>`,
  })

  return Response.json({ ok: true })
}

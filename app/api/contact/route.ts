import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, phone, message, recaptchaToken } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Verify reCAPTCHA v3
    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    if (secretKey && recaptchaToken) {
      const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${secretKey}&response=${recaptchaToken}`,
      })
      const verifyData = await verifyRes.json()
      if (!verifyData.success || verifyData.score < 0.5) {
        return NextResponse.json({ error: 'reCAPTCHA verification failed.' }, { status: 400 })
      }
    }

    // Send email via Resend
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 })
    }
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: 'ivankarlo@rukavina.app',
      to: 'ivankarlo@rukavina.app',
      subject: `[rukavina.app] ${subject}`,
      text: [
        'New contact form submission from rukavina.app',
        '',
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Subject: ${subject}`,
        `Phone:   ${phone || 'Not provided'}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

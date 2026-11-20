// Contact form rules shared by the form (client) and the API route (server). Decision 0009.

export const contactLimits = {
  name: 100,
  email: 200,
  messageMin: 20,
  messageMax: 5000,
  // Faster than this after the first interaction is treated as a bot.
  minFillMs: 3000,
} as const

export type ContactFields = { name: string; email: string; message: string }
export type ContactField = keyof ContactFields
export type ContactError = 'required' | 'invalid' | 'short' | 'long'
export type ContactErrors = Partial<Record<ContactField, ContactError>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {}
  const name = fields.name.trim()
  const email = fields.email.trim()
  const message = fields.message.trim()

  if (!name) errors.name = 'required'
  else if (name.length > contactLimits.name) errors.name = 'long'

  if (!email) errors.email = 'required'
  else if (email.length > contactLimits.email || !emailPattern.test(email)) errors.email = 'invalid'

  if (!message) errors.message = 'required'
  else if (message.length < contactLimits.messageMin) errors.message = 'short'
  else if (message.length > contactLimits.messageMax) errors.message = 'long'

  return errors
}

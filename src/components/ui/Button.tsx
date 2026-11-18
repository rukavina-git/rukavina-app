import type { ReactNode } from 'react'
import { Link } from '@/lib/i18n/navigation'

interface ButtonProps {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  children: ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function Button({
  href,
  onClick,
  variant = 'primary',
  children,
  className = '',
  type = 'button',
  disabled,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-lg text-[15px] font-medium transition-all duration-300 cursor-pointer'
  const styles = {
    primary:
      'bg-accent text-white px-[30px] py-[13px] hover:bg-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(27,58,75,0.25)] disabled:opacity-60 disabled:pointer-events-none',
    secondary:
      'text-text border border-border px-[30px] py-[13px] hover:border-accent hover:text-accent hover:-translate-y-0.5',
  }

  const cls = `${base} ${styles[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}

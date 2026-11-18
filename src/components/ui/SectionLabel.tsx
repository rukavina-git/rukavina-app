interface SectionLabelProps {
  children: string
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="text-[12px] font-semibold tracking-[0.12em] uppercase text-warm mb-3">
      {children}
    </div>
  )
}

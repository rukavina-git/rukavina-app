interface ServiceCardProps {
  number: string
  name: string
  desc: string
}

export default function ServiceCard({ number, name, desc }: ServiceCardProps) {
  return (
    <div className="bg-card p-11 transition-all duration-300 hover:bg-accent hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(27,58,75,0.18)] cursor-default group">
      <div className="text-[13px] text-muted mb-8 font-normal transition-colors duration-300 group-hover:text-white">
        {number}
      </div>
      <div className="text-[22px] font-bold text-text mb-3 tracking-[-0.02em] transition-colors duration-300 group-hover:text-white">
        {name}
      </div>
      <p className="text-[14px] text-muted leading-[1.75] font-light transition-colors duration-300 group-hover:text-white">
        {desc}
      </p>
    </div>
  )
}

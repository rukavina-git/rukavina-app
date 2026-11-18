interface TagProps {
  label: string
}

export default function Tag({ label }: TagProps) {
  return (
    <span className="text-[11px] font-medium text-accent bg-accent/8 px-[10px] py-1 rounded-[4px]">
      {label}
    </span>
  )
}

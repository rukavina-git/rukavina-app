// Rows of title + text separated by top rules (Figma "How I work" and "What I take on").
// Title column 300px beside the text from md; stacked on phones.
type Item = { title: string; text: string }

type Props = {
  items: Item[]
  // `lg` is the larger "What I take on" scale.
  size?: 'md' | 'lg'
}

export default function TitledList({ items, size = 'md' }: Props) {
  const lg = size === 'lg'
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.title}
          className={`grid gap-1 border-t border-border md:grid-cols-[300px_minmax(0,1fr)] md:gap-8 ${
            lg ? 'py-[18px] md:py-[22px]' : 'py-4 md:py-[18px]'
          }`}
        >
          <h3
            className={`font-semibold tracking-[-0.01em] text-ink ${
              lg ? 'text-[1.1875rem] md:text-[1.3125rem]' : 'text-[1.0625rem] md:text-lg'
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`max-w-[572px] leading-[1.5] text-ink-soft ${
              lg ? 'text-body md:text-lg' : 'text-[0.9375rem] md:text-body'
            }`}
          >
            {item.text}
          </p>
        </li>
      ))}
    </ul>
  )
}

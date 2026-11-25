// Drawn phone screens for the NDA projects (Figma 511:2819). Generic UI only: no client, no
// document types, no real data. Text comes from messages (`Hero.screens.*`) and inherits the page font.
export type GovernmentScreenText = { title: string; text: string; route: string; action: string }
export type PaymentsScreenText = { label: string; amount: string; done: string }

export function GovernmentScreen({ label, text }: { label: string; text: GovernmentScreenText }) {
  return (
    <svg
      viewBox="0 0 242 469"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className="block h-full w-full"
    >
      <rect width="242" height="469" fill="#e6ecec" />
      <path d="M-10 40 C60 20 90 90 150 70 S240 30 260 60 V-10 H-10Z" fill="#efebe2" />
      <path
        d="M150 140 C190 120 240 150 260 140 V300 C220 290 190 250 150 260 C120 268 110 200 150 140Z"
        fill="#efebe2"
      />
      <path d="M-10 210 C40 200 70 240 60 290 L-10 300Z" fill="#efebe2" />
      <path d="M40 250 C60 150 130 110 190 120" stroke="#8aa3a8" strokeWidth="3" fill="none" />
      <path
        d="M190 120 C215 140 225 170 220 210"
        stroke="#8aa3a8"
        strokeWidth="3"
        strokeDasharray="3 6"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="40" cy="250" r="5" fill="#8aa3a8" />
      <circle cx="190" cy="120" r="14" fill="#1d4e5f" opacity=".15" />
      <circle cx="190" cy="120" r="5" fill="#1d4e5f" />
      <rect x="0" y="300" width="242" height="169" rx="22" fill="#fff" />
      <rect x="105" y="312" width="32" height="4" rx="2" fill="#dcd7cc" />
      <rect x="18" y="332" width="54" height="40" rx="6" fill="#f2efe8" stroke="#dcd7cc" />
      <circle cx="35" cy="347" r="6" fill="#1d4e5f" />
      <rect x="27" y="356" width="16" height="10" rx="5" fill="#1d4e5f" />
      <rect x="50" y="342" width="16" height="3" rx="1.5" fill="#b9b4aa" />
      <rect x="50" y="350" width="12" height="3" rx="1.5" fill="#b9b4aa" />
      <g>
        <text x="84" y="348" fontSize="14" fontWeight="600" fill="#161616">
          {text.title}
        </text>
        <text x="84" y="366" fontSize="11" fill="#6b6862">
          {text.text}
        </text>
        <text x="18" y="400" fontSize="11" fill="#6b6862">
          {text.route}
        </text>
        <rect x="18" y="424" width="206" height="34" rx="10" fill="#1d4e5f" />
        <text x="121" y="445" textAnchor="middle" fontSize="13" fontWeight="500" fill="#fff">
          {text.action}
        </text>
      </g>
    </svg>
  )
}

export function PaymentsScreen({ label, text }: { label: string; text: PaymentsScreenText }) {
  return (
    <svg
      viewBox="0 0 242 469"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className="block h-full w-full"
    >
      <rect width="242" height="469" fill="#fff" />
      <rect x="105" y="14" width="32" height="4" rx="2" fill="#dcd7cc" />
      <g>
        <text x="22" y="58" fontSize="12" fill="#6b6862">
          {text.label}
        </text>
        <text x="22" y="98" fontSize="32" fontWeight="600" fill="#161616" letterSpacing="-1">
          {text.amount}
        </text>
        <text x="121" y="320" textAnchor="middle" fontSize="14" fontWeight="600" fill="#161616">
          {text.done}
        </text>
      </g>
      <circle cx="121" cy="230" r="46" fill="#1d4e5f" />
      <path
        d="M101 230 l14 14 l26 -28"
        stroke="#fff"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M104 360 a14 14 0 0 1 0 22 M112 352 a26 26 0 0 1 0 38 M120 344 a38 38 0 0 1 0 54"
        stroke="#1d4e5f"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        opacity=".8"
      />
    </svg>
  )
}

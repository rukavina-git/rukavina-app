import type { ReactNode } from 'react'
import Countdown from './Countdown'

// Launch moment for the countdown: 24 November 2026, 10:00 in Split (CET).
// Change this one line if the date moves.
const LAUNCH = '2026-11-24T10:00:00+01:00'

const EMAIL = 'ivankarlo@rukavina.app'

export default function Home(): ReactNode {
  return (
    <div className="page">
      <header className="header">
        <span className="name">Ivan Karlo Rukavina</span>
        <a className="button" href={`mailto:${EMAIL}`}>
          Get in touch
        </a>
      </header>

      <main className="main">
        <h1>
          Senior software engineer.
          <br />
          Software built properly.
        </h1>
        <p className="lead">
          A new site is on its way. Until then, the quickest way to reach me is email.
        </p>

        <section className="launch" aria-labelledby="launch-title">
          <h2 id="launch-title">
            New site in
            <span className="sr-only"> a few days, on 24 November 2026</span>
          </h2>
          <Countdown target={LAUNCH} />
        </section>

        <p className="links">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href="https://www.linkedin.com/in/rukavina/" rel="me">
            LinkedIn
          </a>
          <a href="https://github.com/rukavina-git" rel="me">
            GitHub
          </a>
        </p>
      </main>

      <footer className="footer">Ivan Karlo Rukavina · Split, Croatia</footer>
    </div>
  )
}

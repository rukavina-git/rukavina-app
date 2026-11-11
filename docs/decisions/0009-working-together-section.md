# 0009: Working together section design

- Status: proposed
- Date: 2026-11-11

## Question

How should the "Working together" section be designed so it is distinctive and not a plain numbered 1-2-3-4 list?

## Options

A. Sticky left heading, right column of four large-type rows separated by hairline rules. No numbers or icons. A thin vertical line fills as the visitor scrolls.
B. Horizontal track of four stops on one thin line, stacking vertically on mobile, with scroll-driven highlight.
C. One large flowing sentence with the four steps as inline phrases, each revealing its sentence on hover or focus.
D. Three compact steps, then step 4 expanded into a "Before anything ships" panel listing concrete checks.
E. (Proposed by the Critic seat) A with D folded in: the four rows, and row 4 opens into a short list of the named checks.

## Constraints

- Copy is fixed (Karlo, 2026-11-11): Talk (free first call), Define, Build and refine, Review and test (code review, automated tests, static analysis before anything ships). Source: thread with Karlo.
- Karlo wants it "fancy", not a plain list, and not template or AI-looking. Source: thread with Karlo.
- Karlo: describe the process and checks, no coverage percentages. Source: thread with Karlo.
- Locked hero: warm white, ink, deep teal, Hanken Grotesk, sticky header with Get in touch, no hero button. Source: Decided page in Figma.
- Page order: Work, What I do, Working together, Contact. Karlo liked the thin scroll-driven line from the earlier Q concept (decision 0007).
- Motion only if scroll-driven and purposeful. No fade-up on everything. Source: `CLAUDE.md`, 0007.
- Assumption: the three checks (code review, automated tests, static analysis) are accurate for Karlo's work; he confirmed the process in general, the wording is ours.

## Council

| Seat | Pick | Reasons | Main risk | Confidence |
| --- | --- | --- | --- | --- |
| Critic | E (A + D) | Editorial, least widget-like. D's rigor is the only content with real differentiation. The line is scroll-driven and already liked, running through Work, What I do and this section. | Sticky-left, big-type, hairline layout is a common "tasteful" template unless type scale, rule weight and the line are exact. | Medium |
| Sales and marketing | A, plus checks in row 4 and a quiet "free first call" link in row 1 | Restraint signals quality. Reads in order at any width with no hover. The link sits where confidence peaks. | Sticky heading plus progress line can feel like a template or cause jank. | Medium |
| Engineering manager | D, refined | Naming concrete checks is the only option that shows engineering practice. Matches "process, not metrics". Static and accessible. | Steps 1-3 get thin; the panel could imply tools or CI that are not confirmed. | Medium-high |
| Freelancer client | D, modified | Showing what happens before anything ships answers "is this low-risk?". Skims fast on a phone. Distinctive through hierarchy, not motion. | The panel looks like a technical checklist and overshadows steps 1-3. | Medium |

## Recommendation

Option E: the four rows of A, with row 4 expanded to name its three checks in plain words, and a quiet text link on row 1 to the Contact section.

All four seats rule out C (hover hides content on touch and for keyboard users) and B (a stock timeline trope). Two seats pick A and two pick D, but their modifications converge on the same thing: A's editorial rows plus D's concrete checks. The real disagreement is the scroll line. The Engineering manager seat calls it decoration; Critic and Sales accept it. The line is not this section's main idea. The type and the checks are. The line stays as a shared page element, and if it causes jank or looks gimmicky in the mock, drop it.

Details that follow from the seats:
- Row 4 lists only the three confirmed checks, in plain words (for example: every change is reviewed, automated tests run, code is scanned for common mistakes). No tools, CI or percentages.
- Row 1 carries one understated text link to Contact. No button, badge or urgency wording.
- Content must be readable with no hover and no scroll dependence.

Strongest argument against: sticky-left plus hairline rows is itself a common pattern, so the look depends on execution (type scale, rule weight, spacing). Impeccable's concepts for this section are pending and should be compared before the mock.

## Decision

Karlo: _pending_

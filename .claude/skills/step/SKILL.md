---
name: step
description: Run the next unchecked step of the active plan in docs/plans/. Plan, wait for approval, implement, verify, review once, record progress.
disable-model-invocation: true
---

Run exactly one step of the active plan. Keep every message short; I read on my phone.

1. Read `docs/plans/ACTIVE` (the plan folder name), then that folder's `00-overview.md` and
   `progress.md`. Pick the first unchecked step not marked "deferred". Read only that step's file.
   If none is left, say the plan is done, list deferred steps, and stop.
2. If the step is marked "(me)", list what I need to check and stop. If it has no step file yet,
   write one in the style of the others, show it, and stop for approval.
3. Read the code the step names. Then give a plan of at most 5 lines: what changes, which files,
   how it's verified. If the code contradicts the step file, say so. If the step changes UI, read
   its linked Figma frame through the Figma MCP first; if there's no link or no MCP, say so and
   stop. Wait for my "go". Don't edit anything before it.
4. Implement. Stay inside the step's scope, CLAUDE.md and the accepted decisions. New strings go
   into both messages/en.json and messages/hr.json.
5. Verify: `npm run typecheck`, `npm run lint`, `npm run build`. Fix failures; don't go on while
   red. For UI steps, start the dev server and check the page at 360px and desktop with the
   Playwright MCP (both locales, reduced motion on and off). Screenshot to `design/review/<step>/`.
6. Run the `reviewer` subagent once on the uncommitted diff, passing the step file path. Fix
   BLOCKERs only. List the rest without fixing them. No second review round.
7. Update `progress.md`: tick the step and add the commit hash. Under Deviations, note anything
   that differs from the step file. Under Gotchas, note what the next step should know. "None"
   if nothing.
8. Commit code and progress.md together on develop (conventional commit, Co-Authored-By line, no
   other attribution), then `git push origin develop`.
9. Report in at most 10 lines: what changed, verification result, reviewer findings and what you
   fixed, open items. End with: "Run /clear, then /step."

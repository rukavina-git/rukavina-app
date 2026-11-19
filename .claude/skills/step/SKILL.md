---
name: step
description: Execute the next pending step file from docs/plans. Use when asked to continue the plan, do the next step, or run a specific step by number.
argument-hint: "[plan-dir] [step-number]"
---

# Execute a plan step

Plans live in `docs/plans/<NN-name>/`. Each plan has a `README.md` (goal, scope, done criteria) and numbered
step files `NN-short-name.md`. A step file starts with a status line: `Status: todo | in-progress | done`.

## Procedure

1. Pick the step.
   - With arguments: the given plan and step.
   - Without: the lowest-numbered plan that has a step not `done`, and its first such step.
   - If a step is `in-progress`, resume it rather than starting another.
2. Read the plan `README.md`, the step file, and `CLAUDE.md`. For UI steps also read `PRODUCT.md` and
   `DESIGN.md`.
3. If the step is ambiguous or conflicts with `CLAUDE.md` or an accepted decision in `docs/decisions/`,
   stop and ask. Do not guess.
4. Set the step to `in-progress` and do exactly what it describes. Nothing from later steps.
5. Verify:
   - `npm run build` and `npm run check` pass.
   - UI changes: run `/impeccable audit` on the changed surface and fix primary findings.
   - Both `en` and `hr` strings exist for anything user-facing.
6. Run the `reviewer` agent on the diff and address its blocking findings.
7. Set the step to `done`, add a short `## Outcome` section to the step file (what changed, anything
   deferred), and commit with a conventional commit message.
8. Report what was done, what was verified, and what the next step is.

# Plans

Each plan is a folder `docs/plans/<name>/` with:

- `00-overview.md`: goal, scope, out of scope, invariants, done criteria
- `progress.md`: checklist of steps (`- [ ] 01 short name`), ticked with the commit hash,
  plus `## Deviations` and `## Gotchas`
- numbered step files `NN-short-name.md`: what to change, which files, linked Figma frame for
  UI steps, and a "Done when" section

`docs/plans/ACTIVE` holds the folder name of the current plan. A step is small enough to
finish and verify in one sitting. `/step` executes the next one. Steps marked "(me)" are for
Karlo; steps marked "deferred" are skipped.

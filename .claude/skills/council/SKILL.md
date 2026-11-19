---
name: council
description: Put a decision that affects how the site sells (positioning, brand, services, pricing, copy, page structure, contact flow) to four independent perspectives and record the result as a decision record. Use when asked to "ask the council" or for any decision Karlo flags as important.
argument-hint: "<question>"
---

# Council

Four seats answer the same question independently. Their views are synthesized into one recommendation and
recorded in `docs/decisions/`. Karlo decides; the council advises.

A run costs roughly four to five times a normal answer. Use it for decisions that change how the site sells,
not for implementation details.

## Seats

| Seat | Core question | Lens |
| --- | --- | --- |
| Client | Would I get in touch after seeing this? | Plays the audience the question affects most (see `CLAUDE.md`). Name which one. |
| Designer | Does this look crafted and distinct, not templated? | Impeccable's critique criteria, `PRODUCT.md`, `DESIGN.md` |
| Sales and marketing | Does this sell the offer and move people to contact? | Positioning, offer clarity, proof, call to action, conversion |
| Skeptic | What is wrong with the option most likely to win? | Argues against the front-runner, names risks and blind spots |

## Procedure

1. Frame the question. Write down:
   - the question in one sentence,
   - two to four concrete options (add one if the question implies it),
   - the facts that constrain it, taken only from `CLAUDE.md`, `PRODUCT.md`, `DESIGN.md`, accepted records in
     `docs/decisions/`, and what Karlo said. Mark anything assumed as an assumption.
   If the options or facts are unclear, ask Karlo before running the seats.
2. Run the four seats in parallel as separate subagents, each given the same brief plus its seat row from the
   table above. A seat never sees another seat's answer. Each seat returns:
   - its pick (one option),
   - at most three reasons,
   - its main risk with that pick,
   - confidence: low, medium or high.
3. Synthesize. Do not average. Lead with where the seats agree, then the real disagreement and which
   argument is stronger and why. Give one recommendation. If the seats split two-two, say so and state what
   information would settle it.
4. Write the record to `docs/decisions/NNNN-slug.md` using `docs/decisions/TEMPLATE.md`. `NNNN` is the next
   free number. Status is `proposed`.
5. Report the recommendation and the record's path to Karlo in a few sentences. Do not mark it `accepted`
   until he says so; then fill in his decision line and set the status.

---
name: forest-author
description: Create or revise Canon & Compass forest content in `src/content/forests`, especially when drafting a new forest overview, building a seven-part forest trail, or rewriting an existing forest to match the current witness-first house voice across Naturalism, Moral Relativism, Religion, and Sensationalism.
---

# Forest Author

Use this skill to write new forests that belong inside the Canon & Compass formation map, not as stand-alone blog content.

## Build Context First

Read these files before drafting:

- `AGENTS.md`
- `src/content/config.ts`
- `src/pages/forests/[...slug].astro`
- `src/pages/forests/index.astro`
- `src/components/ForestFruitPathLinks.astro`
- `src/content/forests/naturalism.mdx`
- `src/content/forests/moral-relativism.mdx`
- `src/content/forests/religion.mdx`
- `src/content/forests/sensationalism.mdx`

Then read the seven trail entries for:

- `src/content/forests/Naturalism/`
- `src/content/forests/Moral Relativism/`
- `src/content/forests/Religion/`
- `src/content/forests/Sensationalism/`

Treat the source forests this way:

- Use all four current forests as live references for the seven-part trail shape and the witness-first house voice.
- `Naturalism` remains the most analytic of the four, but it should still start from lived plausibility before making claims.
- `Moral Relativism` should stay especially attentive to pain, belonging pressure, fear of cruelty, and the reader's desire not to become harsh.
- `Sensationalism` should stay especially attentive to spiritual hunger, grief, tenderness, and fear that leaving intensity means losing God.
- `Religion` should stay especially attentive to the desire for order, reverence, safety, and relief from chaos or failure.

For templates and the part-by-part progression map, read [references/forest-patterns.md](./references/forest-patterns.md).

## Follow This Workflow

### 1. Define the forest before writing

Decide these items up front:

- overview slug at `src/content/forests/<slug>.mdx`
- display `series` name used in frontmatter and folder naming
- folder name at `src/content/forests/<Series Name>/`
- metaphor or felt environment for the forest
- the false safety or promise the forest offers
- the "quiet gospel" sentence
- the fruit it normalizes
- the costs of staying and leaving
- the likely related fruit paths

Keep the forest relational. A forest is an environment that trains instincts, not just a bad idea with a label.

### 2. Draft the overview first

Write the overview in the root `src/content/forests/` directory.

Match the schema exactly:

- `type: "forest"`
- `title`
- `subtitle`
- `summary`
- `series`
- `relatedPathways`
- `climate`
- `canopy`
- `quietGospel`
- `fruit`
- `costStaying`
- `costLeaving`
- `pathIntro`
- `orientation`
- `orientationLink`
- optional `draft`

Use the overview sections as they are rendered by the route:

- The Climate
- The Canopy
- The Quiet Gospel
- The Fruit It Normalizes
- The Cost of Staying
- The Cost of Leaving
- A Path Through the Forest
- Gentle Orientation Forward

Write for those headings even though the headings live in the route, not the MDX file.

### 3. Draft the seven trail entries

Create exactly seven entries unless the user explicitly wants a different structure.

Use ascending part numbers and keep `series` identical across all entries and the overview.

Default shape:

1. Start with the felt pressure, safety, or familiar confusion inside the forest.
2. Expose the forest's internal logic or false equation.
3. Recover discernment by naming what the forest makes hard to see or ask.
4. Show the damage, distortion, or false authority the forest normalizes.
5. Reintroduce a truer good that the forest has trained the reader to distrust.
6. Clarify the deeper Christian frame: Spirit, obedience, holiness, personhood, reality, or moral truth.
7. Show how to leave the forest without overcorrecting into the opposite distortion.

Do not force these labels into the prose. Use them as internal drafting targets.

### 4. Match the house voice

Prefer the current house voice across all four existing forests:

- start inside the reader's lived experience
- start with the reader's arrival story, not merely the forest's thesis
- name why the forest feels safe before criticizing it
- sound pastoral, steady, and specific
- keep the critique truthful without sounding sneering
- move from perception to diagnosis to invitation
- preserve reverence and seriousness without panic
- guard against overcorrecting into the equal and opposite forest

Calibrate by forest:

- `Naturalism`: more factual and analytic is acceptable, but still write from inside the reader's trust in method, seriousness, and suspicion of naivete.
- `Moral Relativism`: foreground how people arrive through wounds, conflict-fatigue, harm-sensitivity, or fear of becoming cruel.
- `Sensationalism`: foreground how people arrive through longing for God, fear of dead religion, tenderness, or earlier charged experiences that felt like mercy.
- `Religion`: foreground how people arrive through desire to please God, relief at clear boundaries, fear of failure, or exhaustion with chaos.

### 5. Keep the prose in family

Use these patterns often:

- short opening paragraphs
- direct questions as section turns or titles
- sparse bullet lists for instincts, fruit, or habits
- phrases like "in this forest," "what feels normal," and "what feels dangerous" when they clarify the climate
- shelter, grief, fear, hunger, or belonging pressure before the critique sharpens
- endings that open the next step instead of closing the subject too neatly

Avoid these patterns:

- culture-war shorthand
- detached academic lecture tone
- "gotcha" apologetics
- mockery of people inside the forest
- flattening the forest into generic self-help advice
- turning `Foundations` material into the reader's first stop

### 6. Wire the repo after the writing is done

When creating a brand-new forest:

- add the overview MDX at the collection root
- add the seven entry MDX files in a matching series folder
- update the hard-coded forest cards in `src/pages/forests/index.astro`
- ensure `relatedPathways` aligns with real `fruit-path` `pathwayId` values

If you rename anything:

- preserve the display `series` string across the overview and entries
- keep the slug stable unless the user explicitly wants it changed
- do not break related fruit-path links

### 7. Verify

For content-only forest additions or rewrites, run at least:

1. `npm run typecheck`
2. `npm run build` when routes, collection content, or imports changed

## Quality Bar

A finished forest should do all of this:

- feel like an environment the reader can recognize from the inside
- show how a person plausibly arrives there before showing why they must leave
- name the forest's false promise in a single memorable sentence
- connect worldview climate to recognizable fruit
- lead the reader toward truth without rushing them
- give part 7 a real exit path that avoids reactionary overcorrection
- fit the repo's orientation-first journey from forests toward clearing, fruit paths, and deeper foundations

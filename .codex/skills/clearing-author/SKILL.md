---
name: clearing-author
description: Create or revise Canon & Compass clearing content in `src/content/the-clearing`, especially witness-first threshold essays, misnaming pieces, false-urgency pieces, Christ-attention essays, quiet testimony, or rewrites that move older apologetic/philosophical clearing material toward the newer orientation-first house voice.
---

# Clearing Author

Use this skill to write `The Clearing` as a place of orientation before diagnosis.

`The Clearing` is not a generic essay bucket. It is the part of the site that helps a reader slow down, stop performing, and tell the truth before entering `The Forests`, `Fruit Paths`, or deeper `Foundations`.

## Build Context First

Read these files before drafting:

- `AGENTS.md`
- `src/content/config.ts`
- `src/pages/the-clearing/index.astro`
- `src/pages/the-clearing/[...slug].astro`
- `src/pages/about.astro`
- `src/pages/foundations/index.astro`

Then read current `The Clearing` entries with two goals:

- identify the newer witness-first voice to preserve
- identify older pieces that read more like `Pillars` so you do not draft in that direction by accident

At minimum, read:

- `src/content/the-clearing/when-everything-feels-spiritually-important-at-once.mdx`
- `src/content/the-clearing/testimony-of-being-kept.mdx`
- `src/content/the-clearing/key-and-lock-paradigm.mdx`
- `src/content/the-clearing/worldview-foundations.mdx`
- `src/content/the-clearing/the-architecture-of-truth.mdx`

For structure, essay types, and title patterns, read [references/clearing-patterns.md](./references/clearing-patterns.md).

## Follow This Workflow

### 1. Decide what kind of clearing piece this is

Pick the primary role before drafting:

- threshold essay
- misnaming essay
- false-urgency essay
- witness-training essay
- Christ-attention essay
- quiet testimony essay
- bridge essay into a forest or fruit path

Name the felt condition clearly. The essay should meet a reader who is overrun, tired, spiritually thin, or unable to name what is happening without performing.

### 2. Decide what the piece is not

Before writing, define the boundary:

- it is not a forest overview
- it is not a fruit-path diagnosis
- it is not a pillar-style system builder
- it is not an apologetics lecture
- it is not a generic devotional listicle

If the center of gravity is argument, classification, or worldview proof, it probably belongs somewhere else.

### 3. Match the collection schema exactly

`the-clearing` entries support:

- `title`
- `summary`
- `date`
- `tags`
- optional `pathwayId`
- optional `draft`
- optional `prevHref`
- optional `prevLabel`
- optional `nextHref`
- optional `nextLabel`

### 4. Draft in the clearing house voice

Keep the newer house voice:

- start inside lived experience, not abstract thesis
- slow the reader down before sharpening the diagnosis
- name hidden pressure without accusation
- distinguish witness from over-analysis
- expose false urgency without sounding cynical
- return attention to Christ without spectacle
- end with steadier witness, not total closure

Useful prose habits:

- short opening paragraphs
- restrained section count
- direct second-person address when it clarifies
- repeated naming formulas such as "Maybe it is..." or "Sometimes..."
- sparse bullet lists only when they increase clarity

### 5. Keep the essay in family

The best clearing pieces usually do several of these:

- help the reader regain proportion
- separate loudness from truth
- surface what has been misnamed
- make honesty feel possible again
- reduce pressure to fix or explain everything
- reintroduce Christ as present, steady, and non-performative
- prepare the reader to enter a forest or fruit path without panic

Avoid these patterns:

- gotcha apologetics
- detached lecture tone
- culture-war shorthand
- heavy-handed moralizing
- detailed root-cause mapping better suited for `Fruit Paths`
- full worldview architecture better suited for `Pillars`
- urgency in the prose itself

### 6. Place it in the broader formation map

A clearing piece should reinforce the site journey:

1. `The Clearing` slows and reorients
2. `The Forests` name climates
3. `Fruit Paths` trace visible fruit to roots
4. `Foundations` reinforce what has already been witnessed

When helpful, end with language that quietly opens one of those next steps without forcing it.

### 7. Verify

For new or revised clearing content, run at least:

1. `npm run typecheck`

Also run:

2. `npm run build`

when you change listing behavior, frontmatter shape, routes, or multiple linked content files.

## Quality Bar

A finished clearing piece should do all of this:

- feel like quieter ground rather than another demand
- help a reader name what is happening without theatrics
- sound pastoral, lucid, and serious without panic
- keep Christ at the center without turning Him into a pressure source
- belong clearly to `The Clearing` rather than to `The Forests`, `Fruit Paths`, or `Pillars`

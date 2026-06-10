---
name: fruit-path-author
description: Create or revise Canon & Compass fruit-path content in `src/content/fruit-path`, especially when drafting a new pathway that starts with visible fruit, names the counterfeit root beneath it, and re-roots the reader in truth with the existing callout and pathway-linking components.
---

# Fruit Path Author

Use this skill to write `Fruit Paths` as diagnostic-and-reordering guides inside the Canon & Compass formation map.

`Fruit Paths` are not generic devotionals, not clearing essays, and not worldview overviews. They begin with the fruit a reader already notices, trace that fruit to a counterfeit center, then walk toward a truer root under Christ.

## Build Context First

Read these files before drafting:

- `AGENTS.md`
- `src/content/config.ts`
- `src/pages/fruit-path/index.astro`
- `src/pages/fruit-path/[slug].astro`
- `src/layouts/FruitPathPage.astro`
- `src/components/PathwayLinks.astro`
- `src/components/PathwayCTAs.astro`

Then read at least four existing fruit paths, including:

- `src/content/fruit-path/anxiety-trust.mdx`
- `src/content/fruit-path/burnout_grace.mdx`
- `src/content/fruit-path/control-surrender.mdx`
- `src/content/fruit-path/cynicism_hope.mdx`

For templates, field usage, and authoring checklists, read [references/fruit-path-patterns.md](./references/fruit-path-patterns.md).

## Follow This Workflow

### 1. Confirm it belongs in `Fruit Paths`

Write a fruit path when the reader's entry point is a visible pattern such as anxiety, burnout, envy, cynicism, control, numbness, reactivity, or another recognizable fruit.

Do not force content into this collection if its real center of gravity is:

- reorientation before diagnosis: `The Clearing`
- worldview climate or environment: `Forests`
- longer argument or doctrinal reinforcement: `Pillars`
- slower follow-on formation: `Foundations`

If the reader first needs gentler orientation, point them toward `The Clearing` rather than drafting a more aggressive diagnosis.

### 2. Define the path before writing

Decide these items up front:

- file slug at `src/content/fruit-path/<slug>.mdx`
- stable `pathwayId`
- bad-fruit title
- truth-tree title
- `label` shown on the page
- the false system or counterfeit gospel named by `shift.systemLabel`
- the core lie under the symptom
- the reordering truth under Christ
- whether linked `canonNote`, `compassPoint`, and `pillar` already exist

Keep the path relational. A fruit path should show how the symptom once felt protective, responsible, or necessary before exposing what it is doing now.

### 3. Match the collection schema exactly

`fruit-path` entries support:

- `title`
- `summary`
- `date`
- `tags`
- optional `label`
- optional `pathwayId`
- optional `draft`
- required `shift`
- optional `tree`
- optional `counterfeitTree`
- optional `canonNote`
- optional `compassPoint`
- optional `pillar`

Use the fields this way:

- `title` and `summary` describe the truth-tree side for listings and search
- `label` usually names the pair, such as `Anxiety ↔ Trust-Based Identity`
- `pathwayId` is the main cross-link key; keep it stable once chosen
- `shift` names the visible fruit and its counterfeit system
- `tree` points to the truth-tree section in the same document
- `canonNote`, `compassPoint`, and `pillar` should only be present when real linked content exists or is being created in the same task
- leave `counterfeitTree` unset unless there is an actual separate counterfeit-tree route to link

### 4. Keep the body shape in family

Most fruit paths should keep this two-section structure:

1. `#symptom`
2. `#truth-tree`

Inside `#symptom`, usually include:

- a `# Bad Fruit: ...` opening
- a section naming what the fruit may be calling itself
- a `FalseTreeCallout`
- an invitation paragraph
- a primary `CTA` leading to `#truth-tree`

Inside `#truth-tree`, usually include:

- a `# The True Tree: ...` opening
- a `Scripture` block
- a `TreeCallout`
- a `New Fruit` comparison table
- optional `Next Steps`
- `PathwayCTAs`

Keep the section ids exactly `symptom` and `truth-tree`. Existing `href` values and CTA buttons depend on those anchors.

### 5. Reuse the existing components

Prefer the current pattern:

- `CTA`
- `Scripture`
- `FalseTreeCallout`
- `TreeCallout`
- `PathwayCTAs`
- `PastoralNote` when the fruit overlaps mental health, trauma, or safety-sensitive material

Do not recreate these patterns inline unless there is a real structural reason.

### 6. Match the house voice

Write in the current fruit-path voice:

- start with what the reader feels, notices, or keeps repeating
- name why the pattern once felt like care, wisdom, maturity, or survival
- expose the lie without sounding clinical or accusatory
- move from symptom to root to reordering truth
- keep Christ near the reader, not merely at the conclusion
- end with concrete, faithful steps instead of abstract uplift

Useful habits:

- short opening paragraphs
- direct second-person address
- one central lie stated plainly
- concrete fruit in body, schedule, prayer, and relationships
- truthful but pastoral language

Avoid:

- detached therapy-speak without theological center
- culture-war shorthand
- flattening everything into behavior management
- treating the bad fruit as merely a moral failure
- turning the piece into a long pillar-style argument

### 7. Wire links carefully

`PathwayLinks` and `PathwayCTAs` are only helpful when metadata is real.

When adding or revising a fruit path:

- keep `pathwayId` aligned with all related content that uses it
- set `shift.href` to `/fruit-path/<slug>#symptom`
- set `tree.href` to `/fruit-path/<slug>#truth-tree`
- keep `canonNote.href`, `compassPoint.href`, and `pillar.href` pointed at real routes
- do not add placeholder slugs or dead-end links

If the user wants a brand-new path plus companion pieces, create them deliberately and wire them together by the same `pathwayId`.

### 8. Verify

For new or revised fruit-path content, run at least:

1. `npm run typecheck`

Also run:

2. `npm run build`

when collection content, routes, imports, or multiple linked files changed.

## Quality Bar

A finished fruit path should do all of this:

- begin with a fruit the reader can already recognize in lived experience
- show why that fruit felt necessary or protective before critiquing it
- identify one counterfeit root or false center clearly
- offer a truer root that is concretely Christ-centered
- make the callout sections and metadata consistent enough for repo linking to work
- fit the site flow from clearing, to diagnosis, to re-rooting, to longer formation

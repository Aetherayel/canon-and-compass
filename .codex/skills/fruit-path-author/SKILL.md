---
name: fruit-path-author
description: Create or revise Canon & Compass fruit-path content in `src/content/fruit-path`, especially when drafting a new pathway that starts with visible fruit, names the counterfeit root beneath it, and re-roots the reader in truth with the existing callout pattern and integrated fruit-path structure.
---

# Fruit Path Author

Use this skill to write `Fruit Paths` as diagnostic-and-reordering guides inside the Canon & Compass formation map.

`Fruit Paths` are not generic devotionals, not clearing essays, and not worldview overviews. They begin with the fruit a reader already notices, trace that fruit to a counterfeit center, then walk toward a truer root under Christ.

The current fruit-path pattern is **integrated**. Do not treat `Canon Notes`, `Compass Points`, or `Pillars` as required public follow-on destinations. Instead, fold the strongest prayer, cultural, and theological material into the path itself while keeping the page slim and grounded.

## Build Context First

Read these files before drafting:

- `AGENTS.md`
- `src/content/config.ts`
- `src/pages/fruit-path/index.astro`
- `src/pages/fruit-path/[slug].astro`
- `src/layouts/FruitPathPage.astro`
- `src/components/PathwayLinks.astro`

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
- slower conceptual formation: `Worldview Bearings`

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
- whether any legacy companion metadata needs to remain for backward compatibility

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
- `canonNote`, `compassPoint`, and `pillar` are legacy optional fields; only keep or add them when there is a real repo reason to preserve that metadata
- leave `counterfeitTree` unset unless there is an actual separate counterfeit-tree route to link

### 4. Keep the body shape in family

Most fruit paths should keep this two-section structure:

1. `#symptom`
2. `#truth-tree`

Inside `#symptom`, usually include:

- a `# Bad Fruit: ...` opening
- a section naming what the fruit may be calling itself
- a `FalseTreeCallout`
- a short section explaining why this fruit feels normal, wise, or responsible now
- an invitation paragraph
- a primary `CTA` leading to `#truth-tree`

Inside `#truth-tree`, usually include:

- a `# The True Tree: ...` opening
- a `Scripture` block
- a `TreeCallout`
- a short `Practice of ...` section
- a short `Under the Surface` section that integrates the strongest deeper theological clarification
- a `Keep Walking` close that points outward to related forests or bearings only when genuinely helpful

Keep the section ids exactly `symptom` and `truth-tree`. Existing `href` values and CTA buttons depend on those anchors.

### 5. Reuse the existing components

Prefer the current pattern:

- `CTA`
- `Scripture`
- `FalseTreeCallout`
- `TreeCallout`
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
- integrated support rather than a handoff to side libraries

Avoid:

- detached therapy-speak without theological center
- culture-war shorthand
- flattening everything into behavior management
- treating the bad fruit as merely a moral failure
- turning the piece into a long pillar-style argument

### 7. Keep the path integrated

Do not write fruit paths as if their real work happens in separate companion pages.

When adding or revising a fruit path:

- keep `pathwayId` aligned with all related content that uses it
- set `shift.href` to `/fruit-path/<slug>#symptom`
- set `tree.href` to `/fruit-path/<slug>#truth-tree`
- integrate the strongest prayer/practice material directly into the path
- integrate the strongest cultural/systemic lens directly into the path
- integrate the strongest deeper theological material directly into the path
- do not add placeholder `canonNote`, `compassPoint`, or `pillar` metadata just because those fields exist
- when pointing outward, prefer related forests or `Worldview Bearings`, not an assumed `Foundations` layer

Companion collections may still exist in the repo, but fruit paths should stand on their own without sending the reader into side shelves to finish the formation arc.

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
- integrate practice, cultural pressure, and theological clarification without turning into a mini-pillar
- make the callout sections and metadata consistent enough for repo linking to work
- fit the site flow from clearing, to diagnosis, to re-rooting, to forests or bearings when deeper context is needed

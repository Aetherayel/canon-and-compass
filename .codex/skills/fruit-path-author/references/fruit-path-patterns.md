# Fruit Path Patterns

## Contents

1. File template
2. Frontmatter rules
3. Section map
4. Cross-linking rules
5. Tone rules
6. Completion checklist

## File template

Use this for `src/content/fruit-path/<slug>.mdx`:

```mdx
---
title: "Truth-Tree Title"
summary: "One-sentence truth-tree summary for listings and search."
date: 2026-01-01
tags:
  - Truth Tag
  - Fruit Tag
  - Formation Tag
label: "Bad Fruit ↔ Truth-Tree Title"
pathwayId: bad-fruit-truth-tree
shift:
  title: "Bad Fruit"
  description: "One-sentence symptom diagnosis from inside lived experience."
  fruit: "Bad Fruit"
  blurb: "Short symptom summary used in related UI."
  systemLabel: "Counterfeit System"
  tags:
    - Fruit Tag
    - Fear Tag
    - Formation Tag
  date: 2026-01-01
  slug: "bad-fruit"
  href: "/fruit-path/bad-fruit-truth-tree#symptom"
tree:
  title: "Truth-Tree Title"
  summary: "One-sentence re-rooting summary."
  tags:
    - Truth Tag
    - Fruit Tag
    - Formation Tag
  date: 2026-01-01
  slug: "truth-tree"
  href: "/fruit-path/bad-fruit-truth-tree#truth-tree"
canonNote:
  title: "Companion Canon Note"
  slug: "companion-canon-note"
  href: "/canon_notes/companion-canon-note"
compassPoint:
  title: "Companion Compass Point"
  slug: "companion-compass-point"
  href: "/compass_points/companion-compass-point"
pillar:
  title: "Companion Pillar"
  slug: "companion-pillar"
  href: "/pillars/companion-pillar"
draft: false
---

import CTA from '../../components/CTA.astro'
import Scripture from '../../components/Scripture.astro'
import FalseTreeCallout from '../../components/FalseTreeCallout.astro'
import TreeCallout from '../../components/TreeCallout.astro'
import PastoralNote from '../../components/PastoralNote.astro'

<section id="symptom" class="scroll-mt-24">

# Bad Fruit: Bad Fruit

Open close to lived experience. Name what the person feels, notices, repeats, or keeps defending.

Explain why this pattern can feel wise, protective, mature, loving, or necessary.

<PastoralNote>
  Optional. Use when the topic overlaps anxiety disorders, trauma, depression, abuse, panic, self-harm, or other safety-sensitive territory.
</PastoralNote>

---

## What Bad Fruit May Be Calling Itself

**Lie:** “State the core lie plainly.”

> “Example self-protective script.”
> “Example spiritualized script.”
> “Example identity-level script.”

---

## The Counterfeit Tree: Counterfeit Name

<FalseTreeCallout
  title="Anatomy of this tree"
  data={{
    root: "Counterfeit root belief.",
    rootReflection: "Question exposing the root.",
    trunk: "Counterfeit organizing principle.",
    trunkReflection: "Question exposing how it operates.",
    branches: ["Branch", "Branch", "Branch"],
    branchesReflection: "Question exposing recurring strategies.",
    leaves: ["Visible habit", "Visible habit", "Visible habit"],
    leavesReflection: "Question exposing recognizable patterns.",
    fruit: ["Fruit", "Fruit", "Fruit", "Fruit"],
    fruitReflection: "Question exposing costs that feel normal now.",
    scripture: [
      "Short scripture line. – Reference (ESV)"
    ],
    redirection: [
      "Concrete invitation.",
      "Concrete prayer or confession.",
      "Pointer toward the truth tree."
    ]
  }}
/>

---

## Why Bad Fruit Feels Normal Now

Explain briefly why this pattern gets rewarded, reinforced, or misnamed in lived experience.

Keep it concrete and short. This section should import the strongest cultural/systemic insight without turning into a standalone essay.

---

## Invitation

Name how Christ meets the reader here without minimizing the burden or flattering the pattern.

<CTA
  variant="primary"
  title="Step into the Truth Tree"
  description="Short invitation line."
  buttonText="See the Good Tree"
  href={`/fruit-path/${frontmatter.pathwayId}#truth-tree`}
/>

</section>

<section id="truth-tree" class="scroll-mt-24 mt-12 pt-12 border-t border-black/10 dark:border-white/15">

# The True Tree: Truth-Tree Title

State the reordering truth. Keep it concrete, Christ-centered, and formation-aware.

<Scripture refText="Reference (ESV)">
  “Key passage.”
</Scripture>

<TreeCallout
  title="Anatomy of this tree"
  data={{
    root: "True root belief.",
    rootReflection: "Question opening trust.",
    trunk: "True organizing principle.",
    trunkReflection: "Question opening practice.",
    branches: ["Branch", "Branch", "Branch"],
    branchesReflection: "Question opening response.",
    leaves: ["Visible practice", "Visible practice", "Visible practice"],
    leavesReflection: "Question opening concrete obedience.",
    fruit: ["Fruit", "Fruit", "Fruit", "Fruit"],
    fruitReflection: "Question helping the reader desire new fruit truthfully.",
    scripture: [
      "Short scripture line. – Reference (ESV)"
    ],
    redirection: [
      "Concrete prayer.",
      "Concrete practice.",
      "Concrete remembering step."
    ]
  }}
/>

---

## Practice of Truth-Tree Title

Give one short embodied practice, prayer pattern, or faithful experiment.

Optional scripture can appear here if it sharpens the practice.

---

## Under the Surface

Add a short deeper clarification that integrates the strongest theological material.

Keep it grounded in lived experience. Do not let this section turn into a long pillar-style argument.

---

## Keep Walking

- point toward the related forest when wider climate naming would help
- point toward `Worldview Bearings` only when a sturdier conceptual frame would genuinely help
- avoid sending the reader to side libraries just to finish the path

</section>
```

## Frontmatter rules

Use these conventions:

- `title` should usually match the truth-tree identity, not the bad-fruit label
- `summary` should sound like the reordering truth, not a teaser headline
- `label` usually pairs the fruit and the truth-tree with `↔`
- `pathwayId` must be stable; once linked from related content, do not change it casually
- `shift.date` and `tree.date` should stay aligned with the entry date unless there is a deliberate reason not to
- `shift.slug` and `tree.slug` are short identifiers, not full entry slugs
- omit `canonNote`, `compassPoint`, or `pillar` entirely unless there is a real repo reason to preserve them
- omit `PastoralNote` import when it is not used

## Section map

The fruit-path index explains the intended movement:

`Fruit -> misnaming -> root -> false center -> reordering truth -> practice -> deeper clarification -> faithful next step`

Make that movement visible in the body:

- fruit: opening symptom language
- misnaming: "what it may be calling itself"
- root: counterfeit tree root
- false center: trunk and organizing lie
- why it feels normal now: short cultural/systemic explanation
- reordering truth: truth-tree opening and scripture
- faithful step: redirection lines, `Practice`, `Under the Surface`, and `Keep Walking`

## Cross-linking rules

These fields drive repo behavior:

- `pathwayId`: used by related content and CTA lookup
- `shift.href`: should resolve to `#symptom`
- `tree.href`: should resolve to `#truth-tree`
- `canonNote.href`, `compassPoint.href`, `pillar.href`: should resolve to real routes

Before writing linked metadata, check that the companion files exist and that the metadata is still worth keeping. The public fruit-path pattern should not depend on those links.

## Tone rules

Keep the voice:

- near the reader
- honest about why the fruit felt necessary
- steady rather than urgent
- specific in bodily, relational, and spiritual effects
- Christ-centered without becoming slogan-heavy

Avoid:

- diagnostic labels without pastoral care
- abstract theological language detached from experience
- tidy endings that skip repentance, grief, or retraining
- generic self-help phrasing
- stuffing every possible companion idea into one path page

## Completion checklist

When adding a new fruit path, finish this list:

- create `src/content/fruit-path/<slug>.mdx`
- keep `pathwayId` stable and intentional
- keep `#symptom` and `#truth-tree` anchors exact
- verify all companion links are real
- reuse the existing callout components
- preserve the site flow from fruit toward truth and then toward foundations
- run `npm run typecheck`
- run `npm run build` if you changed linked content, imports, or route-relevant content

# Forest Patterns

## Contents

1. Overview file pattern
2. Entry file pattern
3. Seven-part progression map
4. Tone and flow rules
5. Repo completion checklist

## Overview file pattern

Use this for `src/content/forests/<slug>.mdx`:

```mdx
---
type: "forest"
title: "..."
subtitle: "..."
summary: "..."
series: "Series Name"
relatedPathways:
  - pathway-id
climate: |
  ...

  ...
canopy:
  - ...
  - ...
  - ...
  - ...
quietGospel: "..."
fruit:
  - ...
  - ...
  - ...
  - ...
  - ...
costStaying: |
  ...

  ...
costLeaving: |
  ...

  ...
pathIntro: |
  ...

  ...
orientation: |
  ...

  ...
orientationLink:
  label: "Rest in The Clearing"
  href: "/the-clearing"
draft: false
---
```

Use the overview fields this way:

- `title`: forest name shown on the page
- `subtitle`: a felt description, not a dictionary definition
- `summary`: concise search/listing line
- `series`: exact string used by all seven entries
- `relatedPathways`: real `fruit-path` `pathwayId` values
- `climate`: what the air of the forest feels like from inside
- `canopy`: four short lines starting from a hidden loss of sight
- `quietGospel`: the false promise in one sentence
- `fruit`: five recognizable outcomes
- `costStaying`: how the soul is narrowed if nothing changes
- `costLeaving`: why exit feels costly or frightening
- `pathIntro`: what the trail is trying to do
- `orientation`: gentle forward movement, usually toward The Clearing

## Entry file pattern

Use this for `src/content/forests/<Series Name>/0n-...mdx`:

```mdx
---
title: "..."
summary: "..."
date: "2026-01-01"
series: "Series Name"
part: 1
tags:
  - Worldview
  - Foundations
  - Series Name
  - Topic Tag
  - Topic Tag
draft: false
---
```

Keep these conventions:

- number files `01-` through `07-`
- keep dates ascending with the part order
- keep `series` identical across all files
- include `Worldview`, `Foundations`, and the forest name in tags
- add 2-4 topical tags that match the entry's emphasis

## Seven-part progression map

Use this as the default trail architecture.

### Part 1

Start with the feeling that makes the forest livable.

- Use a title that names the felt confusion, fear, or pressure.
- Explain why the reader learned to interpret the world this way.
- End by naming the first lie or misreading.

Reference examples:

- "Science Isn't a Worldview. But You're Using It Like One."
- "Why Do We Care About Justice if Morality Is Just Made Up?"
- "When Structure Becomes a Shelter"
- "Why Does Quiet Feel Like God Left the Room?"

### Part 2

Expose the forest's operating logic.

- Name the false equation or bargain.
- Show why it sounds responsible, safe, compassionate, or devout.
- Keep the reader close; do not jump straight to condemnation.

### Part 3

Recover discernment.

- Name the question the forest protects itself from.
- Show what becomes hard to see, practice, or ask.
- Use this part to create interpretive space.

### Part 4

Show the distortion more starkly.

- Surface harm, fear, authority problems, or conceptual collapse.
- Let the consequences become harder to ignore.
- Turn the critique toward truth, not spectacle.

### Part 5

Reintroduce a truer good.

- Restore something the forest trained the reader to distrust.
- In the revised house voice, this is often where ordinary grace, steady practices, or moral beauty start to reappear.
- Let hope become imaginable here.

### Part 6

Clarify the deeper Christian account.

- Move from symptom-level correction to formation-level truth.
- Common anchors: the Spirit's fruit, relational obedience, moral law, personhood, holiness, resurrection, or the shape of reality under Christ.
- Make the contrast constructive, not merely critical.

### Part 7

Show the exit path without overcorrection.

- Assume leaving will feel costly.
- Guard against the equal and opposite error.
- End with a slower, steadier path of retraining, trust, and nearness to Christ.

Reference examples:

- "Live Like It's True"
- "So What Now?"
- "Leaving the Ironwood Without Losing Reverence"
- "How to Leave Sensationalism Without Losing Wonder"

## Tone and flow rules

Use all four current forests for both movement and tone:

- more pastoral than combative
- more climate-shaped than debate-shaped
- more attentive to fear, grief, and false safety
- more interested in formation than winning
- more attentive to the reader's arrival story before critique sharpens

Calibrate emphasis by forest:

- `Naturalism`: keep the movement somewhat more analytic, but still begin from intellectual seriousness, plausibility, and fear of naivete.
- `Moral Relativism`: begin from wounds, conflict-avoidance, fear of harshness, and the instinct to preserve belonging.
- `Sensationalism`: begin from spiritual hunger, tenderness, earlier intense experiences, and fear that quiet means God has withdrawn.
- `Religion`: begin from desire for reverence, safety, clear boundaries, and relief from ambiguity or chaos.

Keep these tonal habits:

- write from near the reader, not above them
- tell the truth about why a false framework feels protective
- let the felt shelter or relief become visible before naming the distortion
- use concrete church, emotional, or cultural instincts
- let transitions feel cumulative rather than abrupt
- keep Christ and formation in view before the final entry

Avoid these tonal failures:

- sounding like a detached lecture
- treating the forest as a straw man
- making every paragraph resolve too quickly
- ending with a call to reaction instead of a call to truthful apprenticeship

## Repo completion checklist

When adding a new forest, finish this list:

- create the overview at `src/content/forests/<slug>.mdx`
- create seven entries at `src/content/forests/<Series Name>/`
- keep the overview `series` and entry `series` strings identical
- set valid `relatedPathways`
- update `src/pages/forests/index.astro`
- keep drafts filtered intentionally
- run `npm run typecheck`
- run `npm run build` if routes, collection content, or imports changed

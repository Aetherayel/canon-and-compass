# Canon & Compass

Canon & Compass is a discipleship-oriented writing project built as a content-rich Astro site. Its aim is to help believers regain bearings in a loud age: to trace what is showing up in life back to what is forming it, and to re-root in the truth of Scripture.

Mixed rights notice: the repository's software is MIT-licensed, but the Canon & Compass editorial content and brand assets are not automatically released under MIT. See `NOTICE.md` and `COPYRIGHT.md`.

## Purpose

Canon & Compass is not designed as a generic blog. It is a structured formation map.

The project is built around a few core convictions:

- discipleship should be concrete, not vague
- truth should lead to formation, not just information
- modern cultural pressures should be named honestly, without panic
- Scripture remains the governing authority for the whole project

The content is organized to help a reader move from confusion toward truthful witness:

- `The Clearing`: a quiet place for orientation, slowing down, and learning to see again
- `The Forests`: worldview diagnosis that names the climates shaping instincts and assumptions
- `Fruit Paths`: formation pathways that trace unwanted fruit back to hidden roots and toward healing truth
- `Worldview Bearings`: a smaller shelf inside The Clearing for readers who need a sturdier conceptual frame

## Technical Overview

This repository is an Astro site with MDX-driven content collections and a small amount of SolidJS for interactive search and filtering.

Core stack:

- `Astro 4`
- `TypeScript`
- `MDX`
- `Tailwind CSS`
- `SolidJS`
- `Fuse.js` for client-side search
- `RSS` and `sitemap` generation through Astro integrations

Key technical characteristics:

- content lives in typed Astro collections under `src/content`
- routes are file-based under `src/pages`
- shared layouts live in `src/layouts`
- reusable UI components live in `src/components`
- content schemas are defined in `src/content/config.ts`
- collection helper types live in `src/lib/content.ts`

## Project Structure

```text
src/
  components/                  Shared Astro and Solid components
  content/                     MDX content collections
    canon_notes/
    compass_points/
    forests/
    foundations-of-discernment/
    fruit-path/
    pillars/
    the-clearing/
  layouts/                     Page and article layouts
  lib/                         Utilities and content typing helpers
  pages/                       Astro routes
  styles/                      Global styling
public/                        Static assets
```

Important route groups:

- `src/pages/the-clearing`
- `src/pages/forests`
- `src/pages/fruit-path`
- `src/pages/the-clearing/worldview-bearings`
- `src/pages/canon_notes`
- `src/pages/compass_points`
- `src/pages/pillars`
- `src/pages/the-clearing/worldview-bearings/foundations-of-discernment`

## Content Model

The main collections are defined in `src/content/config.ts`.

- `fruit-path`: core pathway entries with shift/tree/linking metadata
- `forests`: both forest overviews and forest series entries
- `canon_notes`: devotional or standalone reflections
- `foundations-of-discernment`: structured multi-day devotional series
- `compass_points`: cultural commentary pieces
- `pillars`: longer theological or philosophical essays
- `the-clearing`: reflective orientation pieces

This structure matters because the site is not just chronological. It is relational. Content is intentionally linked across pathways, worldviews, and bearings.

## Local Development

### Prerequisites

- `Node.js >= 18.17.1`

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

To expose the dev server on your local network:

```bash
npm run dev:network
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Type-check

```bash
npm run typecheck
```

## Licensing and Content Rights

This repository is intentionally split between software and editorial content.

- The software and site infrastructure are licensed under the MIT License in `LICENSE`.
- The written content, MDX entries, original site copy, and creative assets are not released under MIT unless a file says otherwise.
- Editorial content and brand assets are reserved under the terms described in `COPYRIGHT.md`.
- `NOTICE.md` provides the clearest path-level map of what is MIT-covered, what is reserved, and where mixed files exist.

If you want to reuse essays, devotionals, graphics, or other Canon & Compass content, request permission first at `contact@canonandcompass.com`.

## Notes for Future Maintenance

- The site URL in `astro.config.mjs` is set to `https://canonandcompass.com`. Keep metadata, sitemap, and feed behavior aligned with that production domain.
- Content integrity depends on the schemas in `src/content/config.ts`. When adding new frontmatter fields, update the schema first.
- Search and listing behavior depend on consistent metadata such as `title`, `summary`, `date`, `tags`, and optional `pathwayId`.
- Brand palette and usage guidance live in `BRAND_SYSTEM.md`. Preserve the monochrome-first direction and use accent colors sparingly.
- `README.md` is intended to explain both the ministry vision and the engineering structure, so future changes should preserve both perspectives.

## Why This Exists

A lot of Christian writing either stays abstract or becomes purely reactive. Canon & Compass is an attempt to do something harder: create a thoughtful, navigable formation map that helps people interpret their lives, name the pressures shaping them, and return to truth with honesty and obedience.

From a technical standpoint, this repository is the delivery system.

From a purpose standpoint, it is a map for formation.

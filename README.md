# Canon & Compass

Canon & Compass is a discipleship-oriented writing project built as a content-rich Astro site. Its aim is to help believers regain bearings in a loud age: to trace what is showing up in life back to what is forming it, and to re-root in the truth of Scripture.

## Purpose

Canon & Compass is not designed as a generic blog. It is a structured formation map.

The project is built around a few core convictions:

- discipleship should be concrete, not vague
- truth should lead to formation, not just information
- modern cultural pressures should be named honestly, without panic
- Scripture remains the governing authority for the whole project

The content is organized to help a reader move from confusion toward clarity:

- `The Clearing`: a quiet place for orientation, slowing down, and learning to see again
- `The Forests`: worldview diagnosis that names the climates shaping instincts and assumptions
- `Fruit Paths`: formation pathways that trace unwanted fruit back to hidden roots and toward healing truth
- `Foundations`: supporting depth through Canon Notes, Foundations of Discernment, Compass Points, and Pillars

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
- `src/pages/foundations`
- `src/pages/canon_notes`
- `src/pages/compass_points`
- `src/pages/pillars`
- `src/pages/foundations-of-discernment`

## Content Model

The main collections are defined in `src/content/config.ts`.

- `fruit-path`: core pathway entries with shift/tree/linking metadata
- `forests`: both forest overviews and forest series entries
- `canon_notes`: devotional or standalone reflections
- `foundations-of-discernment`: structured multi-day devotional series
- `compass_points`: cultural commentary pieces
- `pillars`: longer theological or philosophical essays
- `the-clearing`: reflective orientation pieces

This structure matters because the site is not just chronological. It is relational. Content is intentionally linked across pathways, worldviews, and foundations.

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

## Notes for Future Maintenance

- The site URL in `astro.config.mjs` still points to `https://astro-sphere-demo.vercel.app`. That should be updated to the real production domain when deployment is finalized.
- Content integrity depends on the schemas in `src/content/config.ts`. When adding new frontmatter fields, update the schema first.
- Search and listing behavior depend on consistent metadata such as `title`, `summary`, `date`, `tags`, and optional `pathwayId`.
- `README.md` is intended to explain both the ministry vision and the engineering structure, so future changes should preserve both perspectives.

## Why This Exists

A lot of Christian writing either stays abstract or becomes purely reactive. Canon & Compass is an attempt to do something harder: create a thoughtful, navigable discipleship framework that helps people interpret their lives, name the pressures shaping them, and return to truth with clarity.

From a technical standpoint, this repository is the delivery system.

From a purpose standpoint, it is a map for formation.

# AGENTS.md

## Purpose

This repo is not a generic blog. It is a structured Astro site for a formation-oriented reader journey:

1. `The Clearing` for reorientation
2. `The Forests` for worldview diagnosis
3. `Fruit Paths` for tracing visible fruit back to roots
4. `Foundations` for slower reinforcement and long-term formation

When making changes, preserve that flow. New pages, copy, and navigation should reinforce orientation and progression, not flatten the site into a chronological content dump.

## Stack

- `Astro 4` static site
- `MDX` content collections in `src/content`
- `TypeScript`
- `Tailwind CSS`
- `SolidJS` only for small interactive pieces, mainly search
- `Fuse.js` for client-side search
- `@astrojs/sitemap` and `@astrojs/rss`

`astro.config.mjs` sets `site` to `https://canonandcompass.com` and enables MDX, sitemap, Solid, and Tailwind.

## Project Shape

- `src/pages`: file-based routes
- `src/content`: MDX collections
- `src/layouts`: shared page/article wrappers
- `src/components`: reusable Astro and Solid UI
- `src/lib`: helpers and content typing
- `src/styles/global.css`: global typography, theme, and animation styles
- `public/`: static assets, SVG sprites, fonts, and small JS files

Path aliases come from `tsconfig.json` and Vite:

- `@components/*`
- `@layouts/*`
- `@lib/*`
- `@*` for general `src/*` imports like `@consts`

## Page Shell

Most pages follow this structure:

- `PageLayout.astro` wraps the document and injects `BaseHead`, `Header`, `Drawer`, and `Footer`
- `TopLayout.astro` provides the top spacing below the fixed header
- `BottomLayout.astro` provides the main content container

Article-style pages usually split into:

- `ArticleTopLayout.astro` for metadata, title, reading time, and back link
- `ArticleBottomLayout.astro` for rendered MDX and pathway cross-links

Global theme/layout behavior lives in:

- `src/styles/global.css`
- `public/js/theme.js`
- `public/js/scroll.js`
- `public/js/animate.js`
- `public/js/bg.js`

Do not add a second competing page shell unless there is a clear structural reason.

## Route Map

Core route groups:

- `/` home page with the primary entry points
- `/the-clearing`
- `/forests`
- `/fruit-path`
- `/foundations`
- `/canon_notes`
- `/compass_points`
- `/pillars`
- `/foundations-of-discernment`
- `/search`

Important route behavior:

- `src/pages/fruit-path/[slug].astro` renders each fruit-path entry through `FruitPathPage.astro`
- `src/pages/tree/[...slug].astro` is effectively a legacy alias and redirects tree slugs back into the matching fruit path
- `src/pages/forests/[...slug].astro` serves both forest overview pages and forest series entries from the same collection
- `src/pages/foundations/index.astro` is a conceptual hub, not the only foundation-like content route

## Content Model

All collection schemas live in `src/content/config.ts`. Update the schema first when adding frontmatter fields.

### `fruit-path`

This is the most structurally important collection.

Each entry is both content and a hub for related content. Frontmatter typically includes:

- top-level `title`, `summary`, `date`, `tags`
- optional `label`
- optional `pathwayId`
- `shift` object for the “bad fruit” side
- optional `tree` object for the truth-tree side
- optional linked `canonNote`, `compassPoint`, and `pillar`

Operational rules:

- `pathwayId` is the main cross-linking key; preserve it when renaming slugs
- MDX bodies usually include section anchors like `#symptom` and `#truth-tree`
- `PathwayLinks` and `PathwayCTAs` depend on consistent pathway metadata

### `forests`

This collection uses a dual schema:

- overview entries with `type: "forest"` such as `src/content/forests/naturalism.mdx`
- series entries under subfolders such as `src/content/forests/Naturalism/01-science-isnt-worldview.mdx`

The dynamic route distinguishes them with `isForestOverview()` and `isForestPathEntry()` from `src/lib/content.ts`.

If you add a new forest:

- create the overview MDX at the collection root
- create any trail/series entries in a matching subfolder
- make sure `series` names match exactly
- update the hard-coded cards in `src/pages/forests/index.astro`

### Other collections

- `the-clearing`: reflective orientation pieces
- `canon_notes`: shorter scripture-anchored reflections
- `compass_points`: cultural diagnosis pieces
- `pillars`: longer load-bearing essays
- `foundations-of-discernment`: structured devotional sequence

These are conventional article collections with shared article layouts.

## Site Flow Rules

The site is intentionally relational, not purely chronological.

Keep these principles intact:

- `Foundations` should read as support material, not the default first stop
- `Fruit Paths` should connect symptoms, truth-trees, and related resources
- `Forests` should feel like worldview environments, not generic categories
- `The Clearing` should remain the gentle re-entry point when the user lacks orientation

If you add new content, ask where it belongs in the formation map before deciding how to route or link it.

## Search

Search is assembled in `src/pages/search/index.astro` and rendered by the Solid component `src/components/Search.tsx`.

Current search indexing includes non-draft entries from:

- `fruit-path`
- `the-clearing`
- `canon_notes`
- `forests` path entries only, not forest overview pages
- `foundations-of-discernment`
- `compass_points`
- `pillars`

If a new collection or metadata field should be searchable, update both the search data assembly and the Fuse keys.

## Drafts and Listing Consistency

Most routes and listings explicitly filter `!entry.data.draft`.

When adding new indexes, feeds, or dynamic routes:

- filter drafts consistently
- keep sort order intentional, usually newest first for lists
- avoid exposing partial content accidentally

## Content Editing Conventions

- Preserve existing collection names exactly; some use hyphens and some use underscores
- Keep frontmatter valid YAML; do not introduce smart quotes in delimiters
- Preserve existing `pathwayId` values unless you also update all dependent links
- Reuse existing components like `Scripture`, `PastoralNote`, `TreeCallout`, `FalseTreeCallout`, and `PathwayCTAs` instead of recreating the same patterns inline

## UI and Styling Conventions

- Typography is based on the local `Atkinson` font loaded in `global.css`
- Light/dark themes are already established; preserve both
- The header is fixed and the top spacing assumptions are baked into `TopLayout`
- The home page has custom atmospheric visuals; avoid changing it casually without checking both themes

Prefer fitting into the existing design language over introducing a new visual system.

## Useful Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run typecheck`
- `npm run lint`

For most code/content changes, the minimum useful verification is:

1. `npm run typecheck`
2. `npm run build` if routes, content schemas, or imports changed

## High-Value Files

- `README.md`: product intent and structure
- `astro.config.mjs`: Astro integrations and site URL
- `src/consts.ts`: global labels, descriptions, and top-level nav items
- `src/content/config.ts`: source of truth for frontmatter
- `src/lib/content.ts`: forest typing helpers
- `src/layouts/FruitPathPage.astro`: fruit-path rendering shell
- `src/pages/forests/[...slug].astro`: mixed forest overview/entry routing
- `src/pages/foundations/index.astro`: explains the intended role of foundations in the overall journey

## Default Approach For Future Agents

Before changing behavior:

1. inspect the relevant collection schema
2. inspect the route that renders that collection
3. inspect any related linking component such as `PathwayLinks`
4. verify that the change still fits the site’s orientation-first flow

This repo rewards preserving structure and intent more than adding abstraction.

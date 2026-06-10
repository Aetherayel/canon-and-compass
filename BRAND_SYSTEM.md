# Canon & Compass Brand System

Canon & Compass should stay quiet, spare, and serious, but not visually anonymous.

The brand direction is:

- monochrome first
- warmed neutrals instead of pure black and white
- one restrained accent family
- slight section atmospheres without turning each section into a separate brand

## Core Palette

These are the canonical brand colors.

| Token | Hex | Use |
| --- | --- | --- |
| `ink` | `#14110F` | Primary text, headings, dark borders on light backgrounds |
| `night` | `#050505` | Dark theme background, hero darks, deep contrast surfaces |
| `paper` | `#FCFAF5` | Default light background; use instead of flat pure white for large surfaces |
| `bone` | `#F1ECDF` | Soft light alternate surface, card tint, subtle section contrast |
| `ash` | `#6F695F` | Secondary copy, subdued metadata, quiet borders and dividers |
| `starlight` | `#C3AB72` | Primary accent for highlights, stars, quiet emphasis, premium moments |
| `moss` | `#60735C` | Grounded support accent; use for restorative or truth-rooted moments |
| `fig` | `#6D5964` | Reflective support accent; use sparingly for editorial or contemplative emphasis |
| `pine` | `#31463E` | Forest undertone; section mood color, not a general-purpose UI color |
| `ember` | `#9B6B43` | Fruit-path undertone; use for warmth, turning points, and reordering moments |

## Usage Rules

The palette is intentionally narrow. Most of the site should still feel monochrome.

- Keep roughly 80 to 90 percent of the interface in `paper`, `bone`, `ink`, `night`, and white.
- Use `starlight` as the main accent, not as a flood color.
- Use `moss`, `fig`, `pine`, and `ember` as supporting tones, usually in borders, callouts, small labels, or subtle backgrounds.
- Avoid bright saturated colors unless there is a strong semantic reason.
- Prefer texture, contrast, spacing, and type hierarchy over adding more colors.

## Section Atmospheres

These are undertones, not separate brands.

### The Clearing

- Primary mood: quiet, spacious, soft contrast
- Lead neutrals: `paper`, `bone`, `ink`, `ash`
- Support accent: `starlight`
- Visual cue: mist, hush, stillness

Use The Clearing palette for:

- orientation pages
- gentle pauses
- invitation and witness language

### The Forests

- Primary mood: environmental, watchful, shaded
- Lead neutrals: `night`, `ink`, `ash`
- Support accents: `pine`, `moss`
- Visual cue: climate, canopy, atmosphere

Use The Forests palette for:

- worldview overviews
- climate and habitat metaphors
- diagnostic cards and section separators

### Fruit Paths

- Primary mood: honest, earthy, restorative
- Lead neutrals: `paper`, `ink`, `ash`
- Support accents: `ember`, `moss`, with occasional `starlight`
- Visual cue: soil, root, turning, reordering

Use Fruit Paths palette for:

- pathway entry points
- root and fruit diagrams
- movement from counterfeit formation toward truthful growth

### Foundations

- Primary mood: durable, load-bearing, steady
- Lead neutrals: `paper`, `bone`, `ink`, `ash`
- Support accents: `starlight`, `fig`
- Visual cue: structure, reinforcement, long obedience

Use Foundations palette for:

- support material
- reinforcing essays
- devotional and long-form study surfaces

## Implementation Notes

These tokens are available in `tailwind.config.mjs` and mirrored in `src/styles/global.css`.

Recommended defaults:

- light theme page background: `paper`
- dark theme page background: `night`
- primary text on light backgrounds: `ink`
- secondary text on light backgrounds: `ash`
- primary accent: `starlight`

Recommended UI patterns:

- use `bone` or low-opacity `starlight` for soft highlighted surfaces
- use `moss` for truth-tree or restoration-adjacent accents
- use `fig` for contemplative or editorial accents
- use `pine` and `ember` as section undertones, not as large blocks of branding

## What To Avoid

- pure black and pure white on every surface by default
- multiple loud accent colors competing on the same page
- making each route family feel like a different product
- gradients or glows that become more noticeable than the writing

Canon & Compass should feel like a witness-first formation map: clear, quiet, weight-bearing, and a little atmospheric.

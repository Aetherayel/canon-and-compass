import { defineCollection, z } from "astro:content"

const fruitPath = defineCollection({
  type: "content",
  schema: z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("tree"),
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()),
      pathwayId: z.string().optional(),
      prevHref: z.string().optional(),
      prevLabel: z.string().optional(),
      nextHref: z.string().optional(),
      nextLabel: z.string().optional(),
    }),
    z.object({
      kind: z.literal("shift"),
      title: z.string(),
      description: z.string(),
      fruit: z.string(),
      blurb: z.string(),
      systemLabel: z.string(),
      tags: z.array(z.string()),
      treeSlug: z.string().optional(),
      pathwayId: z.string().optional(),
      date: z.coerce.date(),
      prevHref: z.string().optional(),
      prevLabel: z.string().optional(),
      nextHref: z.string().optional(),
      nextLabel: z.string().optional(),
    }),
  ]),
})

const canonNotes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    series: z.string(),
    day: z.number().optional(),
    tags: z.array(z.string()),
    pathwayId: z.string().optional(),
    prevHref: z.string().optional(),
    prevLabel: z.string().optional(),
    nextHref: z.string().optional(),
    nextLabel: z.string().optional(),
  }),
})

const foundationsOfDiscernment = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    series: z.string(),
    day: z.number().optional(),
    tags: z.array(z.string()),
    prevHref: z.string().optional(),
    prevLabel: z.string().optional(),
    nextHref: z.string().optional(),
    nextLabel: z.string().optional(),
  }),
})

const forests = defineCollection({
  type: "content",
  schema: z.union([
    z.object({
      type: z.literal("forest"),
      title: z.string(),
      subtitle: z.string(),
      summary: z.string(),
      series: z.string(),
      climate: z.string(),
      canopy: z.array(z.string()),
      quietGospel: z.string(),
      fruit: z.array(z.string()),
      costStaying: z.string(),
      costLeaving: z.string(),
      pathIntro: z.string(),
      orientation: z.string(),
      orientationLink: z
        .object({
          label: z.string(),
          href: z.string(),
        })
        .optional(),
      draft: z.boolean().optional(),
    }),
    z.object({
      type: z.literal("entry").optional(),
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      series: z.string(),
      part: z.number().optional(),
      seriesSummary: z.string().optional(),
      tags: z.array(z.string()),
      pathwayId: z.string().optional(),
      prevHref: z.string().optional(),
      prevLabel: z.string().optional(),
      nextHref: z.string().optional(),
      nextLabel: z.string().optional(),
      draft: z.boolean().optional(),
    }),
  ]),
})

const compassPoints = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    pathwayId: z.string().optional(),
    prevHref: z.string().optional(),
    prevLabel: z.string().optional(),
    nextHref: z.string().optional(),
    nextLabel: z.string().optional(),
  }),
})

const pillars = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    pathwayId: z.string().optional(),
    prevHref: z.string().optional(),
    prevLabel: z.string().optional(),
    nextHref: z.string().optional(),
    nextLabel: z.string().optional(),
  }),
})

const theClearing = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    pathwayId: z.string().optional(),
    prevHref: z.string().optional(),
    prevLabel: z.string().optional(),
    nextHref: z.string().optional(),
    nextLabel: z.string().optional(),
  }),
})

// Pathway map that ties together related content across systems
const pathways = defineCollection({
  type: "data",
  schema: z.object({
    // Optional human label
    label: z.string().optional(),

    // Truth Tree
    tree: z
      .object({
        title: z.string().optional(),
        slug: z.string().optional(),
        href: z.string().optional(),
      })
      .optional(),

    // Counterfeit/False Tree (optional placeholder for future)
    counterfeitTree: z
      .object({
        title: z.string().optional(),
        slug: z.string().optional(),
        href: z.string().optional(),
      })
      .optional(),

    // Symptom / Tree Shift
    shift: z
      .object({
        title: z.string().optional(),
        slug: z.string().optional(),
        href: z.string().optional(),
      })
      .optional(),

    // Canon Note
    canonNote: z
      .object({
        title: z.string().optional(),
        slug: z.string().optional(),
        href: z.string().optional(),
      })
      .optional(),

    // Compass Point
    compassPoint: z
      .object({
        title: z.string().optional(),
        slug: z.string().optional(),
        href: z.string().optional(),
      })
      .optional(),

    // Pillar
    pillar: z
      .object({
        title: z.string().optional(),
        slug: z.string().optional(),
        href: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  "fruit-path": fruitPath,
  canon_notes: canonNotes,
  forests,
  compass_points: compassPoints,
  pillars,
  'the-clearing': theClearing,
  "foundations-of-discernment": foundationsOfDiscernment,
  pathways,
}

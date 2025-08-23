import { defineCollection, z } from "astro:content"

const tree = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
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
    draft: z.boolean().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
  }),
})

const compassPoints = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
  }),
})

const pillars = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
  }),
})

const symptoms = defineCollection({
  type: "data",
  schema: z.object({
    fruit: z.string(),
    blurb: z.string(),
    systemLabel: z.string(),
    systemHref: z.string(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()),
  }),
});

const treeShifts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
  }),
})

export const collections = {
  symptoms,
  tree,
  canon_notes: canonNotes,
  compass_points: compassPoints,
  pillars,
  "tree-shifts": treeShifts,
}


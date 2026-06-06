import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE } from "@consts"
import { isForestPathEntry } from "@lib/content"

type Context = {
  site: string
}

export async function GET(context: Context) {
  const posts = (await getCollection("fruit-path")).filter(
    (entry) => !entry.data.draft,
  )
  const clearing = (await getCollection("the-clearing")).filter((entry) => !entry.data.draft)
  const canonNotes = (await getCollection("canon_notes")).filter((entry) => !entry.data.draft)
  const forests = (await getCollection("forests"))
    .filter(isForestPathEntry)
    .filter((entry) => !entry.data.draft)
  const compassPoints = (await getCollection("compass_points")).filter((entry) => !entry.data.draft)
  const pillars = (await getCollection("pillars")).filter((entry) => !entry.data.draft)

  const items = [
    ...posts.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.date,
      link: `/fruit-path/${item.data.pathwayId ?? item.slug}/`,
    })),
    ...clearing.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.date,
      link: `/${item.collection}/${item.slug}/`,
    })),
    ...canonNotes.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.date,
      link: `/${item.collection}/${item.slug}/`,
    })),
    ...forests.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.date,
      link: `/forests/${item.slug}/`,
    })),
    ...compassPoints.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.date,
      link: `/${item.collection}/${item.slug}/`,
    })),
    ...pillars.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.date,
      link: `/${item.collection}/${item.slug}/`,
    })),
  ]
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items,
  })
}

import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE } from "@consts"

type Context = {
  site: string
}

export async function GET(context: Context) {
        const posts = await getCollection("tree")
    const clearing = await getCollection("the-clearing")
    const canonNotes = await getCollection("canon_notes")
    const compassPoints = await getCollection("compass_points")
    const pillars = await getCollection("pillars")

    const items = [...posts, ...clearing, ...canonNotes, ...compassPoints, ...pillars]

  items.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.date,
        link: item.collection === "tree"
          ? `/tree/${item.slug}/`
          : `/${item.collection}/${item.slug}/`,
    })),
  })
}

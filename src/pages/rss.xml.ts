import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE } from "@consts"

type Context = {
  site: string
}

export async function GET(context: Context) {
  const posts = (await getCollection("tree")).filter((entry) => !entry.data.draft)
  const clearing = (await getCollection("the-clearing")).filter((entry) => !entry.data.draft)
  const canonNotes = (await getCollection("canon_notes")).filter((entry) => !entry.data.draft)
  const forests = (await getCollection("forests")).filter(
    (entry) => entry.data.type !== "forest" && !entry.data.draft,
  )
  const compassPoints = (await getCollection("compass_points")).filter((entry) => !entry.data.draft)
  const pillars = (await getCollection("pillars")).filter((entry) => !entry.data.draft)

  const items = [...posts, ...clearing, ...canonNotes, ...forests, ...compassPoints, ...pillars]

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
          : item.collection === "forests"
            ? `/forests/${item.slug}/`
            : `/${item.collection}/${item.slug}/`,
    })),
  })
}

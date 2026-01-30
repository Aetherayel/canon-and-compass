import { formatDate, truncateText } from "@lib/utils"
import type { CollectionEntry } from "astro:content"

type Entry =
  | CollectionEntry<"fruit-path">
  | CollectionEntry<"the-clearing">
  | CollectionEntry<"canon_notes">
  | CollectionEntry<"forests">
  | CollectionEntry<"compass_points">
  | CollectionEntry<"pillars">
  | CollectionEntry<"foundations-of-discernment">

type Props = {
  entry: Entry
  pill?: boolean
}

export default function ArrowCard({ entry, pill }: Props) {
  const entryHref =
    entry.collection === "forests"
      ? `/forests/${entry.slug}`
      : entry.collection === "fruit-path"
        ? `/fruit-path/${(entry.data as any).pathwayId ?? entry.slug}`
        : `/${entry.collection}/${entry.slug}`
  const date = "date" in entry.data ? entry.data.date : null
  const tags =
    entry.collection === "fruit-path"
      ? ((entry.data as any)?.shift?.tags ?? [])
      : ("tags" in entry.data ? entry.data.tags : [])
  const displayTitle =
    entry.collection === "fruit-path"
      ? (entry.data as any)?.shift?.title ?? entry.data.title
      : entry.data.title
  const summary =
    entry.collection === "fruit-path"
      ? (entry.data as any)?.shift?.blurb ?? entry.data.summary
      : "summary" in entry.data
        ? entry.data.summary
        : "description" in entry.data
          ? entry.data.description
          : ""

  return (
    <a href={entryHref} class="group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out">
      <div class="w-full group-hover:text-black group-hover:dark:text-white blend">
        <div class="flex flex-wrap items-center gap-2">
          {pill && (
            <div class="text-sm capitalize px-2 py-0.5 rounded-full border border-black/15 dark:border-white/25">
              {entry.collection === "fruit-path"
                ? (entry.data as any).kind ?? "fruit path"
                : entry.collection === "forests"
                  ? "forests"
                  : entry.collection.replace(/[_-]/g, " ")}
            </div>
          )}
          {date && (
            <div class="text-sm uppercase">
              {formatDate(date)}
            </div>
          )}
        </div>

        {(
          entry.collection === "canon_notes" ||
          entry.collection === "foundations-of-discernment" ||
          entry.collection === "forests"
        ) && (
          <div class="text-sm uppercase mt-1">
            {entry.data.series}
            {entry.data.series.toLowerCase() !== "standalone" && (
              (() => {
                const part =
                  (entry as any).data.part ?? (entry as any).data.day;
                if (!part) return "";

                const label =
                  entry.collection === "canon_notes" ||
                  entry.collection === "foundations-of-discernment"
                    ? "Day"
                    : "Part";
                return ` - ${label} ${part}`;
              })()
            )}
          </div>
        )}

        <div class="font-semibold mt-3 text-black dark:text-white line-clamp-2">
          {displayTitle}
        </div>

        <div class="text-sm line-clamp-2">
          {summary}
        </div>
        {tags.length > 0 && (
          <ul class="flex flex-wrap mt-2 gap-1">
            {tags.map((tag: string) => (
              <li class="text-xs uppercase py-0.5 px-2 rounded bg-black/5 dark:bg-white/20 text-black/75 dark:text-white/75">
                {truncateText(tag, 20)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white">
        <line x1="5" y1="12" x2="19" y2="12" class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
        <polyline points="12 5 19 12 12 19" class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
      </svg>
    </a>
  )
}


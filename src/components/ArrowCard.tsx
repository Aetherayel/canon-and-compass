import { formatDate, truncateText } from "@lib/utils"
import type { CardEntry } from "@lib/cardEntries"

type Props = {
  entry: CardEntry
  pill?: boolean
}

function getAccentClasses(collection: CardEntry["collection"]) {
  switch (collection) {
    case "fruit-path":
      return {
        bar: "bg-gradient-to-b from-ember/80 to-moss/80 dark:from-ember/70 dark:to-moss/70",
        card: "hover:border-ember/35 dark:hover:border-ember/30",
        arrow: "group-hover:text-ember dark:group-hover:text-ember",
        pill: "border-ember/30 bg-ember/10 text-ink dark:border-ember/25 dark:bg-ember/10 dark:text-bone",
        tag: "border-ember/20 bg-ember/10 text-ash dark:border-ember/20 dark:bg-ember/10 dark:text-zinc-300",
      }
    case "forests":
      return {
        bar: "bg-gradient-to-b from-pine/80 to-moss/80 dark:from-pine/70 dark:to-moss/70",
        card: "hover:border-pine/35 dark:hover:border-pine/30",
        arrow: "group-hover:text-pine dark:group-hover:text-pine",
        pill: "border-pine/30 bg-pine/10 text-ink dark:border-pine/25 dark:bg-pine/10 dark:text-bone",
        tag: "border-pine/20 bg-pine/10 text-ash dark:border-pine/20 dark:bg-pine/10 dark:text-zinc-300",
      }
    case "compass_points":
      return {
        bar: "bg-fig/75 dark:bg-fig/65",
        card: "hover:border-fig/35 dark:hover:border-fig/30",
        arrow: "group-hover:text-fig dark:group-hover:text-fig",
        pill: "border-fig/30 bg-fig/10 text-ink dark:border-fig/25 dark:bg-fig/10 dark:text-bone",
        tag: "border-fig/20 bg-fig/10 text-ash dark:border-fig/20 dark:bg-fig/10 dark:text-zinc-300",
      }
    case "pillars":
      return {
        bar: "bg-moss/75 dark:bg-moss/65",
        card: "hover:border-moss/35 dark:hover:border-moss/30",
        arrow: "group-hover:text-moss dark:group-hover:text-moss",
        pill: "border-moss/30 bg-moss/10 text-ink dark:border-moss/25 dark:bg-moss/10 dark:text-bone",
        tag: "border-moss/20 bg-moss/10 text-ash dark:border-moss/20 dark:bg-moss/10 dark:text-zinc-300",
      }
    case "foundations-of-discernment":
      return {
        bar: "bg-moss/75 dark:bg-moss/65",
        card: "hover:border-moss/35 dark:hover:border-moss/30",
        arrow: "group-hover:text-moss dark:group-hover:text-moss",
        pill: "border-moss/30 bg-moss/10 text-ink dark:border-moss/25 dark:bg-moss/10 dark:text-bone",
        tag: "border-moss/20 bg-moss/10 text-ash dark:border-moss/20 dark:bg-moss/10 dark:text-zinc-300",
      }
    default:
      return {
        bar: "bg-starlight/75 dark:bg-starlight/65",
        card: "hover:border-starlight/35 dark:hover:border-starlight/30",
        arrow: "group-hover:text-starlight dark:group-hover:text-starlight",
        pill: "border-starlight/30 bg-starlight/10 text-ink dark:border-starlight/25 dark:bg-starlight/10 dark:text-bone",
        tag: "border-starlight/20 bg-starlight/10 text-ash dark:border-starlight/20 dark:bg-starlight/10 dark:text-zinc-300",
      }
  }
}

export default function ArrowCard({ entry, pill }: Props) {
  const date = entry.date ?? null
  const tags = entry.tags
  const displayTitle = entry.title
  const summary = entry.summary
  const accentClasses = getAccentClasses(entry.collection)

  return (
    <a href={entry.href} class={`group flex items-center gap-3 rounded-lg border border-ash/20 bg-paper/70 p-4 transition-colors duration-300 ease-in-out hover:bg-bone/70 dark:border-bone/15 dark:bg-zinc-900/70 dark:hover:bg-white/10 ${accentClasses.card}`}>
      <div class={`h-auto w-1 shrink-0 self-stretch rounded-full ${accentClasses.bar}`}></div>
      <div class="blend w-full text-ash dark:text-zinc-300">
        <div class="flex flex-wrap items-center gap-2">
          {pill && (
            <div class={`rounded-full border px-2 py-0.5 text-sm capitalize ${accentClasses.pill}`}>
              {entry.collection === "fruit-path"
                ? "fruit path"
                : entry.collection === "forests"
                  ? "forests"
                  : entry.collection.replace(/[_-]/g, " ")}
            </div>
          )}
          {date && (
            <div class="text-sm uppercase text-ash dark:text-zinc-400">
              {formatDate(date)}
            </div>
          )}
        </div>

        {(
          entry.collection === "canon_notes" ||
          entry.collection === "foundations-of-discernment" ||
          entry.collection === "forests"
        ) && (
          <div class="mt-1 text-sm uppercase text-ash dark:text-zinc-400">
            {entry.series}
            {entry.series && entry.series.toLowerCase() !== "standalone" && (
              (() => {
                if (!entry.seriesPart) return "";

                const label =
                  entry.collection === "canon_notes" ||
                  entry.collection === "foundations-of-discernment"
                    ? "Day"
                    : "Part";
                return ` - ${label} ${entry.seriesPart}`;
              })()
            )}
          </div>
        )}

        <div class="mt-3 line-clamp-2 font-semibold text-ink dark:text-bone">
          {displayTitle}
        </div>

        <div class="text-sm line-clamp-2">
          {summary}
        </div>
        {tags.length > 0 && (
          <ul class="flex flex-wrap mt-2 gap-1">
            {tags.map((tag: string) => (
              <li class={`rounded border px-2 py-0.5 text-xs uppercase ${accentClasses.tag}`}>
                {truncateText(tag, 20)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class={`stroke-current text-ash transition-colors duration-300 ease-in-out ${accentClasses.arrow}`}>
        <line x1="5" y1="12" x2="19" y2="12" class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
        <polyline points="12 5 19 12 12 19" class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
      </svg>
    </a>
  )
}


import type { CollectionEntry } from "astro:content"
import { Show, createEffect, createSignal, For, onCleanup, onMount } from "solid-js"
import Fuse from "fuse.js"
import ArrowCard from "@components/ArrowCard"
import { cn } from "@lib/utils"
import SearchBar from "@components/SearchBar"

type Props = {
  entry_name: string
  tags: string[]
  data: (
    | CollectionEntry<'tree'>
    | CollectionEntry<'the-clearing'>
    | CollectionEntry<'canon_notes'>
    | CollectionEntry<'compass_points'>
    | CollectionEntry<'pillars'>
    | CollectionEntry<'foundations-of-discernment'>
  )[]
}

export default function SearchCollection({ entry_name, data, tags }: Props) {
  const coerced = data.map((entry) => entry as CollectionEntry<'tree'>);

  const [query, setQuery] = createSignal("");
  const [filter, setFilter] = createSignal(new Set<string>())
  const [collection, setCollection] = createSignal<CollectionEntry<'tree'>[]>([])
  const [descending, setDescending] = createSignal(false);
  const [tagsOpen, setTagsOpen] = createSignal(false);

  const fuse = new Fuse(coerced, {
    keys: ["slug", "data.title", "data.summary", "data.tags"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.4,
  })

  createEffect(() => {
    const filtered = (query().length < 2
      ? coerced
      : fuse.search(query()).map((result) => result.item)
    ).filter((entry) =>
      Array.from(filter()).every((value) =>
        entry.data.tags.some((tag: string) =>
          tag.toLowerCase() === String(value).toLowerCase()
        )
      )
    );
    setCollection(descending() ? filtered.toReversed() : filtered)
  })

  function toggleDescending() {
    setDescending(!descending())
  }

  function toggleTags() {
    setTagsOpen((prev) => !prev)
  }

  function toggleTag(tag: string) {
    setFilter((prev) =>
      new Set(prev.has(tag)
        ? [...prev].filter((t) => t !== tag)
        : [...prev, tag]
      )
    )
  }

  function clearFilters() {
    setFilter(new Set<string>());
  }

  const onSearchInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    setQuery(target.value)
  }

  onMount(() => {
    const wrapper = document.getElementById("search-collection-wrapper");
    if (wrapper) {
      wrapper.style.minHeight = "unset";
    }

    const mediaQuery = window.matchMedia("(min-width: 640px)");
    setTagsOpen(mediaQuery.matches);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setTagsOpen(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMediaChange);
      onCleanup(() => mediaQuery.removeEventListener("change", handleMediaChange));
    } else {
      mediaQuery.addListener(handleMediaChange);
      onCleanup(() => mediaQuery.removeListener(handleMediaChange));
    }
  })

  return (
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Control Panel*/}
      <div class="col-span-3 sm:col-span-1">
        <div class="sticky top-24 mt-7">
          {/* Search Bar */}
          <SearchBar onSearchInput={onSearchInput} query={query} setQuery={setQuery} placeholderText={`Search ${entry_name}`} />
          {/* Tag Filters */}
          <div class="mt-4">
            <div class="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={toggleTags}
                class="flex items-center gap-2 text-sm font-semibold uppercase text-black dark:text-white"
                aria-expanded={tagsOpen() ? "true" : "false"}
                aria-controls="tag-filter-list"
              >
                <span>Tags</span>
                <svg
                  class={cn(
                    "size-4 transition-transform duration-200 ease-in-out",
                    tagsOpen() ? "-rotate-180" : "rotate-0",
                  )}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {filter().size > 0 && (
                <button
                  onClick={clearFilters}
                  class="flex items-center justify-center rounded-full p-2 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
                  aria-label="Clear tag filters"
                >
                  <svg class="size-4">
                    <use href={`/ui.svg#x`} />
                  </svg>
                </button>
              )}
            </div>
            <Show when={tagsOpen()}>
              <ul id="tag-filter-list" class="mt-2 flex flex-wrap sm:flex-col gap-1.5">
                <For each={tags}>
                  {(tag) => (
                    <li class="sm:w-full">
                      <button
                        onClick={() => toggleTag(tag)}
                        class={cn(
                          "w-full px-2 py-1 rounded",
                          "flex gap-2 items-center",
                          "bg-black/5 dark:bg-white/10",
                          "hover:bg-black/10 hover:dark:bg-white/15",
                          "transition-colors duration-300 ease-in-out",
                          filter().has(tag) && "text-black dark:text-white"
                        )}
                      >
                        <svg
                          class={cn(
                            "shrink-0 size-5 fill-black/50 dark:fill-white/50",
                            "transition-colors duration-300 ease-in-out",
                            filter().has(tag) && "fill-black dark:fill-white"
                          )}
                        >
                          <use
                            href={`/ui.svg#square`}
                            class={cn(!filter().has(tag) ? "block" : "hidden")}
                          />
                          <use
                            href={`/ui.svg#square-check`}
                            class={cn(filter().has(tag) ? "block" : "hidden")}
                          />
                        </svg>

                        <span class="truncate block min-w-0 pt-[2px]">
                          {tag}
                        </span>
                      </button>
                    </li>
                  )}
                </For>
              </ul>
            </Show>
          </div>
        </div>
      </div>
      {/* Posts */}
      <div class="col-span-3 sm:col-span-2">
        <div class="flex flex-col">
          {/* Info Bar */}
          <div class='flex justify-between flex-row mb-2'>
            <div class="text-sm uppercase">
              SHOWING {collection().length} OF {data.length} {entry_name}
            </div>
            <button onClick={toggleDescending} class='flex flex-row gap-1 stroke-neutral-400 dark:stroke-neutral-500 hover:stroke-neutral-600 hover:dark:stroke-neutral-300 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 hover:dark:text-neutral-300'>
              <div class="text-sm uppercase">
                {descending() ? "DESCENDING" : "ASCENDING"}
              </div>
              <svg
                class="size-5 left-2 top-[0.45rem]"
              >
                <use href={`/ui.svg#sort-descending`} class={descending() ? "block" : "hidden"}></use>
                <use href={`/ui.svg#sort-ascending`} class={descending() ? "hidden" : "block"}></use>
              </svg>
            </button>
          </div>
          <ul class="flex flex-col gap-3">
            {collection().map((entry) => (
              <li>
                <ArrowCard entry={entry} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

import type { CollectionEntry } from "astro:content";

export type ForestEntry = CollectionEntry<"forests">;
export type ForestOverviewEntry = ForestEntry & {
  data: Extract<ForestEntry["data"], { type: "forest" }>;
};
export type ForestPathEntry = ForestEntry & {
  data: Exclude<ForestEntry["data"], { type: "forest" }>;
};

export type ArticleEntry =
  | CollectionEntry<"canon_notes">
  | CollectionEntry<"compass_points">
  | CollectionEntry<"foundations-of-discernment">
  | CollectionEntry<"pillars">
  | CollectionEntry<"the-clearing">
  | ForestPathEntry;

export function isForestOverview(entry: ForestEntry): entry is ForestOverviewEntry {
  return "type" in entry.data && entry.data.type === "forest";
}

export function isForestPathEntry(entry: ForestEntry): entry is ForestPathEntry {
  return !isForestOverview(entry);
}

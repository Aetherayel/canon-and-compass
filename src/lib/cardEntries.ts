import type { CollectionEntry } from "astro:content";
import { isForestOverview, type ForestPathEntry } from "@lib/content";

export type CardEntry = {
  collection:
    | "fruit-path"
    | "the-clearing"
    | "canon_notes"
    | "foundations-of-discernment"
    | "forests"
    | "compass_points"
    | "pillars";
  slug: string;
  href: string;
  title: string;
  summary: string;
  tags: string[];
  date?: Date;
  series?: string;
  seriesPart?: number;
  searchText: string[];
};

type SupportedEntry =
  | CollectionEntry<"fruit-path">
  | CollectionEntry<"the-clearing">
  | CollectionEntry<"canon_notes">
  | CollectionEntry<"foundations-of-discernment">
  | CollectionEntry<"forests">
  | CollectionEntry<"compass_points">
  | CollectionEntry<"pillars">;

type StandardEntry = Exclude<SupportedEntry, CollectionEntry<"forests"> | CollectionEntry<"fruit-path">>;

export function toCardEntry(entry: SupportedEntry): CardEntry {
  if (entry.collection === "fruit-path") {
    return {
      collection: entry.collection,
      slug: entry.slug,
      href: `/fruit-path/${entry.data.pathwayId ?? entry.slug}`,
      title: entry.data.shift.title,
      summary: entry.data.shift.blurb,
      tags: entry.data.shift.tags,
      date: entry.data.date,
      searchText: [
        entry.slug,
        entry.data.title,
        entry.data.summary,
        entry.data.shift.title,
        entry.data.shift.description,
        entry.data.shift.blurb,
        ...entry.data.shift.fruit,
        ...entry.data.shift.tags,
      ],
    };
  }

  if (entry.collection === "forests") {
    if (isForestOverview(entry)) {
      throw new Error(`Forest overview "${entry.slug}" cannot be rendered as a card entry.`);
    }

    const forestEntry = entry as ForestPathEntry;
    return {
      collection: forestEntry.collection,
      slug: forestEntry.slug,
      href: `/forests/${forestEntry.slug}`,
      title: forestEntry.data.title,
      summary: forestEntry.data.summary,
      tags: forestEntry.data.tags,
      date: forestEntry.data.date,
      series: forestEntry.data.series,
      seriesPart: forestEntry.data.part,
      searchText: [
        forestEntry.slug,
        forestEntry.data.title,
        forestEntry.data.summary,
        forestEntry.data.series,
        ...forestEntry.data.tags,
      ],
    };
  }

  const standardEntry = entry as StandardEntry;
  const seriesPart =
    standardEntry.collection === "canon_notes" || standardEntry.collection === "foundations-of-discernment"
      ? standardEntry.data.day
      : undefined;

  return {
    collection: standardEntry.collection,
    slug: standardEntry.slug,
    href: `/${standardEntry.collection}/${standardEntry.slug}`,
    title: standardEntry.data.title,
    summary: standardEntry.data.summary,
    tags: standardEntry.data.tags,
    date: standardEntry.data.date,
    series: "series" in standardEntry.data ? standardEntry.data.series : undefined,
    seriesPart,
    searchText: [
      standardEntry.slug,
      standardEntry.data.title,
      standardEntry.data.summary,
      ...standardEntry.data.tags,
      ...("series" in standardEntry.data && standardEntry.data.series ? [standardEntry.data.series] : []),
    ],
  };
}

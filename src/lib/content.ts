import { getCollection, type CollectionEntry } from "astro:content";

export type ForestEntry = CollectionEntry<"forests">;
export type ForestOverviewEntry = ForestEntry & {
  data: Extract<ForestEntry["data"], { type: "forest" }>;
};
export type ForestPathEntry = ForestEntry & {
  data: Exclude<ForestEntry["data"], { type: "forest" }>;
};
export type FruitPathEntry = CollectionEntry<"fruit-path">;

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

export function getPathwayId(entry: FruitPathEntry) {
  return entry.data.pathwayId ?? entry.slug;
}

export async function getPublishedForestOverviews() {
  const forests = await getCollection("forests");
  return forests.filter(
    (entry): entry is ForestOverviewEntry =>
      isForestOverview(entry) && !entry.data.draft,
  );
}

export async function getPublishedFruitPaths() {
  const pathways = await getCollection("fruit-path");
  return pathways.filter((entry) => !entry.data.draft);
}

export async function getRelatedPathwaysForForest({
  forestSlug,
  series,
}: {
  forestSlug?: string;
  series?: string;
}) {
  const [forests, pathways] = await Promise.all([
    getPublishedForestOverviews(),
    getPublishedFruitPaths(),
  ]);

  const forest = forestSlug
    ? forests.find((entry) => entry.slug === forestSlug)
    : series
      ? forests.find((entry) => entry.data.series === series)
      : undefined;

  if (!forest?.data.relatedPathways?.length) return [];

  const pathwaysById = new Map(
    pathways.map((entry) => [getPathwayId(entry), entry] as const),
  );

  return forest.data.relatedPathways.flatMap((pathwayId) => {
    const match = pathwaysById.get(pathwayId);
    return match ? [match] : [];
  });
}

export async function getRelatedForestsForPathway(pathwayId: string) {
  const forests = await getPublishedForestOverviews();

  return forests.filter((entry) =>
    entry.data.relatedPathways?.includes(pathwayId),
  );
}

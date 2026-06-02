import { getCollection } from "astro:content";
import { getArticleCategoryTitle } from "@/lib/content/article-categories";
import { getMobilePlanDisplayCopy, getMobilePlanDisplayName, joinMobilePlanCopyList } from "@/lib/content/mobile-plan-copy";
import { localizePath, type Locale } from "@/lib/i18n";

export type SearchEntryType = "article" | "place" | "mobile_plan" | "area" | "tool";

export interface SearchEntry {
  id: string;
  type: SearchEntryType;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  updatedAt: string;
  searchText: string;
}

export interface SearchIndex {
  locale: Locale;
  count: number;
  items: SearchEntry[];
}

const typeOrder: Record<SearchEntryType, number> = {
  article: 1,
  tool: 2,
  mobile_plan: 3,
  area: 4,
  place: 5
};

function dateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function compact(values: Array<string | string[] | undefined>): string[] {
  return values.flatMap((value) => {
    if (!value) return [];
    return Array.isArray(value) ? value.filter(Boolean) : [value];
  });
}

function buildSearchText(parts: Array<string | string[] | undefined>): string {
  return compact(parts).join(" ");
}

function sortSearchEntries(entries: SearchEntry[]): SearchEntry[] {
  return entries.sort((a, b) => {
    const typeDifference = typeOrder[a.type] - typeOrder[b.type];
    if (typeDifference !== 0) return typeDifference;
    return a.title.localeCompare(b.title);
  });
}

export async function getSearchEntries(locale: Locale): Promise<SearchEntry[]> {
  const entries: SearchEntry[] = [];

  const articles = await getCollection("articles", ({ data }) => data.locale === locale && !data.draft);
  for (const article of articles) {
    const categoryTag = article.data.category === "mobile" ? getArticleCategoryTitle(locale, article.data.category) : article.data.category;
    const tags = [categoryTag, ...article.data.tags];
    entries.push({
      id: `article:${article.id}`,
      type: "article",
      title: article.data.title,
      description: article.data.description,
      url: localizePath(locale, `/articles/${article.data.slug}`),
      category: article.data.category,
      tags,
      updatedAt: dateOnly(article.data.updatedAt),
      searchText: buildSearchText([article.data.title, article.data.description, article.data.category, article.data.tags])
    });
  }

  const places = await getCollection("places", ({ data }) => data.status === "published");
  for (const place of places) {
    const tags = compact([
      place.data.category,
      place.data.prefecture,
      place.data.city,
      place.data.area,
      place.data.station,
      place.data.priceRange,
      place.data.paymentMethods
    ]);
    entries.push({
      id: `place:${place.id}`,
      type: "place",
      title: place.data.name,
      description: `${place.data.category} · ${place.data.prefecture} ${place.data.city} ${place.data.area} · ${place.data.station}`,
      url: localizePath(locale, `/places/${place.data.slug}`),
      category: place.data.category,
      tags,
      updatedAt: dateOnly(place.data.updatedAt),
      searchText: buildSearchText([place.data.name, place.data.category, place.data.prefecture, place.data.city, place.data.area, place.data.station, place.data.paymentMethods])
    });
  }

  const mobilePlans = await getCollection("mobile-plans");
  for (const plan of mobilePlans) {
    const displayCopy = getMobilePlanDisplayCopy(plan.data, locale);
    const tags = compact([plan.data.provider, displayCopy.planName, displayCopy.dataAmount, displayCopy.paymentRequirements, displayCopy.recommendedFor]);
    entries.push({
      id: `mobile_plan:${plan.id}`,
      type: "mobile_plan",
      title: getMobilePlanDisplayName(plan.data, displayCopy),
      description: `${displayCopy.dataAmount} · ${displayCopy.monthlyPrice} · ${joinMobilePlanCopyList(locale, displayCopy.recommendedFor)}`,
      url: localizePath(locale, `/mobile/${plan.data.slug}`),
      category: "mobile",
      tags,
      updatedAt: dateOnly(plan.data.lastCheckedAt),
      searchText: buildSearchText([plan.data.provider, displayCopy.planName, displayCopy.monthlyPrice, displayCopy.dataAmount, displayCopy.paymentRequirements, displayCopy.pros, displayCopy.cons, displayCopy.recommendedFor, displayCopy.notes])
    });
  }

  const areas = await getCollection("areas");
  for (const area of areas) {
    const tags = compact([area.data.prefecture, area.data.city, area.data.stations, area.data.rentLevel, area.data.foodLevel, area.data.commuteConvenience, area.data.quietness, area.data.recommendedFor]);
    entries.push({
      id: `area:${area.id}`,
      type: "area",
      title: area.data.title,
      description: area.data.summary,
      url: localizePath(locale, `/areas/${area.data.slug}`),
      category: "area",
      tags,
      updatedAt: dateOnly(area.data.lastCheckedAt),
      searchText: buildSearchText([area.data.title, area.data.summary, area.data.prefecture, area.data.city, area.data.stations, area.data.rentLevel, area.data.foodLevel, area.data.commuteConvenience, area.data.quietness, area.data.recommendedFor, area.data.warnings, area.data.notes])
    });
  }

  const tools = await getCollection("tools", ({ data }) => data.status === "published");
  for (const tool of tools) {
    const sectionTitles = tool.data.sections.map((section) => section.title[locale]);
    const sectionItems = tool.data.sections.flatMap((section) => section.items.map((item) => item[locale]));
    entries.push({
      id: `tool:${tool.id}`,
      type: "tool",
      title: tool.data.title[locale],
      description: tool.data.description[locale],
      url: localizePath(locale, `/tools/${tool.data.slug}`),
      category: "tool",
      tags: sectionTitles,
      updatedAt: dateOnly(tool.data.lastCheckedAt),
      searchText: buildSearchText([tool.data.title[locale], tool.data.description[locale], sectionTitles, sectionItems, tool.data.notes.map((note) => note[locale])])
    });
  }

  return sortSearchEntries(entries);
}

export async function getSearchIndex(locale: Locale): Promise<SearchIndex> {
  const items = await getSearchEntries(locale);
  return {
    locale,
    count: items.length,
    items
  };
}

export async function searchIndexResponse(locale: Locale): Promise<Response> {
  return new Response(JSON.stringify(await getSearchIndex(locale), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}

import type { Locale } from "./locale";

export type LocalizedText = Record<Locale, string>;

export interface ToolSection {
  id: string;
  title: LocalizedText;
  items: LocalizedText[];
}

export interface Tool {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  status: "planned" | "draft" | "published";
  lastCheckedAt: string;
  sourceNote: LocalizedText;
  notes: LocalizedText[];
  sections: ToolSection[];
}

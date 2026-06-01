import type { Locale } from "./locale";

export interface ArticleSourceLink {
  label: string;
  url: string;
  note?: string;
}

export interface Article {
  id: string;
  slug: string;
  locale: Locale;
  translationKey: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  sourceLinks: ArticleSourceLink[];
  draft: boolean;
}

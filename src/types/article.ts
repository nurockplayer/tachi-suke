import type { Locale } from "./locale";

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
  draft: boolean;
}

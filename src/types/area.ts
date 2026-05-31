export interface AreaGuide {
  id: string;
  slug: string;
  locale?: string;
  translationKey?: string;
  title: string;
  summary: string;
  prefecture: string;
  city: string;
  stations: string[];
  rentLevel?: string;
  foodLevel?: string;
  commuteConvenience?: string;
  quietness?: string;
  recommendedFor: string[];
  warnings: string[];
  lastCheckedAt: string;
  notes: string[];
}

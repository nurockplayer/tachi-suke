import type { Locale } from "./locale";

export interface UserProfile {
  id: string;
  displayName?: string;
  preferredLocale?: Locale;
  createdAt: string;
  updatedAt: string;
}

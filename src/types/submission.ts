import type { Locale } from "./locale";

export type ModerationStatus = "pending_review" | "approved" | "rejected" | "needs_more_info";

export interface PlaceSubmission {
  id: string;
  userId?: string;
  submissionLocale: Locale;
  placeName: string;
  category: string;
  prefecture: string;
  city: string;
  area?: string;
  station?: string;
  googleMapUrl?: string;
  officialUrl?: string;
  recommendationReason: string;
  priceRange?: string;
  soloFriendly?: string;
  nonSmokingStatus?: string;
  japaneseDifficulty?: string;
  paymentMethods: string[];
  submitterNickname?: string;
  submitterEmail?: string;
  status: ModerationStatus;
  moderatorNote?: string;
  createdAt: string;
  updatedAt: string;
}

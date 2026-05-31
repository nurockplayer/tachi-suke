export type SoloFriendly = "yes" | "maybe" | "no" | "unknown";
export type NonSmokingStatus = "confirmed_non_smoking" | "separated_smoking_area" | "smoking_allowed" | "unknown";
export type JapaneseDifficulty = "easy" | "normal" | "hard" | "unknown";
export type PlaceSource = "editor" | "user_submission" | "official";
export type PlaceStatus = "draft" | "pending_review" | "published" | "rejected" | "archived";

export interface Place {
  id: string;
  slug: string;
  name: string;
  category: string;
  prefecture: string;
  city: string;
  area: string;
  station: string;
  googleMapUrl?: string;
  officialUrl?: string;
  tabelogUrl?: string;
  instagramUrl?: string;
  priceRange: string;
  soloFriendly: SoloFriendly;
  nonSmokingStatus: NonSmokingStatus;
  japaneseDifficulty: JapaneseDifficulty;
  paymentMethods: string[];
  source: PlaceSource;
  status: PlaceStatus;
  createdAt: string;
  updatedAt: string;
}

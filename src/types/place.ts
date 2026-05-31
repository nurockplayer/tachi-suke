export type PlaceStatus = "draft" | "published" | "archived";

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
  soloFriendly: "yes" | "mixed" | "no" | "unknown";
  nonSmokingStatus: "yes" | "partial" | "no" | "unknown";
  japaneseDifficulty: "low" | "medium" | "high" | "unknown";
  paymentMethods: string[];
  source: "editorial" | "community" | "official";
  status: PlaceStatus;
  createdAt: string;
  updatedAt: string;
}

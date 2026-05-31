export type FavoriteTargetType = "article" | "place" | "mobile_plan" | "area" | "tool";

export interface Favorite {
  id: string;
  userId: string;
  targetType: FavoriteTargetType;
  targetId: string;
  createdAt: string;
}

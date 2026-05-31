import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const localeSchema = z.enum(["zh-tw", "en", "ja", "ko"]);

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    locale: localeSchema,
    translationKey: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    draft: z.boolean().default(false)
  })
});

const places = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/places" }),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    category: z.string(),
    prefecture: z.string(),
    city: z.string(),
    area: z.string(),
    station: z.string(),
    googleMapUrl: z.url().optional(),
    officialUrl: z.url().optional(),
    priceRange: z.string(),
    soloFriendly: z.enum(["yes", "maybe", "no", "unknown"]),
    nonSmokingStatus: z.enum(["confirmed_non_smoking", "separated_smoking_area", "smoking_allowed", "unknown"]),
    japaneseDifficulty: z.enum(["easy", "normal", "hard", "unknown"]),
    paymentMethods: z.array(z.string()),
    source: z.enum(["editor", "user_submission", "official"]),
    status: z.enum(["draft", "pending_review", "published", "rejected", "archived"]),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
  })
});

const areas = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/areas" }),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    locale: localeSchema.optional(),
    translationKey: z.string().optional(),
    prefecture: z.string(),
    city: z.string(),
    stations: z.array(z.string()).default([]),
    rentLevel: z.string().optional(),
    foodLevel: z.string().optional(),
    commuteConvenience: z.string().optional(),
    quietness: z.string().optional(),
    recommendedFor: z.array(z.string()).default([]),
    warnings: z.array(z.string()).default([])
  })
});

const mobilePlans = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/mobile-plans" }),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    provider: z.string(),
    planName: z.string(),
    monthlyPrice: z.string(),
    dataAmount: z.string(),
    paymentRequirements: z.array(z.string()).default([]),
    residenceCardRequired: z.boolean(),
    creditCardRequired: z.boolean(),
    pros: z.array(z.string()).default([]),
    cons: z.array(z.string()).default([]),
    recommendedFor: z.array(z.string()).default([])
  })
});

const tools = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/tools" }),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.enum(["planned", "draft", "published"]).default("planned")
  })
});

export const collections = {
  articles,
  areas,
  places,
  "mobile-plans": mobilePlans,
  tools
};

export const locales = ["zh-tw", "en", "ja", "ko"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh-tw";

export const fallbackLocales: Locale[] = ["en", "zh-tw"];

export const localeNames: Record<Locale, string> = {
  "zh-tw": "繁體中文",
  en: "English",
  ja: "日本語",
  ko: "한국어"
};

export const htmlLangByLocale: Record<Locale, string> = {
  "zh-tw": "zh-Hant-TW",
  en: "en",
  ja: "ja",
  ko: "ko"
};

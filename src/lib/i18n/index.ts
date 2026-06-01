import {
  defaultLocale,
  fallbackLocales,
  htmlLangByLocale,
  localeNames,
  locales,
  ogLocaleByLocale,
  type Locale
} from "@/types/locale";

export { defaultLocale, fallbackLocales, htmlLangByLocale, localeNames, locales, ogLocaleByLocale };
export type { Locale };

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getSafeLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function localizePath(locale: Locale, path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized === "/" ? "/" : normalized}`;
}

export const navItems: Record<Locale, Array<{ href: string; label: string }>> = {
  "zh-tw": [
    { href: "/articles", label: "文章" },
    { href: "/areas", label: "地區" },
    { href: "/places", label: "店家" },
    { href: "/mobile", label: "手機" },
    { href: "/tools", label: "工具" },
    { href: "/search", label: "搜尋" }
  ],
  en: [
    { href: "/articles", label: "Articles" },
    { href: "/areas", label: "Areas" },
    { href: "/places", label: "Places" },
    { href: "/mobile", label: "Mobile" },
    { href: "/tools", label: "Tools" },
    { href: "/search", label: "Search" }
  ],
  ja: [
    { href: "/articles", label: "記事" },
    { href: "/areas", label: "エリア" },
    { href: "/places", label: "お店" },
    { href: "/mobile", label: "携帯" },
    { href: "/tools", label: "ツール" },
    { href: "/search", label: "検索" }
  ],
  ko: [
    { href: "/articles", label: "글" },
    { href: "/areas", label: "지역" },
    { href: "/places", label: "장소" },
    { href: "/mobile", label: "휴대폰" },
    { href: "/tools", label: "도구" },
    { href: "/search", label: "검색" }
  ]
};

export const homeCopy = {
  "zh-tw": {
    title: "幫你在日本站穩生活的多語系決策助手。",
    description: "用比較、清單與生活筆記，幫你處理手機門號、租屋、交通、美食、行政手續與日本生活決策。",
    primaryCta: "開始看生活指南",
    secondaryCta: "推薦實用店家",
    latest: "最新文章",
    categories: "主要分類入口",
    decisionNote: "不是旅遊清單，而是協助你做生活決定的資訊站。"
  },
  en: {
    title: "A multilingual life decision assistant for living in Japan.",
    description: "Compare options, follow checklists, and make practical decisions about mobile plans, housing, commuting, food, procedures, and work in Japan.",
    primaryCta: "Read life guides",
    secondaryCta: "Submit a useful place",
    latest: "Latest articles",
    categories: "Main categories",
    decisionNote: "Not a travel blog. A practical decision guide for daily life in Japan."
  },
  ja: {
    title: "日本での生活をサポートする多言語ライフガイド。",
    description: "携帯プラン、住まい、交通、食事、手続き、仕事など、日本で暮らすための実用的な判断を支えます。",
    primaryCta: "生活ガイドを見る",
    secondaryCta: "おすすめを投稿",
    latest: "最新記事",
    categories: "主なカテゴリ",
    decisionNote: "観光情報ではなく、日本で暮らすための判断を助ける情報サイトです。"
  },
  ko: {
    title: "일본 생활을 도와주는 다국어 생활 가이드.",
    description: "휴대폰 요금제, 주거, 교통, 음식, 행정 절차, 업무까지 일본 생활의 실질적인 선택을 돕습니다.",
    primaryCta: "생활 가이드 보기",
    secondaryCta: "유용한 장소 추천",
    latest: "최신 글",
    categories: "주요 카테고리",
    decisionNote: "여행 블로그가 아니라 일본 생활 결정을 돕는 실용 정보 사이트입니다."
  }
} satisfies Record<Locale, Record<string, string>>;

export const sectionCopy = {
  "zh-tw": {
    articlesTitle: "生活文章",
    areasTitle: "地區生活圈",
    placesTitle: "店家推薦",
    mobileTitle: "手機門號",
    toolsTitle: "生活工具",
    submitTitle: "推薦實用店家",
    aboutTitle: "關於 TachiSuke",
    accountLoginTitle: "登入功能準備中",
    accountFavoritesTitle: "收藏功能準備中",
    accountSubmissionsTitle: "投稿紀錄準備中"
  },
  en: {
    articlesTitle: "Life Articles",
    areasTitle: "Area Guides",
    placesTitle: "Useful Places",
    mobileTitle: "Mobile Plans",
    toolsTitle: "Life Tools",
    submitTitle: "Submit a Useful Place",
    aboutTitle: "About TachiSuke",
    accountLoginTitle: "Login Coming Soon",
    accountFavoritesTitle: "Favorites Coming Soon",
    accountSubmissionsTitle: "Submission History Coming Soon"
  },
  ja: {
    articlesTitle: "生活記事",
    areasTitle: "エリアガイド",
    placesTitle: "おすすめのお店",
    mobileTitle: "携帯プラン",
    toolsTitle: "生活ツール",
    submitTitle: "おすすめを投稿",
    aboutTitle: "TachiSuke について",
    accountLoginTitle: "ログイン機能は準備中です",
    accountFavoritesTitle: "保存機能は準備中です",
    accountSubmissionsTitle: "投稿履歴は準備中です"
  },
  ko: {
    articlesTitle: "생활 글",
    areasTitle: "지역 가이드",
    placesTitle: "유용한 장소",
    mobileTitle: "휴대폰 요금제",
    toolsTitle: "생활 도구",
    submitTitle: "유용한 장소 추천",
    aboutTitle: "TachiSuke 소개",
    accountLoginTitle: "로그인 기능 준비 중",
    accountFavoritesTitle: "저장 기능 준비 중",
    accountSubmissionsTitle: "추천 내역 준비 중"
  }
} satisfies Record<Locale, Record<string, string>>;

type UiCopyKey = "layout.skipMain";

const uiCopy = {
  "zh-tw": {
    "layout.skipMain": "跳到主要內容"
  },
  en: {
    "layout.skipMain": "Skip to main content"
  },
  ja: {
    "layout.skipMain": "本文へスキップ"
  },
  ko: {
    "layout.skipMain": "본문으로 건너뛰기"
  }
} satisfies Record<Locale, Record<UiCopyKey, string>>;

export function getUiCopy(locale: Locale, key: UiCopyKey): string {
  return uiCopy[locale]?.[key]
    ?? fallbackLocales.map((fallbackLocale) => uiCopy[fallbackLocale]?.[key]).find(Boolean)
    ?? `[missing translation: ${key}]`;
}

export function getPageTitle(_locale: Locale, title?: string): string {
  const suffix = "TachiSuke";
  return title ? `${title} | ${suffix}` : suffix;
}

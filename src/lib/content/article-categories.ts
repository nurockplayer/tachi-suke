import { getCollection } from "astro:content";
import { type Locale } from "@/lib/i18n";

export interface ArticleCategorySummary {
  category: string;
  slug: string;
  count: number;
  updatedAt: Date;
}

const categoryTitles: Record<string, Record<Locale, string>> = {
  mobile: {
    "zh-tw": "手機文章",
    en: "Mobile guides",
    ja: "携帯ガイド",
    ko: "휴대폰 글"
  },
  setup: {
    "zh-tw": "生活設定文章",
    en: "Setup guides",
    ja: "生活準備ガイド",
    ko: "생활 준비 글"
  },
  housing: {
    "zh-tw": "租屋文章",
    en: "Housing guides",
    ja: "住まいガイド",
    ko: "주거 글"
  },
  food: {
    "zh-tw": "外食文章",
    en: "Food guides",
    ja: "外食ガイド",
    ko: "외식 글"
  },
  transportation: {
    "zh-tw": "交通通勤文章",
    en: "Transportation guides",
    ja: "交通・通勤ガイド",
    ko: "교통·통근 글"
  },
  procedures: {
    "zh-tw": "行政手續文章",
    en: "Procedure guides",
    ja: "行政手続きガイド",
    ko: "행정 절차 글"
  }
};

const categoryDescriptions: Record<string, Record<Locale, string>> = {
  mobile: {
    "zh-tw": "比較日本手機門號、付款方式、本人確認、資料量與申請前注意事項。",
    en: "Compare Japan mobile plans, payment methods, identity checks, data needs, and signup caveats.",
    ja: "日本の携帯プラン、支払い方法、本人確認、データ容量、申し込み前の注意点を比較します。",
    ko: "일본 휴대폰 요금제, 결제 방식, 본인 확인, 데이터 사용량, 신청 전 주의점을 비교합니다."
  },
  setup: {
    "zh-tw": "整理剛到日本時手機、住址、交通、購物與日常生活設定的優先順序。",
    en: "Organize first-week priorities for mobile service, address, commuting, shopping, and daily routines.",
    ja: "来日直後の携帯、住所、交通、買い物、日常生活設定の優先順位を整理します。",
    ko: "일본 도착 직후 휴대폰, 주소, 교통, 장보기, 일상 설정의 우선순위를 정리합니다."
  },
  housing: {
    "zh-tw": "用初期費用、契約項目與生活成本角度，整理日本租屋前要確認的重點。",
    en: "Review move-in costs, contract items, and daily-life cost checks before renting in Japan.",
    ja: "初期費用、契約項目、生活コストの観点から日本で部屋を借りる前の確認点を整理します。",
    ko: "초기 비용, 계약 항목, 생활비 관점에서 일본에서 집을 구하기 전 확인할 점을 정리합니다."
  },
  food: {
    "zh-tw": "用單人友善、禁菸、付款方式與使用情境比較日本日常外食選擇。",
    en: "Compare everyday food options in Japan by solo use, smoking policy, payment, and use case.",
    ja: "一人利用、禁煙、支払い、利用シーンで日本の日常的な外食先を比較します。",
    ko: "혼자 이용, 금연, 결제, 이용 상황을 기준으로 일본의 일상 외식 선택지를 비교합니다."
  },
  transportation: {
    "zh-tw": "整理日本通勤、電車、IC 卡、定期券與日常移動的決策重點。",
    en: "Decision guides for commuting, trains, IC cards, commuter passes, and everyday movement in Japan.",
    ja: "日本の通勤、電車、ICカード、定期券、日常移動の判断ポイントを整理します。",
    ko: "일본의 통근, 전철, IC 카드, 정기권, 일상 이동 판단 포인트를 정리합니다."
  },
  procedures: {
    "zh-tw": "整理外國居民在日本生活時常見的地址、在留、My Number 與自治體手續。",
    en: "Practical guides for address, residence, My Number, and municipal procedures for foreign residents in Japan.",
    ja: "外国人住民向けに、住所、在留、マイナンバー、自治体手続きの確認点を整理します。",
    ko: "외국인 주민을 위한 주소, 체류, 마이넘버, 지자체 절차 확인 포인트를 정리합니다."
  }
};

export function slugifyArticleCategory(category: string): string {
  return category
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

export function getArticleCategoryTitle(locale: Locale, category: string): string {
  return categoryTitles[category]?.[locale] ?? category;
}

export function getArticleCategoryDescription(locale: Locale, category: string): string {
  return categoryDescriptions[category]?.[locale] ?? {
    "zh-tw": `TachiSuke 的 ${category} 相關日本生活文章。`,
    en: `TachiSuke ${category} guides for practical life decisions in Japan.`,
    ja: `TachiSuke の ${category} 関連の日本生活ガイドです。`,
    ko: `TachiSuke의 ${category} 관련 일본 생활 가이드입니다.`
  }[locale];
}

export async function getArticleCategorySummaries(locale: Locale): Promise<ArticleCategorySummary[]> {
  const articles = await getCollection("articles", ({ data }) => data.locale === locale && !data.draft);
  const bySlug = new Map<string, ArticleCategorySummary>();

  for (const article of articles) {
    const slug = slugifyArticleCategory(article.data.category);
    const existing = bySlug.get(slug);
    if (!existing) {
      bySlug.set(slug, {
        category: article.data.category,
        slug,
        count: 1,
        updatedAt: article.data.updatedAt
      });
      continue;
    }

    existing.count += 1;
    if (article.data.updatedAt > existing.updatedAt) {
      existing.updatedAt = article.data.updatedAt;
    }
  }

  return [...bySlug.values()].sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

export async function getArticleCategoryStaticPaths(locale: Locale) {
  const categories = await getArticleCategorySummaries(locale);
  return categories.map((category) => ({
    params: { category: category.slug },
    props: { category: category.category }
  }));
}

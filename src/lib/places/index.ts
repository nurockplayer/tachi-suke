import type { Locale } from "@/lib/i18n";
import type { JapaneseDifficulty, NonSmokingStatus, SoloFriendly } from "@/types/place";

type LabelSet<T extends string> = Record<Locale, Record<T, string>>;

export const placeFieldLabels: Record<Locale, Record<string, string>> = {
  "zh-tw": {
    category: "分類",
    prefecture: "都道府縣",
    city: "城市",
    area: "地區",
    station: "最近車站",
    priceRange: "價格帶",
    soloFriendly: "一人友善",
    nonSmokingStatus: "禁菸",
    japaneseDifficulty: "日文難度",
    paymentMethods: "付款方式",
    googleMapUrl: "Google Maps",
    officialUrl: "官方網站",
    details: "查看詳情"
  },
  en: {
    category: "Category",
    prefecture: "Prefecture",
    city: "City",
    area: "Area",
    station: "Nearest station",
    priceRange: "Price range",
    soloFriendly: "Solo-friendly",
    nonSmokingStatus: "Non-smoking",
    japaneseDifficulty: "Japanese difficulty",
    paymentMethods: "Payment methods",
    googleMapUrl: "Google Maps",
    officialUrl: "Official site",
    details: "View details"
  },
  ja: {
    category: "カテゴリ",
    prefecture: "都道府県",
    city: "市区町村",
    area: "エリア",
    station: "最寄り駅",
    priceRange: "価格帯",
    soloFriendly: "一人利用",
    nonSmokingStatus: "禁煙",
    japaneseDifficulty: "日本語難度",
    paymentMethods: "支払い方法",
    googleMapUrl: "Google Maps",
    officialUrl: "公式サイト",
    details: "詳しく見る"
  },
  ko: {
    category: "카테고리",
    prefecture: "도도부현",
    city: "도시",
    area: "지역",
    station: "가까운 역",
    priceRange: "가격대",
    soloFriendly: "혼자 이용",
    nonSmokingStatus: "금연",
    japaneseDifficulty: "일본어 난이도",
    paymentMethods: "결제 방법",
    googleMapUrl: "Google Maps",
    officialUrl: "공식 사이트",
    details: "자세히 보기"
  }
};

export const soloFriendlyLabels: LabelSet<SoloFriendly> = {
  "zh-tw": { yes: "適合", maybe: "普通", no: "不適合", unknown: "未確認" },
  en: { yes: "Yes", maybe: "Maybe", no: "No", unknown: "Unknown" },
  ja: { yes: "向いている", maybe: "普通", no: "向いていない", unknown: "未確認" },
  ko: { yes: "적합", maybe: "보통", no: "부적합", unknown: "미확인" }
};

export const nonSmokingStatusLabels: LabelSet<NonSmokingStatus> = {
  "zh-tw": {
    confirmed_non_smoking: "已確認禁菸",
    separated_smoking_area: "分菸",
    smoking_allowed: "可吸菸",
    unknown: "未確認"
  },
  en: {
    confirmed_non_smoking: "Confirmed",
    separated_smoking_area: "Separated area",
    smoking_allowed: "Smoking allowed",
    unknown: "Unknown"
  },
  ja: {
    confirmed_non_smoking: "禁煙確認済み",
    separated_smoking_area: "分煙",
    smoking_allowed: "喫煙可",
    unknown: "未確認"
  },
  ko: {
    confirmed_non_smoking: "금연 확인",
    separated_smoking_area: "분연",
    smoking_allowed: "흡연 가능",
    unknown: "미확인"
  }
};

export const japaneseDifficultyLabels: LabelSet<JapaneseDifficulty> = {
  "zh-tw": { easy: "簡單", normal: "普通", hard: "偏難", unknown: "未確認" },
  en: { easy: "Easy", normal: "Normal", hard: "Hard", unknown: "Unknown" },
  ja: { easy: "簡単", normal: "普通", hard: "難しい", unknown: "未確認" },
  ko: { easy: "쉬움", normal: "보통", hard: "어려움", unknown: "미확인" }
};

export function formatPaymentMethod(value: string): string {
  return value.replaceAll("_", " ");
}

export function getPlaceDescription(
  locale: Locale,
  place: { name: string; category: string; city?: string; area?: string; station?: string; priceRange?: string }
): string {
  const location = [place.city, place.area, place.station].filter(Boolean).join(" / ");
  const price = place.priceRange ? ` ${place.priceRange}` : "";

  if (locale === "zh-tw") {
    return `${place.name} 是 TachiSuke 收錄的${place.category}，位於 ${location || "日本"}。${price}。`;
  }
  if (locale === "ja") {
    return `${place.name} は TachiSuke に掲載されている${place.category}です。場所: ${location || "日本"}。${price}`;
  }
  if (locale === "ko") {
    return `${place.name}은 TachiSuke에 등록된 ${place.category}입니다. 위치: ${location || "일본"}.${price}`;
  }
  return `${place.name} is a ${place.category} listed by TachiSuke. Location: ${location || "Japan"}.${price}`;
}

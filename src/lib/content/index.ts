import type { Locale } from "@/types/locale";

export interface CategoryEntry {
  href: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
}

export const categoryEntries: CategoryEntry[] = [
  {
    href: "/mobile",
    title: {
      "zh-tw": "手機門號",
      en: "Mobile plans",
      ja: "携帯プラン",
      ko: "휴대폰 요금제"
    },
    description: {
      "zh-tw": "比較大手、格安 SIM、eSIM 與付款條件。",
      en: "Compare major carriers, budget SIMs, eSIMs, and payment requirements.",
      ja: "大手、格安 SIM、eSIM、支払い条件を比較します。",
      ko: "대형 통신사, 저가 SIM, eSIM, 결제 조건을 비교합니다."
    }
  },
  {
    href: "/areas",
    title: {
      "zh-tw": "地區生活圈",
      en: "Area guides",
      ja: "エリアガイド",
      ko: "지역 가이드"
    },
    description: {
      "zh-tw": "用租金、交通、安靜度與生活機能選地區。",
      en: "Choose neighborhoods by rent, commute, quietness, and daily convenience.",
      ja: "家賃、通勤、静かさ、生活利便性から地域を選びます。",
      ko: "월세, 통근, 조용함, 생활 편의성으로 지역을 고릅니다."
    }
  },
  {
    href: "/places",
    title: {
      "zh-tw": "店家推薦",
      en: "Useful places",
      ja: "おすすめのお店",
      ko: "유용한 장소"
    },
    description: {
      "zh-tw": "收集外國居民友善、適合日常使用的店家。",
      en: "Find resident-friendly restaurants, cafes, shops, and everyday places.",
      ja: "暮らしに役立つ、外国人にも使いやすいお店を集めます。",
      ko: "외국인 거주자에게도 편한 일상 장소를 모읍니다."
    }
  },
  {
    href: "/tools",
    title: {
      "zh-tw": "生活工具",
      en: "Life tools",
      ja: "生活ツール",
      ko: "생활 도구"
    },
    description: {
      "zh-tw": "用清單、試算與流程圖整理生活決策。",
      en: "Use checklists, calculators, and decision trees for daily-life choices.",
      ja: "チェックリストや計算ツールで生活の判断を整理します。",
      ko: "체크리스트와 계산 도구로 생활 결정을 정리합니다."
    }
  }
];

export const sampleMobilePlans = [
  {
    provider: "Rakuten Mobile",
    planName: "Rakuten Saikyo Plan",
    price: "from ¥1,078",
    note: "Good to compare if you use lots of data and can check coverage."
  },
  {
    provider: "LINEMO",
    planName: "Best Plan",
    price: "from ¥990",
    note: "Useful for light data users who want online signup."
  },
  {
    provider: "IIJmio",
    planName: "Giga Plan",
    price: "from ¥850",
    note: "Budget SIM option for people comfortable with online setup."
  }
];

export function formatDate(date: Date, locale: Locale): string {
  const htmlLocale = locale === "zh-tw" ? "zh-TW" : locale;
  return new Intl.DateTimeFormat(htmlLocale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

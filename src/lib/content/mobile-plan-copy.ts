import type { CollectionEntry } from "astro:content";
import type { Locale } from "@/lib/i18n";

type MobilePlanData = CollectionEntry<"mobile-plans">["data"];

export interface MobilePlanDisplayCopy {
  planName: string;
  monthlyPrice: string;
  dataAmount: string;
  paymentRequirements: string[];
  pros: string[];
  cons: string[];
  recommendedFor: string[];
  sourceNote: string;
  notes: string[];
}

type LocalizedMobilePlanCopy = Record<Locale, MobilePlanDisplayCopy>;

const mobilePlanCopyBySlug: Record<string, LocalizedMobilePlanCopy> = {
  povo2: {
    "zh-tw": {
      planName: "povo2.0",
      monthlyPrice: "基本月費 ¥0，依需求購買付費 topping；申請前請確認最新 topping 價格。",
      dataAmount: "基本 0GB，依期間或容量加購資料 topping。",
      paymentRequirements: ["信用卡", "Paidy", "部分申請流程可能需要先購買第一個付費 topping"],
      pros: ["資料 topping 彈性高", "使用 au 網路", "支援 eSIM", "適合作為能自行管理資料量的副門號"],
      cons: ["需要主動管理 topping", "長期沒有購買付費 topping 可能影響服務", "0GB 基本速度非常有限"],
      recommendedFor: ["每月資料量不固定的人", "雙 SIM 使用者", "習慣用 app 自行管理方案的人"],
      sourceNote: "已整理官方網站資訊作為比較參考；申請前請確認最新 topping 價格與條件。",
      notes: [
        "Topping 價格、活動組合、申請條件與停用規則可能變動。",
        "申請前請在官方網站確認 eSIM、app 設定、付款方式與第一次 topping 的條件。",
        "零基本月費模式需要主動管理，不一定適合想要固定月租包的人。"
      ]
    },
    en: {
      planName: "povo2.0",
      monthlyPrice: "base fee ¥0 plus paid toppings; confirm current topping prices",
      dataAmount: "0GB base, add data toppings by period or capacity",
      paymentRequirements: ["credit card", "Paidy", "first paid topping required for some signup flows"],
      pros: ["flexible data toppings", "au network", "eSIM support", "useful as a secondary line for people who manage data manually"],
      cons: ["requires active topping management", "service may be suspended if no paid topping is purchased for a long period", "0GB base speed is very limited"],
      recommendedFor: ["people with uneven monthly data use", "dual SIM users", "users comfortable managing plans through an app"],
      sourceNote: "Official website information summarized for comparison; confirm the latest topping prices and terms before applying.",
      notes: [
        "Topping prices, campaign bundles, signup requirements, and suspension rules can change.",
        "Check eSIM, app setup, payment methods, and first-topping requirements on the official site.",
        "The no-base-fee model requires active management and may not fit users who want a fixed monthly bundle."
      ]
    },
    ja: {
      planName: "povo2.0",
      monthlyPrice: "基本料は ¥0、必要な分だけ有料 topping を購入。最新の topping 料金は公式サイトで確認してください。",
      dataAmount: "基本は 0GB、期間または容量ごとにデータ topping を追加します。",
      paymentRequirements: ["クレジットカード", "Paidy", "一部の申し込みでは最初の有料 topping 購入が必要な場合があります"],
      pros: ["データ topping の自由度が高い", "au 回線", "eSIM 対応", "データ量を自分で管理できる人の副回線にも使いやすい"],
      cons: ["topping を自分で管理する必要がある", "長期間有料 topping を購入しないと利用に影響する場合がある", "0GB 時の基本速度はかなり制限されます"],
      recommendedFor: ["月ごとのデータ量に差がある人", "デュアル SIM を使う人", "アプリでプラン管理できる人"],
      sourceNote: "公式サイトの情報を比較用に整理しています。申し込み前に最新の topping 料金と条件を確認してください。",
      notes: [
        "Topping 料金、キャンペーン、申し込み条件、停止ルールは変わる場合があります。",
        "eSIM、アプリ設定、支払い方法、初回 topping 条件を公式サイトで確認してください。",
        "基本料なしの仕組みは管理が必要で、固定の月額パックを求める人には合わない場合があります。"
      ]
    },
    ko: {
      planName: "povo2.0",
      monthlyPrice: "기본요금 ¥0에 필요한 유료 topping을 구매합니다. 최신 topping 가격은 공식 사이트에서 확인하세요.",
      dataAmount: "기본 0GB이며 기간 또는 용량별 데이터 topping을 추가합니다.",
      paymentRequirements: ["신용카드", "Paidy", "일부 신청 과정에서는 첫 유료 topping 구매가 필요할 수 있음"],
      pros: ["데이터 topping 선택이 유연함", "au 회선", "eSIM 지원", "데이터를 직접 관리하는 사람의 보조 회선으로도 유용함"],
      cons: ["topping을 직접 관리해야 함", "오랫동안 유료 topping을 구매하지 않으면 서비스에 영향이 있을 수 있음", "0GB 기본 속도는 매우 제한적임"],
      recommendedFor: ["월별 데이터 사용량이 들쭉날쭉한 사람", "듀얼 SIM 사용자", "앱으로 요금제를 직접 관리하는 데 익숙한 사람"],
      sourceNote: "공식 사이트 정보를 비교용으로 정리했습니다. 신청 전 최신 topping 가격과 조건을 확인하세요.",
      notes: [
        "Topping 가격, 캠페인 묶음, 신청 조건, 이용 정지 규칙은 바뀔 수 있습니다.",
        "eSIM, 앱 설정, 결제 방법, 첫 topping 조건을 공식 사이트에서 확인하세요.",
        "기본요금이 없는 방식은 직접 관리가 필요해 고정 월정액 묶음을 원하는 사람에게는 맞지 않을 수 있습니다."
      ]
    }
  },
  "linemo-best-plan": {
    "zh-tw": {
      planName: "Best Plan",
      monthlyPrice: "¥990 起；請確認官方最新價格。",
      dataAmount: "3GB 到 10GB 級距；Best Plan V 提供較大資料量。",
      paymentRequirements: ["信用卡", "口座振替", "PayPay 相關條件請以官方網站為準"],
      pros: ["線上申請", "SoftBank 網路", "簡單的低到中資料量級距", "申請時請確認 eSIM 支援"],
      cons: ["以線上支援為主", "活動與方案級距可能變動", "超出包含條件的通話可能另計費"],
      recommendedFor: ["輕量到中度資料使用者", "偏好線上開通的人", "想用 SoftBank 系列但不想負擔完整大手價格的人"],
      sourceNote: "已整理官方網站資訊作為比較參考；申請前請確認最新條件。",
      notes: [
        "價格、活動、資料級距與通話加購條件可能變動。",
        "申請時請確認 eSIM、實體 SIM、付款方式與本人確認條件。",
        "線上支援為主，可能不適合需要門市協助的人。"
      ]
    },
    en: {
      planName: "Best Plan",
      monthlyPrice: "from ¥990; confirm current official price",
      dataAmount: "3GB to 10GB tier; Best Plan V offers larger data",
      paymentRequirements: ["credit card", "bank transfer", "confirm PayPay-related conditions on official site"],
      pros: ["online signup", "SoftBank network", "simple low-to-medium data tiers", "eSIM support should be checked during signup"],
      cons: ["online-only support", "campaigns and plan tiers can change", "call charges may apply outside included conditions"],
      recommendedFor: ["light to medium data users", "people who prefer online setup", "users who want a SoftBank-brand option without full carrier pricing"],
      sourceNote: "Official website information summarized for comparison; confirm the latest terms before applying.",
      notes: [
        "Prices, campaigns, data tiers, and call option conditions can change.",
        "Confirm eSIM, physical SIM, payment, and identity verification requirements during signup.",
        "Online-only support may not fit users who need in-store help."
      ]
    },
    ja: {
      planName: "Best Plan",
      monthlyPrice: "¥990 から。最新の公式料金を確認してください。",
      dataAmount: "3GB から 10GB の段階制。Best Plan V はより大きいデータ容量です。",
      paymentRequirements: ["クレジットカード", "口座振替", "PayPay 関連条件は公式サイトで確認"],
      pros: ["オンライン申し込み", "SoftBank 回線", "低から中容量のシンプルな段階制", "eSIM 対応は申し込み時に確認してください"],
      cons: ["サポートはオンライン中心", "キャンペーンやプラン段階は変わる場合があります", "含まれる条件を外れる通話は別料金になる場合があります"],
      recommendedFor: ["ライトから中容量の利用者", "オンラインで手続きしたい人", "SoftBank 系列を大手キャリアより抑えた料金で検討したい人"],
      sourceNote: "公式サイトの情報を比較用に整理しています。申し込み前に最新条件を確認してください。",
      notes: [
        "料金、キャンペーン、データ段階、通話オプション条件は変わる場合があります。",
        "eSIM、物理 SIM、支払い方法、本人確認の条件を申し込み時に確認してください。",
        "オンライン中心のサポートのため、店頭で相談したい人には合わない場合があります。"
      ]
    },
    ko: {
      planName: "Best Plan",
      monthlyPrice: "¥990부터. 최신 공식 요금은 공식 사이트에서 확인하세요.",
      dataAmount: "3GB부터 10GB까지 단계제이며 Best Plan V는 더 큰 데이터 용량을 제공합니다.",
      paymentRequirements: ["신용카드", "계좌이체", "PayPay 관련 조건은 공식 사이트에서 확인"],
      pros: ["온라인 신청", "SoftBank 회선", "낮은 데이터부터 중간 데이터까지 단순한 단계제", "신청 시 eSIM 지원 여부를 확인해야 함"],
      cons: ["온라인 지원 중심", "캠페인과 요금제 단계가 바뀔 수 있음", "포함 조건을 벗어난 통화는 별도 요금이 나올 수 있음"],
      recommendedFor: ["가벼운 데이터부터 중간 데이터 사용자", "온라인 개통을 선호하는 사람", "SoftBank 계열을 대형 통신사보다 낮은 부담으로 검토하고 싶은 사람"],
      sourceNote: "공식 사이트 정보를 비교용으로 정리했습니다. 신청 전 최신 조건을 확인하세요.",
      notes: [
        "요금, 캠페인, 데이터 단계, 통화 옵션 조건은 바뀔 수 있습니다.",
        "eSIM, 물리 SIM, 결제 방법, 본인 확인 조건을 신청 시 확인하세요.",
        "온라인 지원 중심이라 매장 상담이 필요한 사람에게는 맞지 않을 수 있습니다."
      ]
    }
  },
  "rakuten-saikyo-plan": {
    "zh-tw": {
      planName: "Rakuten Saikyo Plan",
      monthlyPrice: "¥1,078 到 ¥3,278 的用量級距；請確認官方最新價格。",
      dataAmount: "依用量計費，在 Rakuten 網路內偏向大資料量／近似無限量定位。",
      paymentRequirements: ["信用卡", "口座振替", "部分金融卡支援有限", "Rakuten Points 可作為選項"],
      pros: ["依用量分級", "線上申請", "支援 eSIM", "符合條件時 Rakuten Link 可降低日本國內通話成本"],
      cons: ["需要確認住家、公司與通勤地區收訊", "Rakuten Link 條件與不適用電話號碼必須確認", "價格與活動優惠可能變動"],
      recommendedFor: ["資料用量大的人", "願意先查收訊的人", "已經常用 Rakuten 生態系的人"],
      sourceNote: "已整理官方網站資訊作為比較參考；申請前請確認最新條件。",
      notes: [
        "價格、優惠、活動點數與 Rakuten Link 條件可能變動。",
        "作為主門號前，請確認住家、學校、公司與通勤路線收訊。",
        "付款、本人確認與通話適用條件可能依使用者狀態與申請路徑不同。"
      ]
    },
    en: {
      planName: "Rakuten Saikyo Plan",
      monthlyPrice: "tiered from ¥1,078 to ¥3,278; confirm official latest price",
      dataAmount: "tiered by usage, with high-data/unlimited-positioning on Rakuten network",
      paymentRequirements: ["credit card", "bank transfer", "limited debit card support", "Rakuten Points optional"],
      pros: ["tiered pricing", "online signup", "eSIM support", "Rakuten Link calling can reduce domestic call cost for eligible calls"],
      cons: ["coverage should be checked by home, work, and commute area", "Rakuten Link conditions and excluded numbers must be checked", "price and campaign benefits can change"],
      recommendedFor: ["heavy data users", "people comfortable checking coverage", "users already in the Rakuten ecosystem"],
      sourceNote: "Official website information summarized for comparison; confirm the latest terms before applying.",
      notes: [
        "Prices, benefits, campaign points, and Rakuten Link conditions can change.",
        "Coverage should be checked around home, school, work, and commute routes before relying on it as a main line.",
        "Payment, identity verification, and eligible call conditions may differ by user status and signup route."
      ]
    },
    ja: {
      planName: "Rakuten Saikyo Plan",
      monthlyPrice: "利用量に応じて ¥1,078 から ¥3,278。最新の公式料金を確認してください。",
      dataAmount: "利用量に応じた段階制で、Rakuten 回線では大容量・実質無制限寄りの位置づけです。",
      paymentRequirements: ["クレジットカード", "口座振替", "一部デビットカードは条件付き", "Rakuten Points 利用可"],
      pros: ["利用量に応じた段階制", "オンライン申し込み", "eSIM 対応", "対象通話では Rakuten Link により国内通話費を抑えられる場合があります"],
      cons: ["自宅、職場、通勤エリアの通信状況を確認してください", "Rakuten Link の条件と対象外番号の確認が必要です", "料金やキャンペーン特典は変わる場合があります"],
      recommendedFor: ["データを多く使う人", "通信エリアを自分で確認できる人", "Rakuten のサービスをよく使う人"],
      sourceNote: "公式サイトの情報を比較用に整理しています。申し込み前に最新条件を確認してください。",
      notes: [
        "料金、特典、キャンペーンポイント、Rakuten Link の条件は変わる場合があります。",
        "主回線として使う前に、自宅、学校、職場、通勤経路の通信状況を確認してください。",
        "支払い、本人確認、通話の適用条件は利用者の状況や申し込み経路により異なる場合があります。"
      ]
    },
    ko: {
      planName: "Rakuten Saikyo Plan",
      monthlyPrice: "사용량에 따라 ¥1,078부터 ¥3,278까지. 최신 공식 요금을 확인하세요.",
      dataAmount: "사용량에 따른 단계제이며 Rakuten 회선에서는 대용량 또는 사실상 무제한에 가까운 포지션입니다.",
      paymentRequirements: ["신용카드", "계좌이체", "일부 직불카드는 제한적으로 지원", "Rakuten Points 선택 가능"],
      pros: ["사용량에 따른 단계제", "온라인 신청", "eSIM 지원", "조건에 맞는 통화는 Rakuten Link로 국내 통화 비용을 줄일 수 있음"],
      cons: ["집, 회사, 통근 지역의 통신 품질을 확인해야 함", "Rakuten Link 조건과 제외 번호를 확인해야 함", "가격과 캠페인 혜택이 바뀔 수 있음"],
      recommendedFor: ["데이터를 많이 쓰는 사람", "커버리지를 직접 확인할 수 있는 사람", "Rakuten 생태계를 이미 쓰는 사람"],
      sourceNote: "공식 사이트 정보를 비교용으로 정리했습니다. 신청 전 최신 조건을 확인하세요.",
      notes: [
        "요금, 혜택, 캠페인 포인트, Rakuten Link 조건은 바뀔 수 있습니다.",
        "주 회선으로 쓰기 전 집, 학교, 회사, 통근 경로의 통신 품질을 확인하세요.",
        "결제, 본인 확인, 통화 적용 조건은 사용자 상태와 신청 경로에 따라 달라질 수 있습니다."
      ]
    }
  },
  ahamo: {
    "zh-tw": {
      planName: "ahamo",
      monthlyPrice: "30GB 為 ¥2,970；加 ahamo oomori 110GB 選項為 ¥4,950；請確認官方最新價格。",
      dataAmount: "基本 30GB，付費 oomori 選項可到 110GB。",
      paymentRequirements: ["信用卡", "口座振替"],
      pros: ["docomo 網路", "簡單的 30GB 基本方案", "包含 5 分鐘日本國內通話但有例外", "海外資料量在官方條件內可用"],
      cons: ["支援偏線上", "資料量很少的人不一定最便宜", "加購服務與活動條件可能變動"],
      recommendedFor: ["中度資料使用者", "想要簡單 docomo 系列線上方案的人", "重視短時間日本國內通話與海外資料條件的人"],
      sourceNote: "已整理官方網站資訊作為比較參考；申請前請確認最新條件。",
      notes: [
        "價格、活動、本人確認與包含通話條件可能變動。",
        "申請前請在官方網站確認 eSIM、實體 SIM、海外資料與支援條件。",
        "付款與文件條件可能依申請流程與使用者狀態不同。"
      ]
    },
    en: {
      planName: "ahamo",
      monthlyPrice: "¥2,970 for 30GB; ¥4,950 with ahamo oomori 110GB option; confirm official latest price",
      dataAmount: "30GB base, 110GB with paid oomori option",
      paymentRequirements: ["credit card", "bank transfer"],
      pros: ["docomo network", "simple 30GB base plan", "5-minute domestic calls included with exceptions", "overseas data allowance is included within stated conditions"],
      cons: ["online-focused support", "not the cheapest if you use very little data", "optional services and campaign conditions can change"],
      recommendedFor: ["medium data users", "people who want a simple docomo-brand online plan", "users who value short domestic calls and overseas data conditions"],
      sourceNote: "Official website information summarized for comparison; confirm the latest terms before applying.",
      notes: [
        "Prices, campaigns, identity verification, and included call conditions can change.",
        "Check eSIM, physical SIM, overseas data, and support conditions on the official site before applying.",
        "Payment and document requirements may differ by signup flow and user status."
      ]
    },
    ja: {
      planName: "ahamo",
      monthlyPrice: "30GB は ¥2,970、ahamo oomori 110GB オプション付きは ¥4,950。最新の公式料金を確認してください。",
      dataAmount: "基本 30GB、有料 oomori オプションで 110GB。",
      paymentRequirements: ["クレジットカード", "口座振替"],
      pros: ["docomo 回線", "わかりやすい 30GB 基本プラン", "例外はありますが5分以内の国内通話込み", "条件内で海外データ利用も含まれます"],
      cons: ["サポートはオンライン中心", "データをほとんど使わない人には最安とは限りません", "オプションサービスやキャンペーン条件は変わる場合があります"],
      recommendedFor: ["中容量のデータ利用者", "シンプルな docomo 系オンラインプランを選びたい人", "短い国内通話と海外データ条件を重視する人"],
      sourceNote: "公式サイトの情報を比較用に整理しています。申し込み前に最新条件を確認してください。",
      notes: [
        "料金、キャンペーン、本人確認、含まれる通話条件は変わる場合があります。",
        "eSIM、物理 SIM、海外データ、サポート条件を公式サイトで確認してから申し込んでください。",
        "支払い方法と書類条件は申し込みの流れや利用者の状況により異なる場合があります。"
      ]
    },
    ko: {
      planName: "ahamo",
      monthlyPrice: "30GB는 ¥2,970, ahamo oomori 110GB 옵션 포함 시 ¥4,950. 최신 공식 요금을 확인하세요.",
      dataAmount: "기본 30GB, 유료 oomori 옵션으로 110GB.",
      paymentRequirements: ["신용카드", "계좌이체"],
      pros: ["docomo 회선", "단순한 30GB 기본 요금제", "예외가 있지만 5분 이내 국내 통화 포함", "정해진 조건 안에서 해외 데이터도 포함됨"],
      cons: ["온라인 지원 중심", "데이터를 아주 적게 쓰면 최저가는 아닐 수 있음", "부가 서비스와 캠페인 조건이 바뀔 수 있음"],
      recommendedFor: ["중간 데이터 사용자", "간단한 docomo 계열 온라인 요금제를 원하는 사람", "짧은 국내 통화와 해외 데이터 조건을 중시하는 사람"],
      sourceNote: "공식 사이트 정보를 비교용으로 정리했습니다. 신청 전 최신 조건을 확인하세요.",
      notes: [
        "요금, 캠페인, 본인 확인, 포함 통화 조건은 바뀔 수 있습니다.",
        "eSIM, 물리 SIM, 해외 데이터, 지원 조건을 공식 사이트에서 확인한 뒤 신청하세요.",
        "결제와 서류 조건은 신청 절차와 사용자 상태에 따라 달라질 수 있습니다."
      ]
    }
  },
  "uq-mobile": {
    "zh-tw": {
      planName: "Komi-Komi Plan Value",
      monthlyPrice: "Komi-Komi Plan Value 為 ¥3,828 起；折扣與方案會變動，請確認官方最新價格。",
      dataAmount: "Komi-Komi Plan Value 為 35GB，包含 10 分鐘日本國內通話但有例外。",
      paymentRequirements: ["信用卡", "口座振替", "線上商店與門市條件請另外確認"],
      pros: ["au 網路", "可使用門市支援", "清楚的中資料量選項", "此方案包含 10 分鐘內日本國內通話但有例外"],
      cons: ["折扣條件可能較複雜", "不一定是最低標示價格", "門市與線上申請條件可能不同"],
      recommendedFor: ["想要大手副品牌穩定感的人", "偏好可到門市詢問的人", "需要中等資料量且常打短通話的人"],
      sourceNote: "已整理官方網站資訊作為比較參考；申請前請確認最新方案與折扣條件。",
      notes: [
        "價格、折扣、資料量、通話包含範圍與活動條件可能變動。",
        "申請前請確認線上商店與門市條件是否不同。",
        "門市支援對部分新住民有幫助，但折扣與組合條件需要仔細確認。"
      ]
    },
    en: {
      planName: "Komi-Komi Plan Value",
      monthlyPrice: "from ¥3,828 for Komi-Komi Plan Value; discounts and plans vary, confirm official latest price",
      dataAmount: "35GB with 10-minute domestic calls included on Komi-Komi Plan Value",
      paymentRequirements: ["credit card", "bank transfer", "confirm online shop and in-store conditions"],
      pros: ["au network", "shop support available", "clear mid-data option", "domestic calls up to 10 minutes included on this plan with exceptions"],
      cons: ["discount conditions can be complex", "not always the lowest headline price", "store and online application conditions may differ"],
      recommendedFor: ["people who want carrier-sub-brand stability", "users who prefer having store support", "medium data users who also make short calls"],
      sourceNote: "Official website information summarized for comparison; confirm the latest plan and discount terms before applying.",
      notes: [
        "Prices, discounts, data capacity, call inclusion, and campaign conditions can change.",
        "Confirm whether online shop and in-store signup requirements differ before applying.",
        "Shop support can help some newcomers, but discount and bundle conditions require careful checking."
      ]
    },
    ja: {
      planName: "Komi-Komi Plan Value",
      monthlyPrice: "Komi-Komi Plan Value は ¥3,828 から。割引やプランは変わるため最新の公式料金を確認してください。",
      dataAmount: "Komi-Komi Plan Value は 35GB、例外はありますが10分以内の国内通話込みです。",
      paymentRequirements: ["クレジットカード", "口座振替", "オンラインショップと店頭の条件は要確認"],
      pros: ["au 回線", "店舗サポートあり", "わかりやすい中容量の選択肢", "このプランでは例外つきで10分以内の国内通話が含まれます"],
      cons: ["割引条件が複雑な場合があります", "表示上の最安料金とは限りません", "店頭とオンラインで申し込み条件が違う場合があります"],
      recommendedFor: ["大手サブブランドの安定感を求める人", "店舗サポートがあると安心な人", "中容量データと短い通話を使う人"],
      sourceNote: "公式サイトの情報を比較用に整理しています。申し込み前に最新プランと割引条件を確認してください。",
      notes: [
        "料金、割引、データ容量、通話の含まれる範囲、キャンペーン条件は変わる場合があります。",
        "オンラインショップと店頭申し込みで条件が違うかを確認してから申し込んでください。",
        "店舗サポートは来日直後の人に役立つ場合がありますが、割引とセット条件は慎重に確認してください。"
      ]
    },
    ko: {
      planName: "Komi-Komi Plan Value",
      monthlyPrice: "Komi-Komi Plan Value는 ¥3,828부터. 할인과 요금제는 바뀔 수 있으니 최신 공식 요금을 확인하세요.",
      dataAmount: "Komi-Komi Plan Value는 35GB이며 예외가 있지만 10분 이내 국내 통화를 포함합니다.",
      paymentRequirements: ["신용카드", "계좌이체", "온라인 숍과 매장 조건은 별도 확인"],
      pros: ["au 회선", "매장 지원 가능", "명확한 중간 데이터 선택지", "이 요금제는 예외가 있지만 10분 이내 국내 통화를 포함함"],
      cons: ["할인 조건이 복잡할 수 있음", "항상 가장 낮은 표시 가격은 아닐 수 있음", "매장과 온라인 신청 조건이 다를 수 있음"],
      recommendedFor: ["대형 통신사 서브 브랜드의 안정감을 원하는 사람", "매장 지원이 있으면 안심되는 사람", "중간 데이터와 짧은 통화를 함께 쓰는 사람"],
      sourceNote: "공식 사이트 정보를 비교용으로 정리했습니다. 신청 전 최신 요금제와 할인 조건을 확인하세요.",
      notes: [
        "요금, 할인, 데이터 용량, 통화 포함 범위, 캠페인 조건은 바뀔 수 있습니다.",
        "온라인 숍과 매장 신청 조건이 다른지 확인한 뒤 신청하세요.",
        "매장 지원은 일부 신규 거주자에게 도움이 되지만 할인과 묶음 조건은 꼼꼼히 확인해야 합니다."
      ]
    }
  }
};

function fallbackCopy(data: MobilePlanData): MobilePlanDisplayCopy {
  return {
    planName: data.planName,
    monthlyPrice: data.monthlyPrice,
    dataAmount: data.dataAmount,
    paymentRequirements: data.paymentRequirements.map((item) => item.replaceAll("_", " ")),
    pros: data.pros,
    cons: data.cons,
    recommendedFor: data.recommendedFor,
    sourceNote: data.sourceNote,
    notes: data.notes
  };
}

export function getMobilePlanDisplayCopy(data: MobilePlanData, locale: Locale): MobilePlanDisplayCopy {
  return mobilePlanCopyBySlug[data.slug]?.[locale] ?? fallbackCopy(data);
}

export function getMobilePlanDisplayName(data: MobilePlanData, copy: MobilePlanDisplayCopy): string {
  return data.provider.toLocaleLowerCase() === copy.planName.toLocaleLowerCase()
    ? data.provider
    : `${data.provider} ${copy.planName}`;
}

export function joinMobilePlanCopyList(locale: Locale, items: string[]): string {
  if (locale === "zh-tw" || locale === "ja") return items.join("、");
  return items.join(", ");
}

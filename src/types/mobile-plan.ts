export interface MobilePlan {
  id: string;
  slug: string;
  provider: string;
  planName: string;
  monthlyPrice: string;
  dataAmount: string;
  paymentRequirements: string[];
  residenceCardRequired: boolean;
  creditCardRequired: boolean;
  pros: string[];
  cons: string[];
  recommendedFor: string[];
}

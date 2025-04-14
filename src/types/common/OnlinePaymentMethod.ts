export default interface OnlinePaymentMethod {
  companyName: string;
  transactionType: string;
  type: string;
  supportedCurrencies: string[];
  processingFees: number;
  securityFeatures: string[];
  isActive: boolean;
}

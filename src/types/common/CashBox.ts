export default interface CashBox {
  name: string;
  isActive: boolean;
  location: string;
  currency: string;
  pic: string;
  totalBalance: number;
  createdBy: string;
  // transactionHistory: any[]; //
  transactionHistory: string[];
}

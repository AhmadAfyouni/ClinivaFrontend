export interface WorkingHoursType {
  day: string;
  startTime: string;
  endTime: string;
}

export interface ContactInfoType {
  type: "email" | "phone";
  value: string;
  isPublic: boolean;
  subType?: string;
}
export interface LocationGoogle {
  x: number;
  y: number;
}
export interface BankAccountType {
  accountName: string;
  swiftCode: string;
  bankName: string;
  bankAddress: string;
  accountNumber: string;
  accountType: "savings" | "checking" | "business";
  isActive: boolean;
}
export interface BreakTimesType {
  startTime: string;
  endTime: string;
}
export interface Holiday {
  name: string;
  date: string;
  [key: string]: string;
}

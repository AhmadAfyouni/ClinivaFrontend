import { BankAccount } from "../AddCompanyType";
import CashBox from "../common/CashBox";
import CommercialRecord from "../common/CommercialRecord";
import ContactInfo from "../common/ContactInfo";
import Holiday from "../common/Holiday";
import InsuranceCompany from "../common/InsuranceCompany";
import LocationGoogl from "../common/LocationGoogl";
import OnlinePaymentMethod from "../common/OnlinePaymentMethod";
import WorkingDay from "../common/WorkingDay";

export default interface MedicalComplexDetailsType {
  _id: string;
  name: string;
  overview: string;
  policies: string;
  isActive: boolean;
  yearOfEstablishment: string;
  address: string;
  logo: string;
  vision: string;
  goals: string;
  contactInfos: ContactInfo[];
  holidays: Holiday[];
  workingDays: WorkingDay[];
  bankAccount: BankAccount[];
  insuranceCompany: InsuranceCompany[];
  commercialRecord: CommercialRecord;
  cashBoxes: CashBox[];
  onlinePaymentMethods: OnlinePaymentMethod[];
  locationGoogl: LocationGoogl;
  companyId: string;
  specializations: string[];
}

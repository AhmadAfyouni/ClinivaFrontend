import { BankAccount, Holiday } from "../AddCompanyType";
import CashBox from "../common/CashBox";
import CommercialRecord from "../common/CommercialRecord";
import ContactInfo from "../common/ContactInfo";
import InsuranceCompany from "../common/InsuranceCompany";
import LocationGoogl from "../common/LocationGoogl";
import OnlinePaymentMethod from "../common/OnlinePaymentMethod";
import WorkingDay from "../common/WorkingDay";

export default interface ClinicDetailsType {
  _id: string;
  name: string;
  AverageDurationOfVisit: number;
  overview: string;
  isActive: boolean;
  yearOfEstablishment: string;
  address: string;
  logo: string;
  vision: string;
  goals: string;
  contactInfos: ContactInfo[];
  holidays: Holiday[];
  WorkingHours: WorkingDay[];
  bankAccount: BankAccount[];
  insuranceCompany: InsuranceCompany[];
  commercialRecord: CommercialRecord;
  cashBoxes: CashBox[];
  onlinePaymentMethods: OnlinePaymentMethod[];
  locationGoogl: LocationGoogl;
  departmentId: string;
  specializations: string[];
}

import {
  BankAccount,
  CommercialRecord,
  InsuranceCompany,
} from "../AddCompanyType";
import CashBox from "../common/CashBox";
import ContactInfo from "../common/ContactInfo";
import LocationGoogl from "../common/LocationGoogl";
import OnlinePaymentMethod from "../common/OnlinePaymentMethod";

export default interface CompanyDetailsType {
  name: string;
  address: string;
  overview: string;
  yearOfEstablishment: string;
  logo: string;
  vision: string;
  goals: string;
  ContactInfos: ContactInfo[];
  bankAccount: BankAccount[];
  cashBoxes: CashBox[];
  onlinePaymentMethods: OnlinePaymentMethod[];
  insuranceCompany: InsuranceCompany[];
  commercialRecord: CommercialRecord;
  locationGoogl: LocationGoogl;
}

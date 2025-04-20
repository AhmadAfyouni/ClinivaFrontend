import { CommercialRecord, InsuranceCompany } from "./AddCompanyType";
import CashBox from "../common/CashBox";
import ContactInfo from "../common/ContactInfo";
import LocationGoogl from "../common/LocationGoogl";
import OnlinePaymentMethod from "../common/OnlinePaymentMethod";
import { BankAccount } from "../Employee/GetEmployee";

export default interface CompanyDetailsType {
  _id: string;
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

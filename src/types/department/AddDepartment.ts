import { ContactInfoType } from "../GeneralAdd";

export default interface AddDepartmentType {
  name: string;
  introduction: string;
  yearOfEstablishment: string;
  address: string;
  logo: string;
  vision: string;
  details: string;
  contactInfos: ContactInfoType[];
  clinicCollectionId: string;
}
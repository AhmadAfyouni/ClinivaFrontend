import DoctorDetailsType from "../doctor/DoctorDetailsType";

interface Clinic {
  _id: string;
  address: string;
  name: string;
  id: string;
}

// interface Doctor {
//   _id: string;
//   name: string;
//   specializations: Specialization[];
// }

export default interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  clinic: Clinic;
  doctors: DoctorDetailsType[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  publicId: string;
}

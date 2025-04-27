interface Clinic {
  _id: string;
  address: string;
  name: string;
  id: string;
}

interface Doctor {
  _id: string;
  name: string;
  specializations: string[]; // Empty array here, but maybe will have strings later
}

export default interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  clinic: Clinic;
  doctors: Doctor[];
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  publicId: string;
}

export default interface AddUserType {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  roleIds: string;
  clinicCollectionId: string;
  employeeId: string;
}

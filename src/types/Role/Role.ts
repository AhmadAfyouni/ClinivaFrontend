export default interface RolesType {
  isActive: boolean;
  _id: string;
  name: string;
  permissions: string[];
  permissionGroups: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

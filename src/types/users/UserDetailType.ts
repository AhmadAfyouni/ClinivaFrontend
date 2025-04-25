import ContactInfo from "../common/ContactInfo";
import RolesType from "../Role/Role";

interface ActivityLog {
  activityDate: string;
  description: string;
}

interface LoginEntry {
  loginDate: string;
  ipAddress: string;
  device: string;
}

export default interface UserDetailType {
  _id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  roleIds: RolesType[];
  employeeId: string;
  lastLoginAt: string;
  lastPasswordUpdate: string;
  activityLogs: ActivityLog[];
  loginHistory: LoginEntry[];
  contactInfos: ContactInfo[];
}

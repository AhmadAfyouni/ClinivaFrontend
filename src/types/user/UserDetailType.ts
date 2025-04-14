interface ActivityLog {
  activityDate: string;
  description: string;
}

interface LoginEntry {
  loginDate: string;
  ipAddress: string;
  device: string;
}

export interface UserDetailType {
  _id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  roleIds: string[];
  employeeId: string;
  lastLoginAt: string;
  lastPasswordUpdate: string;
  activityLogs: ActivityLog[];
  loginHistory: LoginEntry[];
}

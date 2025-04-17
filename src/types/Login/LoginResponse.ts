interface User {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
}

interface LoginData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export default interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
}

interface User {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
  plan: string;
}

interface LoginData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface MessageType {
  message: string;
  error: string;
  statusCode: number;
}

export default interface LoginResponse {
  success: boolean;
  // message: string;
  message: MessageType;
  data: LoginData;
}

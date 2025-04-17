import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/ApiCore";
import { LoginType } from "../../types/Login/LoginType";
import LoginResponse from "../../types/Login/LoginResponse";

const useLogin = (saveToken?: boolean, loginToRegister?: boolean) => {
  const navigate = useNavigate();
  console.log("savetoken", saveToken);

  const login = async (data: LoginType): Promise<LoginResponse> => {
    const res = await axiosInstance.post<LoginResponse>("/auth/login", data);
    localStorage.setItem("token", res.data.data.accessToken);
    if (saveToken) {
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
    }
    if (loginToRegister) {
      localStorage.setItem("loginToRegister", "true");
    } else {
      setTimeout(() => {
        localStorage.removeItem("loginToRegister");
        navigate(`/dashboard`);
      }, 1000);
    }
    return res.data;
  };

  return useMutation<LoginResponse, Error, LoginType>({
    mutationKey: ["login"],
    mutationFn: login,
  });
};

export default useLogin;
